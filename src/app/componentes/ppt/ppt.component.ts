import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  comenzar:boolean = false;
  jugadaActiva:boolean = false;
  mensaje:string;
  mostrarMensaje:boolean = false;
  jugadaElegida:string;
  jugadaCpu:string;
  piedra: boolean = false;
  papel: boolean = false;
  tijera: boolean = false;

  user:Usuario;

  constructor(private db: FdbService, private auth: AuthService) { 
    this.user = new Usuario;
    auth.getCurrentUser().then((response:any)=>{
      this.user.correo = response.email;
      this.user.gano = 0;
      this.user.perdio = 0;
      this.user.juego = "agilidad aritmetica";
    });
  }

  comenzarJuego() {
    this.comenzar = true;
  }

  jugar(jugada:string) {
    this.jugadaActiva = true;
    this.jugadaElegida = jugada;
    this.jugarCpu();
  }

  jugarCpu() {
    switch(Math.floor(Math.random() * 3 + 1)) {
      case 1:
        this.jugadaCpu = "piedra";
        break;
      case 2:
        this.jugadaCpu = "papel";
        break;
      case 3:
        this.jugadaCpu = "tijera";
        break;
    }
    this.verificarGanador();
  }

  verificarGanador() {
    if(this.jugadaElegida == this.jugadaCpu) {
      this.jugarCpu();
    } else {
      if(this.jugadaElegida == "piedra") {
        if(this.jugadaCpu == "papel") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      } else if (this.jugadaElegida == "papel") {
        if(this.jugadaCpu == "tijera") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      } else {
        if(this.jugadaCpu == "piedra") {
          this.jugadorPerdio();
        } else { 
          this.jugadorGano();
        }
      }
    }
  }

  jugadorGano() {
    this.mostrarMensaje = true;
    this.mensaje = "Ganaste!!!";
    this.user.gano++;
    this.db.insertIndividualScore(this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensaje = "Perdiste!!!";
    this.user.perdio++;
    this.db.insertIndividualScore(this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.jugadaActiva = false;
    this.comenzar = false;
  }

  ngOnInit() {}
}