import { Component } from '@angular/core';
import { UsuariosModel } from '../../models/usuarios';
import { Observable } from 'rxjs';
import { LoginService } from '../../service/login/login.service';
import { tokenModel } from 'src/app/models/toke';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent {
  usuario$!:tokenModel;
  datosToken:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
  estado: boolean = false; // Cambiamos estado$ a una variable booleana
  constructor(
    private loginService: LoginService
  ){}

  ngOnInit() {
    this.usuario$ = this.datosToken ?? {permisos:""};
  this.estado=this.datosToken.acceso ?? false
  console.log(this.datosToken)
    
     
    };
}

