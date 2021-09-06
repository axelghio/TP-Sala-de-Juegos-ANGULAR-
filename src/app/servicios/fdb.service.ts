import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Usuario } from '../clases/user';
import { Msj } from '../clases/msj';

@Injectable({
  providedIn: 'root'
})
export class FdbService {
  mensajeUser: AngularFireList<any>;
  individualUserList: AngularFireList<any>;

  constructor(private afa: AngularFireAuth, private db: AngularFireDatabase) {
    this.individualUserList = this.db.list('usuariosIndividual');
   }
  
   getIndividualUsers(){
    return this.individualUserList;
  }

  getMensajes(){
    return this.mensajeUser = this.db.list("mensajeUser");
  }

  guardarMensajes(msj: Msj){
    this.mensajeUser.push({
      correo: msj.correo,
      mensaje: msj.mensaje,
      fecha: msj.fecha,
    });
  }

  insertIndividualScore(user: Usuario){
    this.individualUserList.push({
      correo: user.correo,
      juego: user.juego,
      memotestGanados: user.memotestGanados,
      memotestPerdidos: user.memotestPerdidos,
      okupaGanados: user.okupaGanados,
      okupaPerdidos: user.okupaPerdidos,
      pptGanados: user.pptGanados,
      pptPerdidos: user.pptPerdidos,
      tatetiGanados: user.tatetiGanados,
      tatetiPerdidos: user.tatetiPerdio
    });
  }
  
  updateIndividualScore(id:any, user: Usuario){
    this.individualUserList.update(id, {
      juego: user.juego,
      memotestGanados: user.memotestGanados,
      memotestPerdidos: user.memotestPerdidos,
      okupaGanados: user.okupaGanados,
      okupaPerdidos: user.okupaPerdidos,
      pptGanados: user.pptGanados,
      pptPerdidos: user.pptPerdidos,
      tatetiGanados: user.tatetiGanados,
      tatetiPerdidos: user.tatetiPerdio
    });
  }
}
