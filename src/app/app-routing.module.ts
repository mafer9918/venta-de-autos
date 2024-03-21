import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { PagListaVehiculosComponent } from './paginas/pag-lista-vehiculos/pag-lista-vehiculos.component';
import { PagNotFoundComponent } from './paginas/PagNotFound/PagNotFound.component';
import { PagVehiculoComponent } from './paginas/PagVehiculo/PagVehiculo.component';
import { AddVehiculoFormComponent } from './paginas/AddVehiculoForm/AddVehiculoForm.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { DetalleClienteComponent } from './clientes/detalle-cliente/detalle-cliente.component';
import { AgregarClienteComponent } from './clientes/agregar-cliente/agregar-cliente.component';

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
    path: 'editar/:codigo',
    component: AddVehiculoFormComponent,
  },
  {
    path: 'clientes',
    component: ListaClientesComponent,
  },
  {
    path: 'cliente/:id',
    component: DetalleClienteComponent,
  },
  {
    path: 'editarCliente/:id',
    component: AgregarClienteComponent,
  },
  {
    path: 'nuevoCliente',
    component: AgregarClienteComponent,
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
