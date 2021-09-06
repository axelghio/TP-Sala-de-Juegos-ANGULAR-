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
  id:any;
  email:any;

  constructor(private db: FdbService, private auth: AuthService) {
    this.user = new Usuario();
    this.db.getIndividualUsers().snapshotChanges().subscribe((item)=>{
      item.forEach((element) => {
        let user = element.payload.toJSON();
        if(localStorage.getItem("usuario") === user["correo"])
        {
          this.id = element.key;
          this.user.correo = user["correo"];
          this.user.juego = "tateti";
          this.user.memotestGanados = user["memotestGanados"];
          this.user.memotestPerdidos = user["memotestPerdidos"];
          this.user.okupaGanados = user["okupaGanados"];
          this.user.okupaPerdidos = user["okupaPerdidos"];
          this.user.pptGanados = user["pptGanados"];
          this.user.pptPerdidos = user["pptPerdidos"];
          this.user.tatetiGanados = user["tatetiGanados"];
          this.user.tatetiPerdio = user["tatetiPerdidos"];
        }
      })
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
    this.user.pptGanados++;
    this.db.updateIndividualScore(this.id, this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensaje = "Perdiste!!!";
    this.user.pptPerdidos++;
    this.db.updateIndividualScore(this.id, this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.jugadaActiva = false;
    this.comenzar = false;
  }

  ngOnInit() {}
}