import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import { timer } from 'rxjs';

//firebase
import { AuthService } from '../../servicios/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  ngOnInit() {
  }

  usuario = '';
  clave = '';
  logeando = true;
  mensajeErrorLogin = "";
  randomUser;

  constructor(private route: ActivatedRoute, private router: Router, private service: AuthService) {
      service.logOutCurrentUser();
  }

  Entrar() {
    if(this.usuario != '' && this.clave !='')
    {
      this.service.login(this.usuario, this.clave).then( res =>{
        this.router.navigate(['/Principal']);
      },(error:any)=>{
        this.mensajeErrorLogin = " " + error;
      });
    }
    else{
      this.mensajeErrorLogin = "No se ha ingresado una cuenta.";
    }
  }

  Registrarse(){
    this.router.navigate(['/Registro']);
  }

  UsuarioRapido(){
    this.randomUser = Math.round(Math.random() * (2 - 1));
    switch (this.randomUser) {
      case 0:
        this.usuario = "usuario@usuario.com";
        this.clave = "123456";
        break;
      case 1:
        this.usuario = "admin@admin.com";
        this.clave = "123456";
        break;
    }
  }
}
