import { CanActivateFn, Router } from '@angular/router';
import { UsuariosModel } from '../models/usuarios';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';



export const asistente_jurado_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let acceso:boolean
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    })
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "asistente" || res.permisos === "jurado")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  );
};

export const asistente_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let acceso:boolean
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    })
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "asistente")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  );
};


export const jurado_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let acceso:boolean
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    }
  )
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "jurado")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  );
};



export const solo_admin: CanActivateFn=(route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => res.permisos === "admin"),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  );
};





