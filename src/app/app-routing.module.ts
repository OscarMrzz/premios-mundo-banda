import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AreausuariosComponent } from './areausuarios/areausuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NominacionesComponent } from './nominacion/nominaciones.component';
import { VotacionesComponent } from './votaciones/votaciones.component';
import { VotacionesFinalComponent } from './votaciones-final/votaciones-final.component';
import { LoginComponent } from './login/login.component';
import { asistente_adminGuard, jurado_adminGuard } from './guards/permisos.guard';
import { NominadosComponent } from './nominados/nominados.component';

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
