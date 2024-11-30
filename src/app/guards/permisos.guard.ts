import { CanActivateFn, Router } from '@angular/router';
import { UsuariosModel } from '../models/usuarios';
import { Observable, of } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { tokenModel } from '../models/toke';
import { UsuariosService } from '../service/usuarios/usuarios.service';
import { permisosModel } from '../models/permisos';


  
  
  



export const asistente_jurado_adminGuard: CanActivateFn = (_route, _state) => {
  const loginService = inject(LoginService);
  const usuarioservice = inject(UsuariosService);
  const router = inject(Router);
  

  const datosToken: tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "");

  return usuarioservice.getOneAcceso(String( datosToken.nombre_usuario)).pipe(

    map((res) => {
      
      const permiso = datosToken.permisos

      // Verifica si el permiso es válido
 
      if (Number(res) === 1) {
     
        const tienePermisos =(datosToken.permisos === "jurado" || datosToken.permisos === "asistente" || datosToken.permisos === "admin") &&Number(datosToken.acceso) ===1;
    
        if (!tienePermisos) {
          localStorage.removeItem("DatosToketLs")
          loginService.cambiar_status =false
          
          router.navigate([""]); // Redirige si no tiene permisos
          return router.parseUrl(""); // Devuelve una UrlTree para redirección
        }

        return true; // Permite el acceso si todo está bien
      }

      // Si no tiene el permiso, redirige
      localStorage.removeItem("DatosToketLs")
      loginService.cambiar_status =false
      return router.parseUrl("");
    }),
    catchError((error) => {
      localStorage.removeItem("DatosToketLs")
      loginService.cambiar_status =false
      console.error("Error verificando acceso:", error);
      return of(router.parseUrl("")); // Redirige en caso de error
    })
  );
};

export const asistente_adminGuard: CanActivateFn = (_route, _state) => {
  const loginService = inject(LoginService);
  const usuarioservice = inject(UsuariosService);
  const router = inject(Router);

  const datosToken: tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "");

  return usuarioservice.getOneAcceso(String( datosToken.nombre_usuario)).pipe(

    map((res) => {
      
      const permiso = datosToken.permisos

      // Verifica si el permiso es válido

      if (Number(res) === 1) {
  
        const tienePermisos =(datosToken.permisos === "asistente" || datosToken.permisos === "admin") &&Number(datosToken.acceso) ===1;

        if (!tienePermisos) {
          localStorage.removeItem("DatosToketLs")
          loginService.cambiar_status =false
          router.navigate([""]); // Redirige si no tiene permisos
          return router.parseUrl(""); // Devuelve una UrlTree para redirección
        }

        return true; // Permite el acceso si todo está bien
      }

      // Si no tiene el permiso, redirige
      localStorage.removeItem("DatosToketLs")
      loginService.cambiar_status =false
      return router.parseUrl("");
    }),
    catchError((error) => {
      localStorage.removeItem("DatosToketLs")
      loginService.cambiar_status =false
      console.error("Error verificando acceso:", error);
      return of(router.parseUrl("")); // Redirige en caso de error
    })
  );
};

export const jurado_adminGuard: CanActivateFn = (_route, _state) => {
  const loginService = inject(LoginService);
  const usuarioservice = inject(UsuariosService);
  const router = inject(Router);

  const datosToken: tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "");

  return usuarioservice.getOneAcceso(String( datosToken.nombre_usuario)).pipe(

    map((res) => {
      
      const permiso = datosToken.permisos

      // Verifica si el permiso es válido

      if (Number(res) === 1) {

     
        const tienePermisos =(datosToken.permisos === "jurado" || datosToken.permisos === "admin") &&Number(datosToken.acceso) ===1;
   
        if (!tienePermisos) {
          router.navigate([""]); // Redirige si no tiene permisos
          return router.parseUrl(""); // Devuelve una UrlTree para redirección
        }

        return true; // Permite el acceso si todo está bien
      }

      // Si no tiene el permiso, redirige
      return router.parseUrl("");
    }),
    catchError((error) => {
      console.error("Error verificando acceso:", error);
      return of(router.parseUrl("")); // Redirige en caso de error
    })
  );
};


  
/*   return loginService.obtener_datos_login.pipe(
    map((res: UsuariosModel) => (res.permisos === "admin" || res.permisos === "jurado")&&Number(res.acceso)===Number(acceso)),
    tap(isAllowed => {
      if (!isAllowed) {
        router.navigate([""]);
      }
    })
  ); */




export const solo_admin: CanActivateFn = (_route, _state) => {
  const loginService = inject(LoginService);
  const usuarioservice = inject(UsuariosService);
  const router = inject(Router);

  const datosToken: tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "");

  return usuarioservice.getOneAcceso(String( datosToken.nombre_usuario)).pipe(

    map((res) => {
      
      const permiso = datosToken.permisos

      // Verifica si el permiso es válido
   
      if (Number(res) === 1) {
      
     
        const tienePermisos = datosToken.permisos === "admin" ;
     
        if (!tienePermisos) {
          router.navigate([""]); // Redirige si no tiene permisos
          return router.parseUrl(""); // Devuelve una UrlTree para redirección
        }

        return true; // Permite el acceso si todo está bien
      }

      // Si no tiene el permiso, redirige
      return router.parseUrl("");
    }),
    catchError((error) => {
      console.error("Error verificando acceso:", error);
      return of(router.parseUrl("")); // Redirige en caso de error
    })
  );
};


  






