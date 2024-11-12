import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreausuariosComponent } from './page/areausuarios/areausuarios.component';
import { HomeComponent } from './page/home/home.component';
import { BarranavegacionComponent } from './areas/barranavegacion/barranavegacion.component';
import { FooterComponent } from './areas/footer/footer.component';
import { CategoriasComponent } from './page/categorias/categorias.component';
import { NominacionesComponent } from './page/nominacion/nominaciones.component';
import { VotacionesComponent } from './page/votaciones/votaciones.component';

import { VotacionesFinalComponent } from './page/votaciones-final/votaciones-final.component';
import { LoginComponent } from './page/login/login.component';
import { NominadosComponent } from './page/nominados/nominados.component';





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
