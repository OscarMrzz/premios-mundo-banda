import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { LoginService } from '../../service/login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario$!: Observable<UsuariosModel>;
  estado!: boolean;
 

  loginForm = this.formBuilder.group({
    nombre_usuario: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservice: UsuariosService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.usuario$ = this.loginService.obtener_datos_login;
    this.loginService.obtener_stado.subscribe(value => {
      this.estado = value;
     
    });
  }

  aceptar() {
    const el_nombre_usuario = this.loginForm.get("nombre_usuario")?.value;
    if (el_nombre_usuario) {
      this.loginService.guardar_datos_login = el_nombre_usuario;
    }
  }
}
 