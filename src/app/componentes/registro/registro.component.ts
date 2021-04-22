import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//firebase
import { AuthService } from "../../servicios/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  correo: string;
  password: string;
  msjError = "";

  constructor(private authService: AuthService, private angularfdb: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }

  Register()
  {
    this.authService.register(this.correo, this.password).then(response => {

      this.authService.getCurrentUser().then((response: any) => {
        //this.angularfdb.list('usuariosIndividual').set(response.uid, { correo:this.correo, juego: '', gano: 0, perdio: 0, id: response.uid });
        this.router.navigate(['/Principal']);
      });
    
    },(error:any)=>{
      this.msjError = " " + error;
    });
  }
}
