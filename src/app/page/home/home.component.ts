import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/service/categorias/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categorias:any=[]
  constructor(private categoriaservice:CategoriasService){}
  ngOnInit(): void {
    this.get()
  }



  get() {
    this.categoriaservice.get().subscribe(
      res => {
        this.categorias = res;
        console.log("conexion a la base de datos exitosa")
      },
      err => console.log(err)
    );
  }

}
 