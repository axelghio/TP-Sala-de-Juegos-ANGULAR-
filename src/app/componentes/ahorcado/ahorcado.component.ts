import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  mensaje = "";
  intentos:number = 6;
  comenzar:boolean = false;
  letrasPalabras;
  palabraSplit;
  palabras :string[] = [
    'pagina','programador', 'codigo', 'juegos', 'javascript', 'windows', 'linux', 'angular', 'ionic', 'typescript',
    'componente', 'ahorcado', 'encuesta', 'registro', 'login', 'error', 'pipes', 'rutas', 'servicios', 'directivas',
    'modulos', 'metodos', 'variables', 'propiedades', 'funciones', 'abstracto'
  ];
  letras:string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
  
  constructor() { }
  
  ngOnInit(): void {

  }

  comenzarJuego() {
    this.comenzar = true;
    this.palabraSplit = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasPalabras = this.palabraSplit.split('');
    console.log(this.letrasPalabras);
  }

  letraUser(letra){
  }

  letraSeleccionada(letra){
    if(this.intentos == 0){
      this.mensaje = "Lo lamento pero Perdiste.";
      setTimeout(() => this.reintentarJuego(), 3000);
    }

    if(!this.verificarLetra(letra)){
      this.intentos = this.intentos-1;
    }

    //console.log(this.verificarPalabraCompleta());
    if(this.verificarPalabraCompleta()){
      this.mensaje = "Felicidades GANASTE!!!";
      setTimeout(() => this.reintentarJuego(), 3000);
    }

  }

  verificarLetra(letra): boolean{
    let retorno = false;
    let contadorCorrectas = 0;
    for(let index = 0; index < this.letrasPalabras.length; index++) {
      if(this.letrasPalabras[index] == letra){
        document.getElementById(index.toString()).setAttribute('placeholder', letra.toUpperCase());
        contadorCorrectas++;
      }
    }
    if(contadorCorrectas > 0){
      retorno = true;
    }
    document.getElementById(letra).setAttribute('disabled', "true");
    return retorno;
  }

  verificarPalabraCompleta():boolean{
    let arrayCorrectas = [];
    let retorno = false;
    let letrasPalabrasBool = [];
    for(let index = 0; index < this.letrasPalabras.length; index++) {
      console.log("Letra en la posicion: " + index + "  es: " + document.getElementById(index.toString()).getAttribute('placeholder'));
      if(document.getElementById(index.toString()).getAttribute('placeholder') != ''){
        arrayCorrectas[index] = true;
      }
      else{
        arrayCorrectas[index] = false;
      }
    }

    for (let index = 0; index < this.letrasPalabras.length; index++) {
      letrasPalabrasBool[index] = true;
    }

    if(arrayCorrectas.every((val, index) => val === letrasPalabrasBool[index])){
      retorno = true;
    }

    return retorno;
  }

  reintentarJuego(){
    this.comenzar = false;
    this.letrasPalabras = null;
    this.intentos = 6;
    this.mensaje = "";
  }
}
