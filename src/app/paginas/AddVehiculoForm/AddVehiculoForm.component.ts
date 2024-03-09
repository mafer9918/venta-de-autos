import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AddVehiculoForm',
  templateUrl: './AddVehiculoForm.component.html',
  styleUrls: ['./AddVehiculoForm.component.css']
})
export class AddVehiculoFormComponent{
  vehiculoForm: FormGroup;
  constructor(
    fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: Router
    ) { 
    this.vehiculoForm = fb.group({
      marca:[
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ]
      ],
      modelo:[
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ]
      ],
      color:[
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      kilometraje:[
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      precio:[
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      anio:[
        '',
        [
          Validators.required,
          Validators.min(2000),
          Validators.max(2024)
        ]
      ],
      calificacion:[
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ]
      ],
      foto:[
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ]
    })
  }

  onSubmit(){
    if (this.vehiculoForm.invalid) return;
    this.vehiculoService.addVehiculo({
      codigo: this.vehiculoService.listaVehiculos.length + 1,
      ...this.vehiculoForm.value,
    });
    this.route.navigate(['vehiculos']);
  }
}
