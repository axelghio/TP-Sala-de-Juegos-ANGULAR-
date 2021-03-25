import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  usuariosGeneral
  palabraIngresada : string = "";
  palabraAdivinar: string;
  palabras:string[] = ['juegos','sala','cincuenta','renderizado','salario','jueces','asado','astuto','soldado','manteca','ropero',
  'centavo','cristal','sandia','mermelada','banana','matematica','genio','padrino', 'barco','pelota', ,'numero','rey','correr','repetir','escuela',
  'helado','roca','pepita','manta','estar', 'hermoso', 'cambio', 'realidad', 'comenzar', 'teclado', 'manzana'];
  comenzado : boolean = false;

  gano : boolean;
  usuariosAnagrama;
  usuarioLogueado;
  palabraDelAnagrama : string = 'Click para comenzar.';
  mensajeAlUser : string = '';
  
  user:Usuario;

  constructor(private db: FdbService, private auth: AuthService) { 
    this.user = new Usuario;
    auth.getCurrentUser().then((response:any)=>{
      this.user.correo = response.email;
      //variables de puntos Sumo Puntos
      this.user.juego = "agilidad aritmetica";
    });
  }

  ngOnInit() {
  }

  ComenzarJuego()
  {
    this.comenzado = true;
    let random = Math.floor(Math.random() * (this.palabras.length - 0) + 0);
    this.palabraAdivinar = this.palabras[random];
    this.DesordenarPalabra()
  }

  DesordenarPalabra()
  {
    let palabra = this.palabraAdivinar;
    let resultado = "";
    let zz,azar;

    for (zz=palabra.length ;zz>=1;zz--){
        azar = (Math.random()* zz + 1) ;
        resultado = resultado + palabra.substring(azar-1,azar);
        palabra =  palabra.substring(0,azar-1)+palabra.substring(azar,zz);
    }
    this.palabraDelAnagrama = resultado;
  }

  VerificarPalabra()
  {
     if(this.palabraIngresada.toLocaleLowerCase() == this.palabraAdivinar)
     {
        this.MostrarMensaje(true, "GANASTE!!!!");
        this.gano = true;
     }
     else
     {
        this.MostrarMensaje(false, "PERDISTE!!! la palabra era: " +this.palabraAdivinar);
        this.gano = false;
     }
  }

  MostrarMensaje(gano : boolean, mensaje : string)
  {
    let elemento = document.getElementById("mensajeAnagrama");
    if(gano)
    {
      elemento.style.color = "rgb(39, 185, 26)";
      this.mensajeAlUser = mensaje;
      //variables de puntos Sumo Puntos
      this.db.insertIndividualScore(this.user);
    }
    else
    {
      elemento.style.color = "rgb(197, 30, 30)";
      this.mensajeAlUser = mensaje;
      //variables de puntos Sumo Puntos
      this.db.insertIndividualScore(this.user);
    }
    setTimeout(() => {
      this.ReiniciarJuego();
    },2000);
  }

  ReiniciarJuego()
  {
    this.palabraDelAnagrama = 'Click para comenzar.';
    this.mensajeAlUser = '';
    this.comenzado = false;
    this.palabraAdivinar = "";
    this.palabraIngresada = "";
  }
}