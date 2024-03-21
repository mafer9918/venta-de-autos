import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/pipes/UtilitariosModule";
import { RouterModule } from "@angular/router";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ListaClientesComponent } from "./lista-clientes/lista-clientes.component";
import { DetalleClienteComponent } from "./detalle-cliente/detalle-cliente.component";
import { AgregarClienteComponent } from "./agregar-cliente/agregar-cliente.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
        ReactiveFormsModule,
        RouterModule,
        SweetAlert2Module.forRoot()
    ],
    declarations:[
        ListaClientesComponent,
        DetalleClienteComponent,
        AgregarClienteComponent
    ],
    exports:[
        ListaClientesComponent,
        DetalleClienteComponent,
        AgregarClienteComponent
    ]
})

export class ClienteModule{

}