import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoNotificationService,
  PoPageFilter,
  PoPageModule,
  PoTableColumn,
  PoTableModule,
} from '@po-ui/ng-components';
import { CidadesService } from '../shared/services/cidades.service';
import {
  BuscaAvancadaCidadeComponent,
  CidadeBuscaAvancada,
} from '../shared/components/busca-avancada-cidade/busca-avancada-cidade.component';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  imports: [
    CommonModule,
    PoPageModule,
    PoTableModule,
    BuscaAvancadaCidadeComponent,
  ],
  standalone: true,
  styleUrls: ['./cidades.component.css'],
})
export class CidadesComponent implements OnInit {
  @ViewChild('buscaAvancada') buscaAvancada!: BuscaAvancadaCidadeComponent;

  public readonly breadcrumb: PoBreadcrumb;
  public readonly filterSettings: PoPageFilter;
  public readonly cidadesColumns: Array<PoTableColumn>;
  public isLoading: boolean;
  public items: Array<any>;
  private originalItems: Array<any>;

  constructor(
    private router: Router,
    private cidadesService: CidadesService,
    private poNotification: PoNotificationService
  ) {
    this.breadcrumb = this.buildBreadcrumb();
    this.filterSettings = this.buildFilter();
    this.cidadesColumns = this.buildColumns();
    this.originalItems = [];
    this.items = [];
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.buscarTodasCidades();
  }

  handleBuscar(form: CidadeBuscaAvancada) {
    console.log('form', form);
  }

  private buscarTodasCidades() {
    this.isLoading = true;
    this.cidadesService.getAllCidades().subscribe({
      next: (items: any) => {
        this.originalItems = items;
        this.items = [...this.originalItems];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.poNotification.error('Aconteceu um erro na busca das cidades');
      },
    });
  }

  private buildBreadcrumb(): PoBreadcrumb {
    return {
      items: [
        { label: 'Home', action: this.beforeRedirect.bind(this) },
        { label: 'Cidades' },
      ],
    };
  }

  private buildFilter(): PoPageFilter {
    return {
      action: this.basicFilterAction.bind(this),
      advancedAction: this.advancedFilterActionModal.bind(this),
      placeholder: 'Busque pelo nome da cidade',
    };
  }

  private basicFilterAction(searchTerm: string) {
    this.isLoading = true;
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      this.items = this.originalItems.filter((item) =>
        item.nome.toLowerCase().includes(term)
      );
      this.isLoading = false;
    } else {
      this.items = [...this.originalItems];
      this.isLoading = false;
    }
  }

  private advancedFilterActionModal() {
    this.buscaAvancada.openPageSlide();
  }

  private beforeRedirect() {
    this.router.navigate(['/']);
  }

  private buildColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Id', type: 'string' },
      { property: 'nome', label: 'Nome', type: 'string' },
    ];
  }
}
