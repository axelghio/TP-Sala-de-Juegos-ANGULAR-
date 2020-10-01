import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  ngOnInit() {

  }

  constructor(private auth: AuthService){
    this.Mostrar();
  }

  Mostrar()
  {
    this.auth.getCurrentUser().then((response: any) => {
      console.log("Usuario actualmente logeado: " + response.email);
    });
  }

}
