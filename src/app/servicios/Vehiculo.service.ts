import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor() {}

  getVehiculos() {
    return this.listaVehiculos;
  }

  public listaVehiculos: Array<Vehiculo> = [
    {
      codigo: 1,
      marca: 'Toyota',
      color: 'Blanco',
      modelo: 'Corolla',
      kilometraje: '40,000 km',
      precio: 15000,
      foto: "../../assets/vehiculos/1.png",
      anio: 2018,
      calificacion: 5,
    },
    {
      codigo: 2,
      marca: 'Ford',
      color: 'Negro',
      modelo: 'Mustang',
      kilometraje: '20,000 km',
      precio: 25000,
      foto: "../../assets/vehiculos/2.png",
      anio: 2016,
      calificacion: 4,
    },
    {
      codigo: 3,
      marca: 'Honda',
      color: 'Azul',
      modelo: 'Civic',
      kilometraje: '30,000 km',
      precio: 18000,
      foto: "../../assets/vehiculos/3.png",
      anio: 2017,
      calificacion: 4,
    },
    {
      codigo: 4,
      marca: 'Chevrolet',
      color: 'Rojo',
      modelo: 'Camaro',
      kilometraje: '15,000 km',
      precio: 30000,
      foto: "../../assets/vehiculos/4.png",
      anio: 2019,
      calificacion: 3,
    },
    {
      codigo: 5,
      marca: 'Nissan',
      color: 'Plateado',
      modelo: 'Sentra',
      kilometraje: '25,000 km',
      precio: 20000,
      foto: "../../assets/vehiculos/5.png",
      anio: 2015,
      calificacion: 4,
    },
    {
      codigo: 6,
      marca: 'Volkswagen',
      color: 'Gris',
      modelo: 'Jetta',
      kilometraje: '35,000 km',
      precio: 17000,
      foto: "../../assets/vehiculos/6.png",
      anio: 2017,
      calificacion: 4,
    }
  ];

  addVehiculo(vehiculo: Vehiculo): void {
    this.listaVehiculos.push(vehiculo);
  }

  eliminarVehiculo(id: number) {
    this.listaVehiculos = this.listaVehiculos.filter((vehiculo) => vehiculo.codigo != id);
  }

  obtenerVehiculoPorId(id:number): Vehiculo | undefined {
    return this.listaVehiculos.find((vehiculo) => vehiculo.codigo == id)
  }

}
