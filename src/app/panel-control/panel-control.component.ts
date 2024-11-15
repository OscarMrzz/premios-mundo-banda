import { Component } from '@angular/core';
import { UsuariosModel } from '../models/usuarios';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent {
  usuario$!: Observable<UsuariosModel>;
  estado: boolean = false; // Cambiamos estado$ a una variable booleana
  constructor(
    private loginService: LoginService
  ){}

  ngOnInit() {
    this.usuario$ = this.loginService.obtener_datos_login;
    this.loginService.obtener_stado.subscribe(value => {
      this.estado = value;
     
    });
}
}
