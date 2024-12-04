import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {NominadosModel} from "../../models/nominados"

@Injectable({
  providedIn: 'root'
})
export class NominadosService {

 //API_URI="http://localhost:3000/api"
 API_URI="https://server-premios-mundo-banda-production.up.railway.app/api"

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.API_URI}/nominados`)
  }
  getone(id:string){
    return this.http.get(`${this.API_URI}/nominados/${id}`)

  }
  // aqui se va complicar vamos a ir a modelado
  save(nominado:NominadosModel){
   
    
    
    return this.http.post(`${this.API_URI}/nominados`,nominado)
    
  }

  update(id:string, updategame:NominadosModel): Observable<NominadosModel>{
    return this.http.put(`${this.API_URI}/nominados/${id}`,updategame)
  }
  delete(id:string){
    return this.http.delete(`${this.API_URI}/nominados/${id}`)

  }
}
