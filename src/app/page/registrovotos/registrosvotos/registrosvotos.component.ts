import { Component } from '@angular/core';
import { VotacionesService } from 'src/app/service/votaciones/votaciones.service';
import { RecopiladorService } from 'src/app/service/recopilador/recopilador.service';
import { VotacionesModel } from 'src/app/models/votaciones';
import {registroVotacionModel} from "src/app/models/registrosVotaciones"
import { LoginService } from 'src/app/service/login/login.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { tokenModel } from 'src/app/models/toke';

@Component({
  selector: 'app-registrosvotos',
  templateUrl: './registrosvotos.component.html',
  styleUrls: ['./registrosvotos.component.css']
})
export class RegistrosvotosComponent {
  DatosTokem:tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "{}")

  
  votaciones:any=[]
  votacionesFiltradas:any=[]
  DatosVotacio:VotacionesModel={}
  datosLogin: UsuariosModel={}

  constructor(
    private votacionesservice:VotacionesService,
    private recopiladorservice:RecopiladorService,
    private loginservice:LoginService
  ){

  }
  ngOnInit(){
  
    this.get_listar_para_tabla()
    this.recopiladorservice.obtener_datos_voto.subscribe(
      res=>{
        this.DatosVotacio=res
      }
    )

  
    this.loginservice.obtener_datos_login.subscribe(
      res=>{
        this.datosLogin=res
      }
    )
  }

  eliminar(id_voto:string){
    this.votacionesservice.delete(id_voto).subscribe(
      res=>{
        console.log("Voto eliminado exitosamente")
        this.get_listar_para_tabla()
      },err=>{
        console.error("Error al eliminar el voto: ",err)
      }
    )
  }

  get_listar_para_tabla(){
    this.votacionesservice.get_listar_para_tabla().subscribe(
      res=>{
        this.votaciones =res
        if(this.DatosTokem.permisos==="admin"){
          this.votacionesFiltradas=this.votaciones
        }else{
        this.votacionesFiltradas=this.votaciones.filter((datos:registroVotacionModel)=>datos.id_usuario===this.DatosTokem.id_usuario)
      }
    }
    )
 
  }

}
 