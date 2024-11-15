import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VotacionesModel } from 'src/app/models/votaciones';


type Elmodelo =VotacionesModel

@Injectable({
  providedIn: 'root'
})


export class VotacionesService {
  /*Campos para el CRUD*/
  API_URI="http://localhost:3000/api"
  direccion="votaciones"
 
  


  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.API_URI}/${this.direccion}`)
  }

  get_listar_para_tabla(){
    console.log("pues mira que aqui llegamos")
    return this.http.get(`${this.API_URI}/${this.direccion}/listar_para_tabla`)
  }
 
  getone(id:string){
    return this.http.get(`${this.API_URI}/${this.direccion}/${id}`)

  }
  // aqui se va complicar vamos a ir a modelado
  save(modelo:Elmodelo){
    console.log("estos es el voto que se guardara")
    console.log(modelo)
   
    
    
    return this.http.post(`${this.API_URI}/${this.direccion}`,modelo)
    
  }

  update(id:string, updategame:Elmodelo): Observable<Elmodelo>{
    return this.http.put(`${this.API_URI}/${this.direccion}/${id}`,updategame)
  }
  delete(id:string){
    return this.http.delete(`${this.API_URI}/${this.direccion}/${id}`)

  }
}
