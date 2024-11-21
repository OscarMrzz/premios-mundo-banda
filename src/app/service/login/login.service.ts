import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { RecopiladorService } from '../recopilador/recopilador.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usurio: UsuariosModel={}
   

  private loginData: BehaviorSubject<UsuariosModel> =new BehaviorSubject<UsuariosModel>({})
  private loginStatus: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false)

  constructor(
    private usariosServices:UsuariosService, 
    private  router:Router,
    private recopiladorservice:RecopiladorService
  ) { } 

  get obtener_datos_login(){
    return this.loginData.asObservable()
  }

 set  guardar_datos_login(nombre_usuario:string){
    this.usariosServices.getone(nombre_usuario).subscribe(
      res=>{
        this.usurio=res
    
        this.loginData.next(this.usurio)
        
       

        if(Number(this.usurio.acceso)===Number(true)){
          this.cambiar_status=true
          this.recopiladorservice.agregar_datos_voto({"id_usuario":this.usurio["id_usuario"]})
          this.router.navigate([""])
        }
        if(Number(this.usurio.acceso)===Number(false)){
          alert("Esta cuenta no tiene acceso")
    
        }




     
       


      },
      err=>{
        console.error(err)
        alert("usuario incorrecto")
      }
    )

  }
//Stado del login

get obtener_stado(){
  return this.loginStatus.asObservable()

}
set cambiar_status(stado:boolean){
  this.loginStatus.next(stado)

}


 
}
