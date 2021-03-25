import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
 
 gano : boolean
 nuevoJuego: JuegoAdivina;
 Mensajes:string;
 contador:number;
 ocultarVerificar:boolean;

 user:Usuario;

 constructor(private db: FdbService, private auth: AuthService) {
   this.user = new Usuario;
   auth.getCurrentUser().then((response:any)=>{
    this.user.correo = response.email;
    //variables de puntos
    this.user.juego = "adivina el numero";
   });
   this.nuevoJuego = new JuegoAdivina();
   console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
   this.ocultarVerificar=false;
 }

 ngOnInit() {
 }

 generarnumero() {
   this.nuevoJuego.generarnumero();
   this.contador=0;
 }

 verificar()
 {
   this.contador++;
   this.ocultarVerificar=true;
   console.info("numero Secreto:",this.nuevoJuego.gano);  
   if (this.nuevoJuego.verificar()){
     this.enviarJuego.emit(this.nuevoJuego);
     this.MostarMensaje("Sos un Genio!!!",true);
     this.nuevoJuego.numeroSecreto=0;
   }
   else{
     let mensaje:string;
     switch (this.contador) {
       case 1:
         mensaje="No, intento fallido, animo";
         break;
         case 2:
         mensaje="No,Te estaras Acercando???";
         break;
         case 3:
         mensaje="No es, Yo crei que la tercera era la vencida.";
         break;
         case 4:
         mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
         break;
         case 5:
         mensaje=" intentos y nada.";
         break;
         case 6:
         mensaje="Afortunado en el amor";
         break;
       default:
           mensaje="Ya le erraste "+ this.contador+" veces";
         break;
     }
     this.MostarMensaje("#"+this.contador+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
   }
   console.info("numero Secreto:",this.nuevoJuego.gano);  
 }  

 MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
   this.Mensajes=mensaje;    
   var x = document.getElementById("snackbar");
   if(ganador)
     {
       this.gano = true;
       x.className = "show Ganador";
       //variables de puntos Sumo Puntos
       this.db.insertIndividualScore(this.user);
       //variables de puntos Sumo Puntos
       this.db.insertGlobalScore(this.user);
     }else{
       this.gano = false;
       x.className = "show Perdedor";
       //variables de puntos Sumo Puntos
       this.db.insertIndividualScore(this.user);
     }
   var modelo=this;
   setTimeout(function(){ 
     x.className = x.className.replace("show", "");
     modelo.ocultarVerificar=false;
    }, 3000);
   console.info("objeto",x); 
  }  
}