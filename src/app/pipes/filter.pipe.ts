import {Pipe, PipeTransform} from '@angular/core';
import { PlatillosModel } from '../models/platillos.model';

@Pipe({
    name: 'filtro'
})
export class FilterPipe implements PipeTransform {

    transform(platillos: PlatillosModel[], buscar: String): PlatillosModel[]{
        if(!platillos || !buscar){
            return platillos;
        }

        return platillos.filter(platillo =>
            platillo.strNombre.toLowerCase().indexOf(buscar.toLowerCase()) !== -1)
    }
}

