import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {UsuariosModel} from "../../models/usuarios"
import { accesoModel } from 'src/app/models/acceso';
import { permisosModel } from 'src/app/models/permisos';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root' 
})
export class UsuariosService {
  API_URI="http://localhost:3000/api"


  
  
 
  private permisosData: BehaviorSubject<permisosModel> =new BehaviorSubject<permisosModel>({admin:true,
                                                                                          asistente:false,
                                                                                          jurado:false,
                                                                                          fiscal:false
  })

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get(`${this.API_URI}/usuarios`)
  }
  getone(nombre_usuario:string){
    return this.http.get(`${this.API_URI}/usuarios/${nombre_usuario}`)

  }
 getacceso() {
    const Lospermisos = ["Admin", "asistente", "jurado", "fiscal"];
  
    // Obtener el estado actual de permisosData
    let currentPermisos = this.permisosData.value;
  
    for (let nombre_permiso of Lospermisos) {
      this.http.get<{ acceso: number }>(`${this.API_URI}/usuarios/revicion_permiso/${nombre_permiso}`)
        .subscribe(
          (response) => {
            // Actualizamos el permiso correspondiente con los datos obtenidos del servidor
            currentPermisos = {
              ...currentPermisos, // Conserva los valores actuales
              [nombre_permiso.toLowerCase()]: response.acceso === 1, // Convierte acceso a booleano
            };
  
            // Emitir los nuevos datos al BehaviorSubject
            this.permisosData.next(currentPermisos);
          },
          (error) => {
            console.error(`Error al obtener acceso para ${nombre_permiso}:`, error);
          }
        );
    }
   
    return this.permisosData.asObservable()
  }
  

 
  

  
  // aqui se va complicar vamos a ir a modelado
  save(Usuario:UsuariosModel){
   
    
    
    return this.http.post(`${this.API_URI}/usuarios`,Usuario)
    
  }

  update(id:string, updategame:UsuariosModel): Observable<UsuariosModel>{
    return this.http.put(`${this.API_URI}/usuarios/update/${id}`,updategame)
  }
  update_acceso(permisos: string, acceso: boolean): Observable<any> {
    const url = `${this.API_URI}/usuarios/acceso/${permisos}`;
    return this.http.put(url, { acceso });
  }



  delete(id:string){
    return this.http.delete(`${this.API_URI}/usuarios/${id}`)

  }
}

