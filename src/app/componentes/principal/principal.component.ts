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
  id:any;
  usernow;

 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  ngOnInit() {
    this.router.navigate[('')];
  }

  constructor(private auth: AuthService, private router: Router){
    
    this.auth.getCurrentUser().then((response: any) => {
      localStorage.setItem("usuario", response.email);
      this.usernow = localStorage.getItem("usuario");
      console.log("Usuario actualmente logeado: " + localStorage.getItem("usuario"));
    }).catch((e)=>{
      this.router.navigate(['']);
    });
    
  }

  Desconectar(){
    localStorage.removeItem("usuario");
  }
}
