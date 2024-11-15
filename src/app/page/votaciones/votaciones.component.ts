import { Component } from '@angular/core';
import {CategoriasService} from "../../service/categorias/categorias.service"
import { Router} from '@angular/router';
import { RecopiladorService } from 'src/app/service/recopilador/recopilador.service';
@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent {

  categorias:any =[]

  constructor(
    private router: Router,
    private categoriasService:CategoriasService,
    private recopiladorservice:RecopiladorService
  ){}

  ngOnInit(): void {
 
    this.getCategorias()
  }


  getCategorias() {
    this.categoriasService.get().subscribe(
      res => {
        this.categorias = res;
        console.log("conexion a la base de datos exitosa")
      },
      err => console.log(err)
    );
  }

  capturar_categoria_seleccionada(indice:number){

    const categoriaSeleccionada =this.categorias[indice]
    this.recopiladorservice.agregar_datos_voto({id_categoria:categoriaSeleccionada["id_categoria"]})
   
    this.router.navigate(["/votaciones-final"])

  }


  }


