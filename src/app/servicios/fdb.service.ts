import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Usuario } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class FdbService {

  individualUserList: AngularFireList<any>;
  globalUserList: AngularFireList<any>;

  constructor(private afa: AngularFireAuth, private db: AngularFireDatabase) {
    this.individualUserList = this.db.list('usuariosIndividual');
    this.globalUserList = this.db.list('usuariosGlobal');
   }
  
   getIndividualUsers(){
    return this.individualUserList;
  }
  getGloballUsers(){
    return this.globalUserList;
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

  
  insertGlobalScore(user: Usuario){
    this.globalUserList.push({
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

  updateGlobalScore(id:any, user: Usuario){
    this.globalUserList.update(id, {
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
