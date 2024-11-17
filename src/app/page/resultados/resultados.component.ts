import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';
import { VotacionesModel } from 'src/app/models/votaciones';
import { CategoriasService } from 'src/app/service/categorias/categorias.service';
import { NominacionesService } from 'src/app/service/nominacion/nominacion.service';
import { VotacionesService } from 'src/app/service/votaciones/votaciones.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  categorias: any = [];
  nominados: any = [];
  nominadosFiltrados: any = []; // Variable para almacenar los nominados filtrados
  votaciones:any =[]
  Votossumados:any=[]

  constructor(
    private categoriasService: CategoriasService,
    private nominacionessservice: NominacionesService,
    private votacionesservices:VotacionesService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.nominacionessservice.get_listar_para_tabla().subscribe(
      res=>{
        this.nominados=res
      
      }
    )
    this.getVotaciones()
   

 

    
  }

  getCategorias() {
    this.categoriasService.get().subscribe(
      res => {
        this.categorias = res;
        console.log("Conexión a la base de datos exitosa");
      },
      err => console.log(err)
    );
  }
  getVotaciones(){
    this.votacionesservices.get_listar_para_tabla().subscribe(
      res=>{
      
        this.votaciones=res
        this.sumarVotos()
      }
    )
  }

  filtrarPorcategoria(id_categoria:number){
    this.nominadosFiltrados=this.nominados.filter((datos:any) =>datos.id_categoria===id_categoria)
    this.nominadosFiltrados.forEach((element: { voto: number,porcentaje:number}) => {
      element.voto=0
      element.porcentaje =0
      
    });
  for (let nominado of this.nominadosFiltrados){
    for(let key in this.Votossumados){
      for(let key_key in this.Votossumados[key]){
     

        if(Number(key)===Number(id_categoria)){
          if(nominado.nombre_nominado===key_key){
          

            nominado.voto=this.Votossumados[key][key_key]
          }

        }
      }
    }
  }

  this.nominadosFiltrados.sort((a: any, b: any) =>Number(b.voto)  - Number(a.voto));

  let totalVotos =0
  this.nominadosFiltrados.forEach((datos:any)=>{
    totalVotos=totalVotos+datos.voto
  })




  for (let nominado of this.nominadosFiltrados){
    for(let key in this.Votossumados){
      for(let key_key in this.Votossumados[key]){
     

        if(Number(key)===Number(id_categoria)){
          if(nominado.nombre_nominado===key_key){
          
            let elVotoBase=this.Votossumados[key][key_key]
            let porcentajeVoto=(elVotoBase/totalVotos)*100

            nominado.porcentaje=porcentajeVoto.toFixed(2)
          }

        }
      }
    }
  }

    return this.nominadosFiltrados
    


  
  }


  sumarVotos() {
   
  
    // Reducimos agrupando por id_categoria
    const conteo = this.votaciones.reduce(
      (acumulador: { [key: string]: { [key: string]: number } }, votacion: { nombre_nominado: string; id_categoria: string }) => {
        const categoria = votacion.id_categoria;
        const nombre = votacion.nombre_nominado;
  
        // Inicializamos la categoría si no existe
        if (!acumulador[categoria]) {
          acumulador[categoria] = {};
        }
  
        // Sumamos los votos para el nominado en la categoría
        acumulador[categoria][nombre] = (acumulador[categoria][nombre] || 0) + 1;
        this.Votossumados=acumulador
        
        return acumulador;
      },
      {} // Valor inicial del acumulador
    );
    
   
  }
  

  
  

}
