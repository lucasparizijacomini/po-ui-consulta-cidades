import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.callHomePage.bind(this) },
    { label: 'Cidades', action: this.callCidadeComponent.bind(this) },
  ];

  private callHomePage() {
    this.router.navigate(['']);
  }

  private callCidadeComponent() {
    this.router.navigate(['cidades']);
  }
}
