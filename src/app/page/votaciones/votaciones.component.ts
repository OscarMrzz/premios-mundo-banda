import { Component } from '@angular/core';
import {CategoriasService} from "../../service/categorias/categorias.service"
import { Router} from '@angular/router';
import { RecopiladorService } from 'src/app/service/recopilador/recopilador.service';
import { VotacionesService } from 'src/app/service/votaciones/votaciones.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { LoginService } from 'src/app/service/login/login.service';
import { registroVotacionModel } from 'src/app/models/registrosVotaciones';
import { VotacionesModel } from 'src/app/models/votaciones';
import { RegistrosvotosService } from 'src/app/service/registrosvotos/registrosvotos.service';
import { CategoriasModel } from 'src/app/models/categorias';
@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent {
  votaciones:any=[]
  categorias:any =[]
  categoriaFiltrada:any=[]
  datosLogin: UsuariosModel={}
  votacionesFiltradas:any=[]
  DatosVotacio:VotacionesModel={}

  constructor(
    private router: Router,
    private categoriasService:CategoriasService,
    private recopiladorservice:RecopiladorService,
    private votacionesservice:VotacionesService,
    private loginservice:LoginService,
    private registroservice:RegistrosvotosService
    
  ){}

  ngOnInit(): void {
 
    this.getCategorias()
    this.cargarLogin()
    this.recopilar_datos_votaciones()
    

   
    
   
  }



  getCategorias() { 
    this.categoriasService.get().subscribe(
      res => {
        this.categorias = res;
        //filtrampos los datos
        this.votacionesservice.get_listar_para_tabla().subscribe(
          res=>{
            this.votaciones =res
            if(this.datosLogin.permisos==="admin"){
              this.votacionesFiltradas=this.votaciones
    

    
              this.categorias.forEach((cat:CategoriasModel)=>{
    
                const comprovacion =this.votacionesFiltradas.find((cat_comparacion:registroVotacionModel)=>cat_comparacion.id_categoria===cat.id_categoria)
    
                if(!comprovacion){
                  this.categoriaFiltrada.push(cat)
                }
    
              })

            
    
            }else{
    
            this.votacionesFiltradas=this.votaciones.filter((datos:registroVotacionModel)=>datos.id_usuario===this.DatosVotacio["id_usuario"])
              
       
    
            this.categorias.forEach((cat:CategoriasModel)=>{
    
              const comprovacion =this.votacionesFiltradas.find((cat_comparacion:registroVotacionModel)=>cat_comparacion.id_categoria===cat.id_categoria)
    
              if(!comprovacion){
                this.categoriaFiltrada.push(cat)
              }
    
            })
    
     
          }
        }
        ) 
      },
      err => console.log(err)
    );
  }

  capturar_categoria_seleccionada(indice:number){

    const categoriaSeleccionada =this.categoriaFiltrada[indice]
    this.recopiladorservice.agregar_datos_voto({id_categoria:categoriaSeleccionada["id_categoria"]})
   
    this.router.navigate(["/votaciones-final"])

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



  
  }


