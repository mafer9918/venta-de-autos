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
      .get<Respuesta>(this.baseUrl + 'vehiculos/', {params: body});
      //.pipe(map((result) => result));
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
}
