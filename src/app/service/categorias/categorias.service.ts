import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CategoriasModel} from "../../models/categorias"

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  API_URI="http://localhost:3000/api"

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.API_URI}/categorias`)
  }
  getone(id:string){
    return this.http.get(`${this.API_URI}/categorias/${id}`)

  }
  // aqui se va complicar vamos a ir a modelado
  save(categoria:CategoriasModel){
   
    
    
    return this.http.post(`${this.API_URI}/categorias`,categoria)
    
  }

  update(id:string, updategame:CategoriasModel): Observable<CategoriasModel>{
    return this.http.put(`${this.API_URI}/categorias/${id}`,updategame)
  }
  delete(id:string){
    return this.http.delete(`${this.API_URI}/categorias/${id}`)

  }
}
