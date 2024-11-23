import { CanActivateFn, Router } from '@angular/router';
import { UsuariosModel } from '../models/usuarios';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { tokenModel } from '../models/toke';



export const asistente_jurado_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let datosToken:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
  let acceso:boolean
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    })

    
  
 /*  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "asistente" || res.permisos === "jurado")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  ); */
  let RevicionPermisos = (datosToken.permisos ==="asistente" || datosToken.permisos==="jurado" ||datosToken.permisos==="admin")&&datosToken.acceso==true
  return RevicionPermisos
};

export const asistente_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let acceso:boolean
  let datosToken:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    })
  
 /*  return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "asistente")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  ); */


  let RevicionPermisos = (datosToken.permisos ==="asistente" || datosToken.permisos==="admin")&&datosToken.acceso==true
  return RevicionPermisos
};


export const jurado_adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let acceso:boolean
  let datosToken:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
  loginService.obtener_stado.subscribe(
    res=>{
      acceso=res

    }
  )
  
/*   return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "jurado")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  ); */

  let RevicionPermisos = (datosToken.permisos ==="jurado" || datosToken.permisos==="admin")&&datosToken.acceso==true
  return RevicionPermisos
};



export const solo_admin: CanActivateFn=(route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  let datosToken:tokenModel=JSON.parse(localStorage.getItem("DatosTokenLS") ?? "")
  
/*   return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => res.permisos === "admin"),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  ); */


  let RevicionPermisos = datosToken.permisos==="admin"
  return RevicionPermisos
};





