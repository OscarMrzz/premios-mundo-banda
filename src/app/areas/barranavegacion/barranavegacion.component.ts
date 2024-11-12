import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { map, Observable } from 'rxjs';
import { UsuariosModel } from '../../models/usuarios';

@Component({
  selector: 'app-barranavegacion',
  templateUrl: './barranavegacion.component.html',
  styleUrls: ['./barranavegacion.component.css']
})
export class BarranavegacionComponent implements OnInit {
  usuario$!: Observable<UsuariosModel>;
  estado: boolean = false; // Cambiamos estado$ a una variable booleana

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.usuario$ = this.loginService.obtener_datos_login;
    this.loginService.obtener_stado.subscribe(value => {
      this.estado = value;
     
    });
  }

  
}
