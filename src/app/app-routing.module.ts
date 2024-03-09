import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PagListaVehiculosComponent } from './paginas/pag-lista-vehiculos/pag-lista-vehiculos.component';
import { PagNotFoundComponent } from './paginas/PagNotFound/PagNotFound.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { AddVehiculoFormComponent } from './paginas/AddVehiculoForm/AddVehiculoForm.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'vehiculos',
    component: PagListaVehiculosComponent,
  },
  {
    path: 'vehiculo/:codigo',
    component: PagVehiculoComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo',
    component: AddVehiculoFormComponent,
  },
  {
    path: '**',
    component: PagNotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
