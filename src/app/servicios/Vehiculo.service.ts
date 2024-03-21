import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/Vehiculo';
import {
  BehaviorSubject,
  Subject,
  Observable,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Respuesta } from '../utilitarios/modelos/Respuesta';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://epico.gob.ec/vehiculo/public/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public listaVehiculos: Array<Vehiculo> = [
    {
      codigo: '1',
      marca: 'Toyota',
      //color: 'Blanco',
      modelo: 'Corolla',
      kilometraje: '40,000 km',
      precio: 15000,
      foto: '../../assets/vehiculos/1.png',
      anio: 2018,
      calificacion: 5,
    },
    {
      codigo: '2',
      marca: 'Ford',
      //color: 'Negro',
      modelo: 'Mustang',
      kilometraje: '20,000 km',
      precio: 25000,
      foto: '../../assets/vehiculos/2.png',
      anio: 2016,
      calificacion: 4,
    },
    {
      codigo: '3',
      marca: 'Honda',
      //color: 'Azul',
      modelo: 'Civic',
      kilometraje: '30,000 km',
      precio: 18000,
      foto: '../../assets/vehiculos/3.png',
      anio: 2017,
      calificacion: 4,
    },
    {
      codigo: '4',
      marca: 'Chevrolet',
      //color: 'Rojo',
      modelo: 'Camaro',
      kilometraje: '15,000 km',
      precio: 30000,
      foto: '../../assets/vehiculos/4.png',
      anio: 2019,
      calificacion: 3,
    },
    {
      codigo: '5',
      marca: 'Nissan',
      //color: 'Plateado',
      modelo: 'Sentra',
      kilometraje: '25,000 km',
      precio: 20000,
      foto: '../../assets/vehiculos/5.png',
      anio: 2015,
      calificacion: 4,
    },
    {
      codigo: '6',
      marca: 'Volkswagen',
      //color: 'Gris',
      modelo: 'Jetta',
      kilometraje: '35,000 km',
      precio: 17000,
      foto: '../../assets/vehiculos/6.png',
      anio: 2017,
      calificacion: 4,
    },
  ];

  vehiculoSubject = new BehaviorSubject(this.listaVehiculos);

  /*getVehiculos() {
    return this.vehiculoSubject.asObservable();
  }*/

  getVehiculos(
    filtro?: string,
    rows?: number,
    page?: number
  ): Observable<Respuesta> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro): body;
    body = rows ? body.set('rows', rows): body;
    body = page ? body.set('page', page): body;
    return this.http
      .get<Respuesta>(this.baseUrl + 'vehiculos/', {params: body})
      .pipe(map((result) => result));
  }

  obtenerVehiculoPorId(id: string) {
    return this.http.get<Respuesta>(this.baseUrl + 'vehiculo/' + id);
  }

  addVehiculo(vehiculo: Vehiculo) {
    return this.http.post<Respuesta>(
      this.baseUrl + 'vehiculo/',
      vehiculo,
      this.httpOptions
    );
  }

  updateVehiculo(vehiculo: Vehiculo, id: string) {
    return this.http.put<Respuesta>(
      this.baseUrl + 'vehiculo/' + id,
      vehiculo,
      this.httpOptions
    );
  }

  deleteVehiculo(id: string) {
    return this.http.delete<Respuesta>(this.baseUrl + 'vehiculo/' + id);
  }

  /*addVehiculo(vehiculo: Vehiculo): void {
    this.listaVehiculos.push(vehiculo);
    this.vehiculoSubject.next(this.listaVehiculos);
  }

  eliminarVehiculo(id: string) {
    this.listaVehiculos = this.listaVehiculos.filter((vehiculo) => vehiculo.codigo != id);
    this.vehiculoSubject.next(this.listaVehiculos);
  }

  updateVehiculo(vehiculo: Vehiculo, id: string){
    var index = this.listaVehiculos.findIndex((vehiculo) => vehiculo.codigo == id);
    this.listaVehiculos[index] = vehiculo;
    this.vehiculoSubject.next(this.listaVehiculos);
  }*/
}
