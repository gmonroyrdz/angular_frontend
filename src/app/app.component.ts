import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Empleados App</span>
      <span style="flex:1 1 auto"></span>
      <button mat-button routerLink="/empleados">Empleados</button>
      <button mat-button routerLink="/departamentos">Departamentos</button>
    </mat-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
