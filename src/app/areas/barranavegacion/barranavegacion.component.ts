import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { tokenModel } from 'src/app/models/toke';

@Component({
  selector: 'app-barranavegacion',
  templateUrl: './barranavegacion.component.html',
  styleUrls: ['./barranavegacion.component.css']
})
export class BarranavegacionComponent implements OnInit {
  usuario$: tokenModel | undefined;
  estado: boolean = false; // Variable para controlar el estado del usuario
  datosToken: tokenModel | null = null; // Tipo seguro para manejar el token
  estadoInicioSecion: boolean | undefined;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    estadoInicioSecion:Boolean
    // Obtener y procesar el token desde localStorage
    const datosLlegadaToke = localStorage.getItem("DatosTokenLS");
    this.loginService.obtener_stado.subscribe(
      (res:boolean)=>{
    
          this.estadoInicioSecion=res
          if (datosLlegadaToke) {
            try {
              this.datosToken = JSON.parse(datosLlegadaToke);
            } catch (error) {
              console.error("Error al parsear el token:", error);
            }
          }

          // Inicializar usuario y estado
    this.usuario$ = this.datosToken ?? { permisos: "" };
    this.estado = this.datosToken?.acceso ?? false;

 
      }
    )


    
  }

  cerrar_secion() {
    this.estado = false;
    localStorage.removeItem("DatosTokenLS"); // Limpiar el token del localStorage
    console.log("Sesión cerrada.");
  }
}
