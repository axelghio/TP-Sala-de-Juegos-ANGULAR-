import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {
  
  comenzar:boolean = false;
  puntaje:number = 0;
  mensaje:string = "";
  mensaje2:string = "";
  intentos:number = 3;
  cartaNumber: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  carta: number;
  cartaSig: number;
  constructor() { }

  ngOnInit(): void {
  }
  
  comenzarJuego(){
    this.comenzar = true;
    this.carta = this.cartaNumber[Math.floor(Math.random() * this.cartaNumber.length)];
    console.log("Mazo: " + this.carta);
  }

  sigCarta(carta, opcion){
    this.cartaSig = this.cartaNumber[Math.floor(Math.random() * this.cartaNumber.length)];

    //Vemos si es mayor o menor.
    //y sumamos o restamos puntos.
    if(this.cartaSig > carta){
      if(opcion == 'mayor'){
        this.puntaje = this.puntaje + 1;
      }
    }
    if(this.cartaSig < carta){
        if(opcion == 'menor'){
        this.puntaje = this.puntaje + 1;
      }
    }
    if(this.cartaSig > carta){
      if(opcion == 'menor'){
        this.intentos = this.intentos - 1;
      }
    }
    if(this.cartaSig < carta){
      if(opcion == 'mayor'){
        this.intentos = this.intentos - 1;
      }
    }
    if(this.intentos == 0){
      this.mensaje = "Perdiste, lo siento...";
      this.mensaje2 = "cantidad de puntos totales: " + this.puntaje;
    }

    //mandamos la carta que sigue.
    this.carta = this.cartaSig;
    console.log("NuevaCarta: " + this.carta);
  }

  mayorMenor(opcion){
    this.sigCarta(this.carta, opcion);
  } 

  reintentarJuego(){
    this.comenzar = false;
    this.mensaje = "";
    this.mensaje2 = "";
    this.puntaje = 0;
    this.intentos = 3;
  }
}
