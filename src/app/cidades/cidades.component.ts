import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService, PoPageFilter, PoPageModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { CidadesService } from '../shared/services/cidades.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  imports: [PoPageModule, PoTableModule],
  standalone: true,
  styleUrls: ['./cidades.component.css'],
})
export class CidadesComponent implements OnInit  {
  public readonly breadcrumb: PoBreadcrumb;
  public readonly filterSettings: PoPageFilter;
  public readonly cidadesColumns: Array<PoTableColumn>;
  private subs: Subscription = new Subscription();

  public items: Array<any>

  constructor(private router: Router, private cidadesService: CidadesService, private poNotification: PoNotificationService) {
    this.breadcrumb = this.buildBreadcrumb();
    this.filterSettings = this.buildFilter();
    this.cidadesColumns = this.buildColumns();
    this.items = [];
  }

  ngOnInit(): void {
    this.buscarTodasCidades();
  }

  private buscarTodasCidades(){
    this.cidadesService.getAllCidades().subscribe({
      next: (items: any)=>{
        this.items = items;
      },
      error: (err: any)=>{
        console.error(err)
        this.poNotification.error("Aconteceu um erro na busca das cidades");
      }
    })
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
      placeholder: 'Search',
    };
  }

  private basicFilterAction() {} //chamar a api pra buscar

  private advancedFilterActionModal() {} // chamar o modal de busca avançada

  private beforeRedirect() {
    this.router.navigate(['/']);
  }

  private buildColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'Id', type: 'string' },
      { property: 'nome', label: 'Nome', type: 'string' },
    ]
  }
}
