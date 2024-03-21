import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import { ClienteService } from '../../servicios/Cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css'],
})
export class AgregarClienteComponent implements OnInit {
  clienteForm: FormGroup;
  id: string;
  isEdit: boolean;
  cliente: Cliente | undefined;
  isChecked: boolean = false;
  showPassword:boolean = false;

  constructor(
    fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '';
    this.isEdit = false;
    this.clienteForm = fb.group({
      isChecked: [false],
      id: [
        { value: '', disabled: this.isEdit }
      ],
      nombre: [
        { value: '', disabled: this.isEdit },
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      telefono: [
        '',
        [
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      usuario: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEdit = true;
        this.clienteService.obtenerClientePorId(this.id).subscribe((result) => {
          if (result.codigo == '1') {
            this.clienteForm.setValue({
              id: result.data.id,
              nombre: result.data.nombre,
              apellido: result.data.apellido,
              usuario: result.data.usuario,
              email: result.data.email,
              telefono: result.data.telefono,
              password: result.data.password,
              foto: result.data.foto,
            });
            this.clienteForm.get('id')?.disable();
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cargar la información',
              icon: 'error',
            });
          }
        });
      } else {
        this.isEdit = false;
      }
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      if (this.isEdit) {
        this.clienteService
          .updateCliente({ id: this.id, ...this.clienteForm.value }, this.id)
          .subscribe((result) => {
            if (result.codigo == '1') {
              Swal.fire({
                title: 'Éxito',
                text: 'Cliente actualizado correctamente',
                icon: 'success',
              }).then((res) => {
                this.clienteForm.reset();
                this.regresar();
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el cliente' + result.mensaje,
                icon: 'error',
              });
              this.regresar();
            }
          });
      } else {
        this.clienteService
          .addCliente({
            ...this.clienteForm.value,
          })
          .subscribe((result) => {
            if (result.codigo == '1') {
              Swal.fire({
                title: 'Éxito',
                text: 'Cliente registrado correctamente',
                icon: 'success',
              }).then((res) => {
                this.clienteForm.reset();
                this.regresar();
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo registrar el cliente' + result.mensaje,
                icon: 'error',
              });
              this.regresar();
            }
          });
      }
    } else {
      Swal.fire({
        title: 'Alerta',
        text: 'Faltan llenar datos en el formulario',
        icon: 'error',
      });
    }
  }

  onChange() {
    this.isChecked = this.clienteForm.get('isChecked')?.value;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  regresar() {
    this.isEdit = false;
    this.router.navigate(['clientes']);
  }
}
