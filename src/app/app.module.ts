import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreausuariosComponent } from './areas/areausuarios/areausuarios.component';
import { HomeComponent } from './areas/home/home.component';
import { BarranavegacionComponent } from './barranavegacion/barranavegacion.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriasComponent } from './areas/categorias/categorias.component';
import { NominacionesComponent } from './areas/nominacion/nominaciones.component';
import { VotacionesComponent } from './votaciones/votaciones.component';

import { VotacionesFinalComponent } from './votaciones-final/votaciones-final.component';
import { LoginComponent } from './areas/login/login.component';
import { NominadosComponent } from './areas/nominados/nominados.component';





@NgModule({
  declarations: [
    AppComponent,
    AreausuariosComponent,
    HomeComponent,
    BarranavegacionComponent,
    FooterComponent,
    CategoriasComponent,
    NominacionesComponent,
    VotacionesComponent,

    VotacionesFinalComponent,
     LoginComponent,
     NominadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
