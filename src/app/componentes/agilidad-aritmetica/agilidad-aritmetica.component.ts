import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

import {Subscription} from "rxjs";
import { timer } from 'rxjs';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();

  gano : boolean;
  resultadoIngresado : number;
  numeroUno : number = 0;
  numeroDos : number = 0;
  operador : string = '+';
  operadoradores : string[] = ["-", "+", "%", "*"];
  mensaje : string;

  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  user:Usuario;

  private subscription: Subscription;

  ngOnInit() {
  }
   constructor(private db: FdbService, private auth: AuthService) {
    this.user = new Usuario;
    auth.getCurrentUser().then((response:any)=>{
      this.user.correo = response.email;
      this.user.gano = 0;
      this.user.perdio = 0;
      this.user.juego = "agilidad aritmetica";
    });
    this.juegoEnPausa();
  }

  NuevoJuego() {
      this.generarCalculo();
      this.ocultarVerificar=false;
      this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=10;
      }
      }, 900);
  }

  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);

    if(this.realizarCalculo())
    {
      this.mostrarMensaje(true);
    }
    else
    {
      this.mostrarMensaje(false)
    }
  }  

  generarCalculo()
  {
    let i =  Math.floor(Math.random() * (this.operadoradores.length - 0) + 0);
    this.operador = this.operadoradores[i];
    this.numeroUno = Math.floor(Math.random() * (10 - 1) + 1);
    this.numeroDos = Math.floor(Math.random() * (10 - 1) + 1);
  } 

  realizarCalculo() : boolean
  {
    let retorno = false
    let resultado;

    switch(this.operador)
    {
      case "%":
        resultado = (this.numeroUno % this.numeroDos);
        if(resultado == this.resultadoIngresado)
        {
          retorno = true;
        }
        break;
      case "*":
        resultado = (this.numeroUno * this.numeroDos);
        if(resultado == this.resultadoIngresado)
        {
          retorno = true;
        }
        break;
      case "+":
        resultado = (this.numeroUno + this.numeroDos);
        if(resultado == this.resultadoIngresado)
        {
          retorno = true;
        }
        break;
      case "-":
        resultado = (this.numeroUno - this.numeroDos);
        if(resultado == this.resultadoIngresado)
        {
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  mostrarMensaje(gano : boolean)
  {
    if(gano)
    {
      this.gano = true;
      document.getElementById("mensajeAritmetica").style.background = "rgb(40, 216, 63)"
      this.mensaje = "¡ADIVINASTE EL NUMERO, SOS UN GENIO!";
      this.user.gano++;
      this.db.insertIndividualScore(this.user);
    }
    else
    {
      this.gano = false;
      document.getElementById("mensajeAritmetica").style.background = "rgb(204, 40, 40)"
      this.mensaje = "¡RESPUESTA INCORRECTA!";
    }
    this.fadeIn();
  }

  fadeIn()
  {
    setTimeout(() => {
      this.mensaje = '';
      this.reiniciarVariables();
      this.juegoEnPausa();
      this.user.perdio++;
      this.db.insertIndividualScore(this.user);
    },1500);
  }

  reiniciarVariables()
  {
    this.numeroUno = 0;
    this.numeroDos = 0;
    this.operador = "+";
    this.resultadoIngresado = null;
  }

  juegoEnPausa()
  {
    this.ocultarVerificar=true;
    this.Tiempo=10; 
  }
}