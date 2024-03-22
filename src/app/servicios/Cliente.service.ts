import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  catchError,
  map,
  throwError,
} from 'rxjs';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { RespuestaCliente } from '../utilitarios/modelos/Respuesta';
import { Cliente } from '../utilitarios/modelos/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://epico.gob.ec/vehiculo/public/api/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getClientes(
    filtro?: string,
    rows?: number,
    page?: number
  ): Observable<RespuestaCliente> {
    let body = new HttpParams();
    body = filtro ? body.set('filtro', filtro) : body;
    body = rows ? body.set('rows', rows) : body;
    body = page ? body.set('page', page) : body;
    return this.http
      .get<RespuestaCliente>(this.baseUrl + 'clientes/', { params: body })
      .pipe(map((result) => result));
  }
  
  obtenerClientePorId(id: string) {
    return this.http.get<RespuestaCliente>(this.baseUrl + 'cliente/' + id);
  }

  addCliente(cliente: Cliente) {
    return this.http.post<RespuestaCliente>(
      this.baseUrl + 'cliente/',
      cliente,
      this.httpOptions
    );
  }

  updateCliente(cliente: Cliente, id: string) {
    return this.http.put<RespuestaCliente>(
      this.baseUrl + 'cliente/' + id,
      cliente,
      this.httpOptions
    );
  }

  deleteCliente(id: string) {
    return this.http.delete<RespuestaCliente>(this.baseUrl + 'cliente/' + id);
  }
}
