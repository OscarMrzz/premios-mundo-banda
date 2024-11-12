import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NominacionesService} from "../../service/nominacion/nominacion.service"
import { Nominaciones_tablaModel } from '../../models/nomianciones_tabla';
import { NominacionModel } from '../../models/nominacion';

import { NominadosService } from '../../service/nominados/nominados.service';
import { CategoriasService } from '../../service/categorias/categorias.service';


 type Elmodelo =Nominaciones_tablaModel


@Component({
  selector: 'app-nominaciones',
  templateUrl: './nominaciones.component.html',
  styleUrls: ['./nominaciones.component.css']
})
export class NominacionesComponent {
  //capturamos el el elemento de nombre del formulario
  //esto para colocar el foco ahi

  datosFormulario: NominacionModel = {
    id_nominacion: 0,
    id_nominado: 0,
    id_categoria: 0,
      
  };
  editando =false
  datoscapturadoparaedicion:  NominacionModel={}
 

  nominaciones:any = []
  categorias:any =[]
  nominados:any=[]

  constructor(
    private serviceCRUD:NominacionesService,
    
    private servicecategorias:CategoriasService,
    private servicenominados:NominadosService
 

  ){

  }
  ngOnInit(): void {
    this.get_listar_para_tabla()
    this.get_listas_formulario()
   
  }



  get_listar_para_tabla() {
    this.serviceCRUD.get_listar_para_tabla().subscribe(
      res=>{
        this.nominaciones=res
    

      },
      err=>{
      
        console.error(err)
      }
      
    )
 
  }
  get_listas_formulario(){
    this.servicenominados.get().subscribe(
      res=>{
        this.nominados=res
      }
    )

    this.servicecategorias.get().subscribe(
      res=>{
        this.categorias=res
      }
    )


  }



  capturarparaeditar(indice:number){
   
    this.datoscapturadoparaedicion["id_nominacion"] =this.nominaciones[indice].id_nominacion
    this.datoscapturadoparaedicion["id_nominado"] =this.nominaciones[indice].id_nominado
    this.datoscapturadoparaedicion["id_categoria"] =this.nominaciones[indice].id_categoria

    this.datosFormulario =this.datoscapturadoparaedicion
    this.editando= true
   console.log( this.datoscapturadoparaedicion)
  }

  agregar_editar(formulario:any){

    if(this.editando){
      console.log("Esto vamos a editar: ",this.datosFormulario)
      let elid =String( this.datoscapturadoparaedicion.id_nominacion)
      this.serviceCRUD.update(elid ,this.datosFormulario).subscribe(respuesta =>{
        console.log("Edicion exitosa",respuesta)
        this.datosFormulario["id_nominacion"]=0
        this.get_listar_para_tabla()
        this.editando =false
      },error=>{
        console.error("Error: ",error)
      }
    )
      

    }else{
    let datosCapturadosForm:  NominacionModel= this.datosFormulario
    
    this.serviceCRUD.save(datosCapturadosForm).subscribe(respuesta=>{
      console.log("Usuario agregado exitosamente", respuesta)
      this.get_listar_para_tabla()
    }, error=>{
      console.error("error al agregar el usuario", error)
    }

    )
  }

    formulario.reset()
    
   

  }

  eliminar(id: string){
    console.log("iniciando eliminacion")
    this.serviceCRUD.delete(id).subscribe(respuesta=>{
      console.log("usuario eliminado exitosamente",respuesta)
      this.get_listar_para_tabla()
    },error=>{
      console.error("error al eliminar el usuario",error)
    }
  )

  }





}
