import { Component } from '@angular/core';
import { VotacionesModel } from 'src/app/models/votaciones';
import { RecopiladorService } from 'src/app/service/recopilador/recopilador.service';
import { NominacionesService } from 'src/app/service/nominacion/nominacion.service';
import { VotacionesService } from 'src/app/service/votaciones/votaciones.service';
import { Router } from '@angular/router';
import { tokenModel } from 'src/app/models/toke';

@Component({
  selector: 'app-votaciones-final',
  templateUrl: './votaciones-final.component.html',
  styleUrls: ['./votaciones-final.component.css']
})
export class VotacionesFinalComponent {
  DatosTokem:tokenModel = JSON.parse(localStorage.getItem("DatosTokenLS") ?? "{}")
  categiriaseleccionada:VotacionesModel={}
  nominados:any=[]
  nominadosFiltrados:any=[]
  constructor(
    private recopiladorservice:RecopiladorService,
    private nominacionesservices:NominacionesService,
    private votacionesservices:VotacionesService,
    private router:Router
  ){
    
    
  }
  ngOnInit(): void {

    this.recopiladorservice.obtener_datos_voto.subscribe(
      res=>{
        this.categiriaseleccionada=res
      }
    )       

    this.nominacionesservices.get_listar_para_tabla().subscribe(
      res=>{
        this.nominados=res
        this.nominadosFiltrados = this.nominados.filter((dato:VotacionesModel) =>dato.id_categoria ===this.categiriaseleccionada["id_categoria"])
      }
    ) 


  }

 votar(indice:number){
  const nominadoSeleccionado=this.nominadosFiltrados[indice]

  this.recopiladorservice.agregar_datos_voto({"id_usuario":this.DatosTokem.id_usuario})
  this.recopiladorservice.agregar_datos_voto({"id_nominado":nominadoSeleccionado["id_nominado"]})
  let elVotoFinal =this.categiriaseleccionada
  if (elVotoFinal) {
    this.votacionesservices.save(elVotoFinal).subscribe(
      () => this.router.navigate(["votaciones"]),
      err => console.error("Error al votar:", err)
    );
  } else {
    console.error("No se pudo realizar la votación, faltan datos.");
  }
  

 }

}
