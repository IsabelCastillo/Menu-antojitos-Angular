import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriasModel } from '../../models/categorias.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  readonly URL = environment.url;

  constructor(private http: HttpClient) { }

  getCategoriaById(idCategoria: CategoriasModel){
    return this.http.get(`${this.URL}/categoria/${idCategoria._id}`).toPromise();
  }

  getCategoria(){
    return this.http.get(`${this.URL}/categoria`).toPromise();
  }

  postCategoria(categoria: CategoriasModel){
    console.log(this.URL);
    return this.http.post(`${this.URL}/categoria`, categoria).toPromise();
  }

  putCategoria(categoria: CategoriasModel){
    return this.http.post(`${this.URL}/categoria/${categoria._id}`, categoria).toPromise();
  }







}
