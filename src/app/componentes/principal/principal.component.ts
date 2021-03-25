import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';


import {Subscription} from "rxjs";
import { timer } from 'rxjs';

//firebase
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  user:Usuario;
  id:any;

 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  ngOnInit() {
  }

  constructor(private auth: AuthService, private db: FdbService){
    this.user = new Usuario();
    this.auth.getCurrentUser().then((response: any) => {
      console.log("Usuario actualmente logeado: " + response.email);
      this.user.correo = response.email;
    });
    this.SetearJugador();
    //this.VerificarUsuario();
  }

  SetearJugador(){
    this.auth.getCurrentUser().then((response: any) => {
      this.id = response.uid;
      this.user.correo = response.email;
      this.user.pptGanados = 0;
      this.user.pptPerdidos = 0;
      this.user.memotestGanados = 0;
      this.user.memotestPerdidos = 0;
      this.user.okupaGanados = 0;
      this.user.okupaPerdidos = 0;
      this.user.tatetiGanados = 0;
      this.user.tatetiPerdio = 0;
      this.user.juego = "";
      this.db.insertIndividualScore(this.user);
    });
  }
}
