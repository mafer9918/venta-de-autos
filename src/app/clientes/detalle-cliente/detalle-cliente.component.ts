import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import { ClienteService } from '../../servicios/Cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css'],
})
export class DetalleClienteComponent implements OnInit {
  cliente: Cliente | undefined;

  constructor(
    private route: ActivatedRoute,
    private clienteService : ClienteService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clienteService.obtenerClientePorId(params['id']).subscribe(result => {
        this.cliente = result.data;
      })
    })
  }
}
