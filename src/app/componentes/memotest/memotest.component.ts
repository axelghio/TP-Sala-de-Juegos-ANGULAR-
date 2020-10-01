import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  comenzar:boolean = false;
  cuadrados = ["0","0","1","1","2","2","3","3","4","4","5","5"];
  mensaje:string;
  mostrarMensaje:boolean = false;
  mostrar:boolean[] = new Array(12);
  tarjetaA = null;
  tarjetaB = null;
  indexA:number;
  indexB:number;
  intentos:number;
  
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
    //this.inicializarMostrar(); 
    this.cuadrados.sort(function (a, b) { return 0.5 - Math.random()});
    this.intentos = 15;
   this.ocultar();
  }

  inicializarMostrar() {
    for(let i = 0; i < 12; i++) {
      this.mostrar[i] = true;
    }
  }

  jugar(casillero:number) {
    if(!this.mostrar[casillero]) {
      this.mostrar[casillero] = true;
      setTimeout(() => {
        if(this.tarjetaA == null) {
          this.tarjetaA = this.cuadrados[casillero];
          this.indexA = casillero;
        } else {
          this.tarjetaB = this.cuadrados[casillero];
          this.indexB = casillero;
          if(this.tarjetaA == this.tarjetaB) {
            this.verficiarGanador();
          } else {
            this.intentos--;
            if(this.intentos < 0) {
              this.jugadorPerdio();
            } else {
              this.mostrar[this.indexA] = false;
              this.mostrar[this.indexB] = false;
            }
           
          }
          this.tarjetaA = null;
          this.tarjetaB = null;
        }
      }, 500);
    }
  }

  ocultar() {
    for(let i = 0; i < 12; i++) {
      this.mostrar[i] = false;
    }
  }

  verficiarGanador() {
    let contador:number = 0;
    for(let i = 0; i < 12; i++) {
      if(this.mostrar[i]) {
        contador++;
      }
    }
    if(contador == 12) {
      this.jugadorGano();
    }
  }

  jugadorGano() {
    this.mostrarMensaje = true;
    this.mensaje = "GANASTE!";
    this.user.gano++;
    this.db.insertIndividualScore(this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensaje = "PERDISTE";
    this.user.perdio++;
    this.db.insertIndividualScore(this.user);
    setTimeout(() => this.reiniciar(), 4000);
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.comenzar = false;
    this.inicializarMostrar(); 
  }


  
  ngOnInit(): void {
  }
  
  
  

}