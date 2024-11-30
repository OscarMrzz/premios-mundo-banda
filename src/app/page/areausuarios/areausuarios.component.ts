import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from "../../service/usuarios/usuarios.service";
import { UsuariosModel } from '../../models/usuarios';

@Component({
  selector: 'app-areausuarios',
  templateUrl: './areausuarios.component.html',
  styleUrls: ['./areausuarios.component.css']
})
export class AreausuariosComponent implements OnInit {
  @ViewChild('nombreInput') nombreInput!: ElementRef;

  // Inicialización correcta de los datos del formulario
  datosFormulario: UsuariosModel = {
    id_usuario: 0,
    nombre: '',
    apellido: '',
    nombre_usuario: '',
    password: '',
    permisos: ''
  };

  editando = false;

  // Datos para la edición, aseguramos que los valores sean opcionales o vacíos
  datoscapturadoparaedicion: UsuariosModel = {
    id_usuario: 0,
    nombre: '',
    apellido: '',
    nombre_usuario: '',
    password: '',
    permisos: ''
  };

  usuarios: UsuariosModel[] = [];

  constructor(private usuariosservice: UsuariosService) { }

  ngOnInit(): void {
    this.get();
  }

  // Método para obtener usuarios desde el servicio
  get(): void {
    this.usuariosservice.get().subscribe(
      (res: UsuariosModel[]) => {
        this.usuarios = res;
        console.log("Conexión a la base de datos exitosa");
      },
      err => console.log(err)
    );
  }

  // Método para capturar el usuario a editar
  capturarparaeditar(indice: number): void {
    // Aseguramos que estamos capturando el usuario correctamente
    this.datoscapturadoparaedicion = { ...this.usuarios[indice] };
    this.datosFormulario = { ...this.usuarios[indice] };
    this.datosFormulario.password=""
    this.editando = true;
  }

  // Método para agregar o editar usuario
  agregar_editar(formulario: any): void {
    if (this.editando) {
      // Editar usuario
      const elid = String(this.datoscapturadoparaedicion.id_usuario);
      console.log("esmos en el ara usuario",elid)
      this.usuariosservice.update(elid, this.datosFormulario).subscribe(respuesta => {
        this.datosFormulario = { id_usuario: 0, nombre: '', apellido: '', nombre_usuario: '', password: '', permisos: '' };
        console.log("Edición exitosa");
        this.get();
        this.editando = false;
      }, error => {
        console.error("Error al editar el usuario", error);
      });
    } else {
      // Agregar nuevo usuario
      const datosCapturadosForm: UsuariosModel = this.datosFormulario;
      this.usuariosservice.save(datosCapturadosForm).subscribe(respuesta => {
        console.log("Usuario agregado exitosamente", respuesta);
        this.get();
      }, error => {
        console.error("Error al agregar el usuario", error);
      });
    }

    // Reiniciar el formulario y dar foco al campo nombre
    formulario.reset();
    this.nombreInput.nativeElement.focus();
  }

  // Método para eliminar un usuario
  eliminar(id_usuario:string |any): void {
    console.log("Iniciando eliminación");
    this.usuariosservice.delete(String(id_usuario)).subscribe(respuesta => {
      this.get();
    }, error => {
      console.error("Error al eliminar el usuario", error);
    });
  }
}
