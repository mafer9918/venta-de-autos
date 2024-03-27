import { Component, OnInit, Input } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pag-lista-vehiculos',
  templateUrl: './pag-lista-vehiculos.component.html',
  styleUrl: './pag-lista-vehiculos.component.css',
})
export class PagListaVehiculosComponent implements OnInit {
  mostrarImagen: boolean = false;
  listaVehiculos: Array<any> = [];
  rows: number = 10;
  page: number = 1;
  pages: number = 0;
  filtro: string = '';
  listaPaginas: Array<number> = [];

  @Input() valor: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.consultarVehiculos();
  }

  mostrar() {
    this.mostrarImagen = !this.mostrarImagen;
  }

  recepcion(dato: number) {
    alert('La calificacion del vehículo es de: ' + dato);
  }

  consultarVehiculos() {
    this.vehiculoService
      .getVehiculos(this.filtro, this.rows, this.page)
      .subscribe((result) => {
        if (result.codigo == '1') {
          this.listaVehiculos = result.data;
          this.pages = result.pages;
          this.paginar(result.pages);
        }
      });
  }

  cambiarPagina(page: number) {
    this.page = page;
    this.consultarVehiculos();
  }

  paginar(pages: number) {
    this.listaPaginas = [];
    for (let i = 1; i <= pages; i++) {
      this.listaPaginas.push(i);
    }
  }

  siguiente() {
    if (this.page < this.pages) {
      this.page++;
      this.consultarVehiculos();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultarVehiculos();
    }
  }

  eliminarVehiculo(id: string): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'question',
    }).then((res) => {
      if (res.isConfirmed) {
        this.vehiculoService.deleteVehiculo(id).subscribe((data) => {
          if (data.codigo == '1') {
            this.consultarVehiculos();
            Swal.fire({
              title: 'Éxito',
              text: 'Vehículo eliminado con éxito',
              icon: 'success',
            });
          }
        });
      }
    });
  }
}
