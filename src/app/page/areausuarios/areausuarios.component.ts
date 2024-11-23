import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import {UsuariosService} from "../../service/usuarios/usuarios.service"
import { UsuariosModel } from '../../models/usuarios';


@Component({
  selector: 'app-areausuarios',
  templateUrl: './areausuarios.component.html',
  styleUrls: ['./areausuarios.component.css']
})
export class AreausuariosComponent implements OnInit{
  //capturamos el el elemento de nombre del formulario
  //esto para colocar el foco ahi
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  datosFormulario: UsuariosModel = {
    id_usuario: 0,
    nombre: '',
    apellido: '',
    nombre_usuario: '',
    password: '',
    permisos: ''
  };
  editando =false
  datoscapturadoparaedicion: UsuariosModel={}

  usuarios:any = []
  constructor(
    private usuariosservice:UsuariosService
  ){

  }
  ngOnInit(): void {
    this.get()
  }



  get() {
    this.usuariosservice.get().subscribe(
      res => {
        this.usuarios = res;
        console.log("conexion a la base de datos exitosa")
      },
      err => console.log(err)
    );
  }
  capturarparaeditar(indice:number){
    this.datoscapturadoparaedicion=this.usuarios[indice]
    this.datosFormulario =this.usuarios[indice]
    this.editando= true
  }

  agregar_editar(formulario:any){

    if(this.editando){
      console.log("Esto vamos a editar: ",this.datosFormulario)
      let elid =String( this.datoscapturadoparaedicion.id_usuario)
      this.usuariosservice.update(elid ,this.datosFormulario).subscribe(respuesta =>{
        this.datosFormulario["id_usuario"]=0
  
        console.log("Edicion exitosa")
        this.get()
        this.editando =false
      },error=>{
        console.error("Error: ",error)
      }
    )
      

    }else{
    let datosCapturadosForm: UsuariosModel= this.datosFormulario
    
    this.usuariosservice.save(datosCapturadosForm).subscribe(respuesta=>{
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
    this.usuariosservice.delete(id).subscribe(respuesta=>{
      console.log("usuario eliminado exitosamente",respuesta)
      this.get()
    },error=>{
      console.error("error al eliminar el usuario",error)
    }
  )

  }
} 
