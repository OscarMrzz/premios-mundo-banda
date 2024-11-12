import { Component } from '@angular/core';
import {CategoriasService} from "../../service/categorias/categorias.service"
@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent {

  categorias:any =[]
  constructor(
    private categoriasService:CategoriasService
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

}
