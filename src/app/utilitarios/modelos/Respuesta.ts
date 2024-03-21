import { Cliente } from "./Cliente";
import { Vehiculo } from "./Vehiculo";

export interface Respuesta{
    codigo: string;
    mensaje: string;
    data: Array<Vehiculo> | Vehiculo | any;
    rows: number;
    pages: number;
    records: number;
    page: number;
}

export interface RespuestaCliente{
    codigo: string;
    mensaje: string;
    data: Array<Cliente> | Cliente | any;
    rows: number;
    pages: number;
    records: number;
    page: number;
}