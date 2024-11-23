import { Injectable } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { RecopiladorService } from '../recopilador/recopilador.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/models/login';
import { loginRespuestaModel } from 'src/app/models/loginRespuesta';
import { jwtDecode } from 'jwt-decode';
import { tokenModel } from 'src/app/models/toke';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usurio: UsuariosModel={}
   

  private loginData: BehaviorSubject< tokenModel> =new BehaviorSubject<tokenModel>({})
  private loginStatus: BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false)

  constructor(
    private usariosServices:UsuariosService, 
    private  router:Router,
    private recopiladorservice:RecopiladorService
  ) { } 

  get obtener_datos_login(){
    return this.loginData.asObservable()
  } 

 login(DatosLogin:loginModel){
    this.usariosServices.login(DatosLogin).subscribe(
      (res:loginRespuestaModel)=>{
        
        if(res){

          let DatosToken:tokenModel = jwtDecode(String(res.token))
         
          localStorage.setItem("DatosTokenLS",JSON.stringify(DatosToken))

        
          
          let datosTokenlocalStorage:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
    
      
        this.usurio=datosTokenlocalStorage
        this.loginData.next(this.usurio)
   

        if(Number(this.usurio.acceso)===Number(true)){
          this.cambiar_status=true
          this.recopiladorservice.agregar_datos_voto({"id_usuario":this.usurio["id_usuario"]})
        
          this.router.navigate([""])
        
       
        }
        if(Number(this.usurio.acceso)===Number(false)){
          alert("Esta cuenta no tiene acceso")
    
        }

      }
    
     

      },
      err=>{
        console.error(err)
        alert("usuario o  contraseña incorrecta")
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
