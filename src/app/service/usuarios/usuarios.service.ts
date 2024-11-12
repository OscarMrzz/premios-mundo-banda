import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UsuariosModel} from "../../models/usuarios"

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root' 
})
export class UsuariosService {
  API_URI="http://localhost:3000/api"

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.API_URI}/usuarios`)
  }
  getone(nombre_usuario:string){
    return this.http.get(`${this.API_URI}/usuarios/${nombre_usuario}`)

  }
  // aqui se va complicar vamos a ir a modelado
  save(Usuario:UsuariosModel){
   
    
    
    return this.http.post(`${this.API_URI}/usuarios`,Usuario)
    
  }

  update(id:string, updategame:UsuariosModel): Observable<UsuariosModel>{
    return this.http.put(`${this.API_URI}/usuarios/${id}`,updategame)
  }
  delete(id:string){
    return this.http.delete(`${this.API_URI}/usuarios/${id}`)

  }
}

