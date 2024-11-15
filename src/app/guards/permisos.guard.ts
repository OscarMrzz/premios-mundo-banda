import { CanActivateFn, Router } from '@angular/router';
import { UsuariosModel } from '../models/usuarios';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { state } from '@angular/animations';

export const asistente_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => res.permisos === "admin" || res.permisos === "asistente"),
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
  
  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => res.permisos === "admin" || res.permisos === "jurado"),
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