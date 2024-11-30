import { Component } from '@angular/core';
import { permisosModel } from 'src/app/models/permisos';
import { UsuariosService } from 'src/app/service/usuarios/usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

 acceso:permisosModel ={}
  constructor(private usuariosservices:UsuariosService){

  }
  ngOnInit(){
   this.getAccesoUsuarios()
 
    

  }

  getAccesoUsuarios(){
   this.usuariosservices.getacceso().subscribe(
     res=>{
       this.acceso=res
        
    }
    )
   
  
  }

  


  Dar_quitar_permisos(event:Event,permiso:string){
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.accionCuandoTrue(permiso);
    } else {
      this.accionCuandoFalse(permiso);
    }
  }

  accionCuandoTrue(permiso:string): void {
  
    this.usuariosservices.update_acceso(permiso, true).subscribe(
      res => {
        this.getAccesoUsuarios()
       
        
      },
      err => {
        console.error('El error es este:', err);
      }
    );
  }

  accionCuandoFalse(permiso:string): void {
   
    this.usuariosservices.update_acceso(permiso, false).subscribe(
      res => {
        this.getAccesoUsuarios()
   
        
      },
      err => {
        console.error('El error es este:', err);
      }
    );
  }

}
  
  
