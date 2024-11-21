import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../categorias/categorias.service';
import { RecopiladorService } from '../recopilador/recopilador.service';
import { VotacionesService } from '../votaciones/votaciones.service';
import { LoginService } from '../login/login.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { VotacionesModel } from 'src/app/models/votaciones';
import { registroVotacionModel } from 'src/app/models/registrosVotaciones';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosvotosService {
  votaciones:any=[]
  categorias:any =[]
  datosLogin: UsuariosModel={}
  votacionesFiltradas:any=[]
  DatosVotacio:VotacionesModel={}

  private registrosVotos: BehaviorSubject<any> =new BehaviorSubject<any>({})


  constructor(
    private router: Router,
    private recopiladorservice:RecopiladorService,
    private votacionesservice:VotacionesService,
    private loginservice:LoginService
    
  ){}

  ngOnInit(): void {
 
   
    this.cargarLogin()
    this.recopilar_datos_votaciones()


   
  }


  



  cargarLogin(){
    this.loginservice.obtener_datos_login.subscribe(
      res=>{
        this.datosLogin=res
      }
    )

  }
  recopilar_datos_votaciones(){
    this.recopiladorservice.obtener_datos_voto.subscribe(
      res=>{
        this.DatosVotacio=res
      }
    )

  }



    LitarVotacionesPorUsuario(){
    this.votacionesservice.get_listar_para_tabla().subscribe(
      res=>{
        this.votaciones =res
        if(this.datosLogin.permisos==="admin"){
          this.votacionesFiltradas=this.votaciones
          
          
         
         
        }else{
       
        this.votacionesFiltradas=this.votaciones.filter((datos:registroVotacionModel)=>datos.id_usuario===this.DatosVotacio["id_usuario"])
   
      }
    }
    
    )
    return this.votacionesFiltradas
    
 
  }

  
}
