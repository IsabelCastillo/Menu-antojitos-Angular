import { ObjectUnsubscribedError } from 'rxjs';

export class PlatillosModel{
    _id: string;
    strNombre: string;
    strDescripcion?: string;
    strIngredientes: string;
    nmbPiezas: number;
    nmbPrecio: number;
}