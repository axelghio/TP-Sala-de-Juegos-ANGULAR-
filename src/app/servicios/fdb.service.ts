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
    return this.individualUserList;
  }

  insertIndividualScore(user: Usuario){
    this.individualUserList.push({
      correo: user.correo,
      juego: user.juego,
      gano: user.gano,
      perdio: user.perdio
    });
  }
  
  insertGlobalScore(user: Usuario){
    this.individualUserList.push({
      correo: user.correo,
      juego: user.juego,
      puntaje: user.puntos
    });
  }
}
