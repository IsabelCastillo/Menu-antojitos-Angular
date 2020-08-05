import {Pipe, PipeTransform} from '@angular/core';
import { CategoriasModel } from '../models/categorias.models';

@Pipe({
    name: 'filtroC'
})
export class CategoriaPipe implements PipeTransform {

    transform(categorias: CategoriasModel[], buscar: String): CategoriasModel[]{
        if(!categorias || !buscar){
            return categorias;
        }

        return categorias.filter(categoria =>
            categoria.strNombre.toLowerCase().indexOf(buscar.toLowerCase()) !== -1)
    }
}
