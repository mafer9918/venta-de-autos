import { NgModule } from "@angular/core";
import { AEspacioPipe } from "./AEspacio.pipe";
import { CalificacionComponent } from "../componentes/calificacion/calificacion.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AEspacioPipe,
        CalificacionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AEspacioPipe,
        CalificacionComponent
    ]
})

export class UtilitariosModule{}