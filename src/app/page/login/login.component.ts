import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { UsuariosModel } from 'src/app/models/usuarios';
import { LoginService } from '../../service/login/login.service';
import { Observable } from 'rxjs';
import { RecopiladorService } from 'src/app/service/recopilador/recopilador.service';
import { loginModel } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario$!: Observable<UsuariosModel>;
  estado!: boolean;
 

  loginForm = this.formBuilder.group({
    nombre_usuario: ["", Validators.required],
    password_usuario: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioservice: UsuariosService,
    private loginService: LoginService,
    private recopiladorservice: RecopiladorService
  ) {}

  ngOnInit(): void {
    this.usuario$ = this.loginService.obtener_datos_login;
    this.loginService.obtener_stado.subscribe(value => {
      this.estado = value;
     
    });

  }

  aceptar() {
    

  
      // Asegúrate de inicializar el objeto Datoslogin antes de usarlo
      let Datoslogin: loginModel = {
        nombre_usuario: '',
        password: ''
      };
  
      // Asignar valores correctamente verificando que no sean null o undefined
      Datoslogin.nombre_usuario = this.loginForm.get("nombre_usuario")?.value ?? '';
      Datoslogin.password = this.loginForm.get("password_usuario")?.value ?? '';
  
      if (Datoslogin.nombre_usuario) {
        this.loginService.login(Datoslogin);
       

      }
      }
    }
 
  

 