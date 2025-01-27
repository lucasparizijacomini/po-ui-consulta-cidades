import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PoButtonModule,
  PoFieldModule,
  PoPageModule,
  PoPageSlideComponent,
} from '@po-ui/ng-components';

export type CidadeBuscaAvancada = {
  cidade: string;
};

@Component({
  selector: 'app-busca-avancada-cidade',
  templateUrl: './busca-avancada-cidade.component.html',
  styleUrls: ['./busca-avancada-cidade.component.css'],
  imports: [
    CommonModule,
    PoPageModule,
    FormsModule,
    PoFieldModule,
    PoButtonModule,
  ],
  standalone: true,
})
export class BuscaAvancadaCidadeComponent {
  @Output() buscar = new EventEmitter<CidadeBuscaAvancada>();
  @ViewChild('pageSlide') pageSlide!: PoPageSlideComponent;

  public model: CidadeBuscaAvancada;

  constructor() {
    this.model = {
      cidade: '',
    };
  }

  openPageSlide() {
    this.pageSlide.open();
  }

  handleSave() {
    this.buscar.emit(this.model);
    this.pageSlide.close();
  }
}
