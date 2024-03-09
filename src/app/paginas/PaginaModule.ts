import { NgModule } from "@angular/core";
import { PagListaVehiculosComponent } from "./pag-lista-vehiculos/pag-lista-vehiculos.component";
import { AddVehiculoFormComponent } from "./AddVehiculoForm/AddVehiculoForm.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/pipes/UtilitariosModule";
import { RouterModule } from '@angular/router';
import { PagVehiculoComponent } from "./PagVehiculo/PagVehiculo.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations:[
        PagListaVehiculosComponent,
        AddVehiculoFormComponent,
        PagVehiculoComponent
    ],
    exports:[
        PagListaVehiculosComponent,
        AddVehiculoFormComponent,
        PagVehiculoComponent
    ]
})

export class PaginaModule{

}