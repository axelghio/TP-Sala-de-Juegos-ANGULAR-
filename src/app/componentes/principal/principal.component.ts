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
      localStorage.setItem("usuario", response.email);
      console.log("Usuario actualmente logeado: " + localStorage.getItem("usuario"));
    });
    //this.VerificarUsuario();
  }

  Desconectar(){
    localStorage.removeItem("usuario");
  }
}
