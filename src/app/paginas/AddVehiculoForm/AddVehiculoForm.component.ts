import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AddVehiculoForm',
  templateUrl: './AddVehiculoForm.component.html',
  styleUrls: ['./AddVehiculoForm.component.css'],
})
export class AddVehiculoFormComponent implements OnInit {
  vehiculoForm: FormGroup;
  id: string;
  isEdit: boolean;
  vehiculo: Vehiculo | undefined;
  constructor(
    fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '';
    this.isEdit = false;
    this.vehiculoForm = fb.group({
      codigo: [
        { value: '', disabled: this.isEdit },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      modelo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      kilometraje: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      precio: ['', [Validators.required, Validators.min(1)]],
      anio: [
        '',
        [Validators.required, Validators.min(1910), Validators.max(2024)],
      ],
      calificacion: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      foto: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['codigo'];
      console.log(this.id);
      if (this.id != '' && this.id != undefined) {
        this.isEdit = true;
        this.vehiculoService
          .obtenerVehiculoPorId(this.id)
          .subscribe((result) => {
            if (result.codigo == '1') {
              this.vehiculoForm.setValue({
                codigo: result.data.codigo,
                marca: result.data.marca,
                modelo: result.data.modelo,
                kilometraje: result.data.kilometraje,
                precio: result.data.precio,
                anio: result.data.anio,
                calificacion: result.data.calificacion,
                foto: result.data.foto,
              });
              this.vehiculoForm.get('codigo')?.disable();
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
    if (this.vehiculoForm.valid) {
      if (this.isEdit) {
        this.vehiculoService
          .updateVehiculo(
            { codigo: this.id, ...this.vehiculoForm.value },
            this.id
          )
          .subscribe((result) => {
            if (result.codigo == '1') {
              Swal.fire({
                title: 'Éxito',
                text: 'Vehículo actualizado correctamente',
                icon: 'success',
              }).then((res) => {
                this.vehiculoForm.reset();
                this.regresar();
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el vehículo' + result.mensaje,
                icon: 'error',
              });
              this.regresar();
            }
          });
      } else {
        this.vehiculoService
          .addVehiculo({
            ...this.vehiculoForm.value,
          })
          .subscribe(
            (result) => {
              if (result.codigo == '1') {
                Swal.fire({
                  title: 'Éxito',
                  text: 'Vehículo registrado correctamente',
                  icon: 'success',
                }).then((res) => {
                  this.vehiculoForm.reset();
                  this.regresar();
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo registrar el vehículo' + result.mensaje,
                  icon: 'error',
                });
                this.regresar();
              }
            },
            (error) => {
              let errorMessage = '';
              if (error.error && error.error.error.codigo) {
                errorMessage = error.error.error.codigo;
              }
              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
              });
            }
          );
      }
    } else {
      Swal.fire({
        title: 'Alerta',
        text: 'Faltan llenar datos en el formulario',
        icon: 'error',
      });
    }
  }

  regresar() {
    this.isEdit = false;
    this.router.navigate(['vehiculos']);
  }
}
