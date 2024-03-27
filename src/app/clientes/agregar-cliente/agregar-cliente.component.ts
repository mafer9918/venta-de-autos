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
  id: number;
  isEdit: boolean;
  cliente: Cliente | undefined;
  isChecked: boolean = false;
  showPassword: boolean = false;

  constructor(
    fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = 0;
    this.isEdit = false;
    this.clienteForm = fb.group({
      isChecked: [this.isChecked],
      nombre: [
        { value: '', disabled: this.isEdit },
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$'),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$'),
        ],
      ],
      password: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      telefono: ['', []],
      email: ['', []],
    });

    if (!this.isChecked) {
      this.clienteForm.get('email')?.clearValidators();
      this.clienteForm.get('telefono')?.clearValidators();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != null && this.id != undefined) {
        this.isEdit = true;
        this.clienteService.obtenerClientePorId(this.id).subscribe((result) => {
          if (result.codigo == '1') {
            this.clienteForm.setValue({
              nombre: result.data.nombre,
              apellido: result.data.apellido,
              email: result.data.email,
              telefono: result.data.telefono,
              password: result.data.password,
              isChecked:
                (result.data.email != null && result.data.email != '') ||
                (result.data.telefono != null && result.data.telefono != ''),
            });
            if (
              (result.data.email != null && result.data.email != '') ||
              (result.data.telefono != null && result.data.telefono != '')
            ) {
              this.isChecked = true;
            }
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
    this.validarCampos();
  }

  validarCampos() {
    this.clienteForm.get('isChecked')?.valueChanges.subscribe((isChecked) => {
      if (isChecked) {
        this.clienteForm
          .get('email')
          ?.setValidators([
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
          ]);
        this.clienteForm
          .get('telefono')
          ?.setValidators([
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]*$'),
          ]);
      } else {
        this.clienteForm.get('email')?.clearValidators();
        this.clienteForm.get('telefono')?.clearValidators();
      }
      this.clienteForm.get('email')?.updateValueAndValidity();
      this.clienteForm.get('telefono')?.updateValueAndValidity();
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
    this.isChecked = !this.isChecked;
    this.limpiar();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  regresar() {
    this.isEdit = false;
    this.router.navigate(['clientes']);
  }

  limpiar() {
    this.clienteForm.get('email')?.setValue('');
    this.clienteForm.get('telefono')?.setValue('');
  }
}
