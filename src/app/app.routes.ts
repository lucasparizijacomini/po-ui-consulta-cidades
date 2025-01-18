import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cidades',
    loadComponent: () =>
      import('./cidades/cidades.component').then((m) => m.CidadesComponent),
  },
];
