import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VotacionesModel } from 'src/app/models/votaciones';

@Injectable({
  providedIn: 'root'
})
export class RecopiladorService {

  private VotoData: BehaviorSubject<VotacionesModel> =new BehaviorSubject<VotacionesModel>({id_voto:0,id_usuario:0,id_categoria:0,id_nominado:0})

  constructor() { }

  get obtener_datos_voto(){
    return this.VotoData.asObservable()
  }

  agregar_datos_voto(voto:VotacionesModel){
   const datos_voto_actual =this.VotoData.getValue()
    this.VotoData.next({...datos_voto_actual, ...voto})
  }
}
