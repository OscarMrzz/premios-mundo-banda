import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AreausuariosComponent } from './page/areausuarios/areausuarios.component';
import { CategoriasComponent } from './page/categorias/categorias.component';
import { NominacionesComponent } from './page/nominacion/nominaciones.component';
import { VotacionesComponent } from './page/votaciones/votaciones.component';
import { VotacionesFinalComponent } from './page/votaciones-final/votaciones-final.component';
import { LoginComponent } from './page/login/login.component';
import { asistente_adminGuard, jurado_adminGuard } from './guards/permisos.guard';
import { NominadosComponent } from './page/nominados/nominados.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "usuarios", component: AreausuariosComponent, canActivate:[asistente_adminGuard] },
  { path: "categorias", component: CategoriasComponent, canActivate:[asistente_adminGuard] },
  { path: "nominados", component: NominadosComponent, canActivate:[asistente_adminGuard] },
  { path: "nominaciones", component: NominacionesComponent, canActivate:[asistente_adminGuard] },
  { path: "votaciones", component: VotacionesComponent,canActivate:[jurado_adminGuard] },
  { path: "votaciones-final", component: VotacionesFinalComponent,canActivate:[jurado_adminGuard] },
  { path: "login", component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
