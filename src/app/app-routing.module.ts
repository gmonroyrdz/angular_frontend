import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoListComponent } from './components/empleados/empleado-list.component';
import { DepartamentoListComponent } from './components/departamentos/departamento-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadoListComponent },
  { path: 'departamentos', component: DepartamentoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
