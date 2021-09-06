import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//firebase
import { AuthService } from "../../servicios/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Usuario } from '../../clases/user';
import { FdbService } from '../..//servicios/fdb.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  correo: string;
  password: string;
  msjError = "";
  user: Usuario;
  id;

  constructor(private authService: AuthService, private angularfdb: AngularFireDatabase, private router: Router, private db: FdbService) { 
    this.user = new Usuario();
  }

  ngOnInit() {
  }

  Register()
  {
    this.authService.register(this.correo, this.password).then(response => {
      this.SetearJugador(this.correo);
      this.router.navigate(['/Principal']);
    },(error:any)=>{
      this.msjError = " " + error;
    });
  }

  SetearJugador(correo){
    this.user.correo = correo;
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
  }
}
