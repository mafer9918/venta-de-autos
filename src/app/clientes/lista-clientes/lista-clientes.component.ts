import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/Cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
})
export class ListaClientesComponent implements OnInit {
  listaClientes: Array<any> = [];
  rows: number = 10;
  page: number = 1;
  pages: number = 0;
  filtro: string = '';
  listaPaginas: Array<number> = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.consultarClientes();
  }

  consultarClientes() {
    this.clienteService
      .getClientes(this.filtro, this.rows, this.page)
      .subscribe((result) => {
        if (result.codigo == '1') {
          this.listaClientes = result.data;
          this.pages = result.pages;
          this.paginar(result.pages);
        }
      });
  }

  cambiarPagina(page: number) {
    this.page = page;
    this.consultarClientes();
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
      this.consultarClientes();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultarClientes();
    }
  }

  eliminarCliente(id: number): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'question',
    }).then((res) => {
      if (res.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe((data) => {
          if (data.codigo == '1') {
            Swal.fire({
              title: 'Éxito',
              text: 'Cliente eliminado con éxito',
              icon: 'success',
            });
          }
        });
        this.consultarClientes();
      }
    });
  }
}
