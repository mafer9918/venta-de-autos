import { Component, OnInit, Input } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-lista-vehiculos',
  templateUrl: './pag-lista-vehiculos.component.html',
  styleUrl: './pag-lista-vehiculos.component.css',
})
export class PagListaVehiculosComponent implements OnInit{

  mostrarImagen: boolean = true;
  filtro: string = '';
  listaVehiculos:Array<any> = [];

  @Input() valor: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private route: Router
  ) { }

  ngOnInit():void{
    this.listaVehiculos = this.vehiculoService.getVehiculos();
  }

  mostrar() {
    this.mostrarImagen = !this.mostrarImagen;
  }

  recepcion(dato:number){
    this.route.navigate(["vehiculo/"]);
  }

  eliminarVehiculo(id:number):void{
    this.vehiculoService.eliminarVehiculo(id);
    this.listaVehiculos = this.vehiculoService.getVehiculos();
  }

  filtrarPorMarca() {
    if (!this.filtro) {
      this.listaVehiculos = this.vehiculoService.getVehiculos();
    } else {
      const filtroMinusculas = this.filtro.toLowerCase();
      this.listaVehiculos = this.listaVehiculos.filter(vehiculo =>
        vehiculo.marca && vehiculo.marca.toLowerCase().includes(filtroMinusculas)
      );
    }
  }
  
}
