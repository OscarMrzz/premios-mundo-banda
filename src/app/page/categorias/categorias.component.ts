import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CategoriasService} from "../../service/categorias/categorias.service"
import { CategoriasModel } from '../../models/categorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  //capturamos el el elemento de nombre del formulario
  //esto para colocar el foco ahi
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  datosFormulario: CategoriasModel = {
    id_categoria: 0,
    nombre_categoria: '',
    detalles_categoria: '', 
   
  };
  editando =false
  datoscapturadoparaedicion: CategoriasModel={}

  categorias:any = []
  constructor(
    private categoriaservice:CategoriasService
  ){

  }
  ngOnInit(): void {
    this.get()
  }



  get() {
    this.categoriaservice.get().subscribe(
      res => {
        this.categorias = res;
        console.log("conexion a la base de datos exitosa")
      },
      err => console.log(err)
    );
  }
  capturarparaeditar(indice:number){
    this.datoscapturadoparaedicion=this.categorias[indice]
    this.datosFormulario =this.categorias[indice]
    this.editando= true
  }

  agregar_editar(formulario:any){

    if(this.editando){
      
      let elid =String( this.datoscapturadoparaedicion.id_categoria)
      this.categoriaservice.update(elid ,this.datosFormulario).subscribe(respuesta =>{
        this.datosFormulario["id_categoria"]=0
        console.log("Edicion exitosa")
        this.get()
        this.editando =false
      },error=>{
        console.error("Error: ",error)
      }
    )
      

    }else{
    let datosCapturadosForm: CategoriasModel= this.datosFormulario
    
    this.categoriaservice.save(datosCapturadosForm).subscribe(respuesta=>{
     
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
  
    this.categoriaservice.delete(id).subscribe(respuesta=>{
      console.log("usuario eliminado exitosamente")
      this.get()
    },error=>{
      console.error("error al eliminar el usuario",error)
    }
  )

  }

}
