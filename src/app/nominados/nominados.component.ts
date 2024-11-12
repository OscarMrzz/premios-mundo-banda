import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NominadosService} from "../service/nominados/nominados.service"
import { NominadosModel } from '../models/nominados';

@Component({
  selector: 'app-nominados',
  templateUrl: './nominados.component.html',
  styleUrls: ['./nominados.component.css']
})
export class NominadosComponent {
  
  //capturamos el el elemento de nombre del formulario
  //esto para colocar el foco ahi
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  datosFormulario: NominadosModel = {
    id_nominado:0,
    nombre_nominado:""
  };
  editando =false
  datoscapturadoparaedicion: NominadosModel={}

  nominados:any = []
  constructor(
    private nominadosservices:NominadosService
  ){

  }
  ngOnInit(): void {
    this.get()
  }



  get() {
    this.nominadosservices.get().subscribe(
      res => {
        this.nominados = res;
        console.log("conexion a la base de datos exitosa")
      },
      err => console.log(err)
    );
  }
  capturarparaeditar(indice:number){
    this.datoscapturadoparaedicion=this.nominados[indice]
    this.datosFormulario =this.nominados[indice]
    this.editando= true
  }

  agregar_editar(formulario:any){

    if(this.editando){
      let elid =String( this.datoscapturadoparaedicion.id_nominado)
      this.nominadosservices.update(elid ,this.datosFormulario).subscribe(respuesta =>{
        this.datosFormulario["id_nominado"]=0
        this.get()
        this.editando =false
      },error=>{
        console.error("Error: ",error)
      }
    )
      

    }else{
    let datosCapturadosForm: NominadosModel= this.datosFormulario
    
    this.nominadosservices.save(datosCapturadosForm).subscribe(respuesta=>{
      console.log("Usuario agregado exitosamente", respuesta)
      this.get()
    }, error=>{
      console.error("error al agregar el usuario", error)
    }

    )
  }

    formulario.reset()
    this.nombreInput.nativeElement.focus()
   

  }

  eliminar(id: string){
    console.log("iniciando eliminacion")
    this.nominadosservices.delete(id).subscribe(respuesta=>{
      console.log("usuario eliminado exitosamente",respuesta)
      this.get()
    },error=>{
      console.error("error al eliminar el usuario",error)
    }
  )

  }

}
