import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoriasModel } from 'src/app/models/categorias.models';
import { PlatillosModel } from '../../models/platillos.model';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

  readonly URL = environment.url;

  constructor(private http: HttpClient) { }

  getPlatilloById(idPlatillo: PlatillosModel){
    return this.http.get(`${this.URL}/platillos/${idPlatillo._id}`).toPromise();
  }

  getPlatillo(){
    return this.http.get(`${this.URL}/platillos`).toPromise();
  }

  postPlatillo(platillo: PlatillosModel){
    console.log(this.URL);
    return this.http.post(`${this.URL}/platillos`, platillo).toPromise();
  }

  putPlatillo(platillo: PlatillosModel){
    return this.http.post(`${this.URL}/platillos/${platillo._id}`, platillo).toPromise();
  }


}
