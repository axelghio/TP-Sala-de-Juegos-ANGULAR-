import { stringToFileBuffer } from '@angular-devkit/core/src/virtual-fs/host';
import { Component, OnInit } from '@angular/core';
import { BlockLike } from 'typescript';
import { Usuario } from '../../clases/user';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ocupa',
  templateUrl: './ocupa.component.html',
  styleUrls: ['./ocupa.component.css']
})
export class OcupaComponent implements OnInit {

  auxMazoPalo: string[] = ['corazones', 'diamantes', 'pika', 'trebol'];
  mazoPalo: string[] = [];
  mazoNumeros: number[] = [];
  tamanoMazo: number = 4;

  jugadaDelPlayer:string = '';
  jugadaDelNPC:string = '';

  puntajePlayer: number = 0;
  puntajeNPC: number = 0;
  auxPuntaje: number = 0;

  turnoPlayer: boolean = true;
  turnoNPC: Boolean = false;
  jugadaNumero: number = 0;

  npcCard1;
  npcCard2;
  npcCard3;
  cartaTablero1;
  cartaTablero2;
  cartaTablero3;
  cartaTablero4;
  playerCard1;
  playerCard2;
  playerCard3;

  cartaPalo: string = '';
  cartaNumero: number = Math.floor( Math.random() * (10) + 1);
  errorMSJ = '';
  
  user:Usuario;
  id:any;

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

  ngOnInit(): void {
    this.primeraMano();
  }

  CargoMazoNumeros()
  {
    for (let index = 0; index < this.tamanoMazo; index++) {
      this.mazoNumeros[index] = this.cartaNumero = Math.floor( Math.random() * (10) + 1);
    }
  }

  CargoMazoPalo()
  {
    this.mazoPalo = [];
    for (const palo of this.auxMazoPalo) {
      let random = Math.floor(Math.random() * (this.auxMazoPalo.length - 0) + 0);
      this.mazoPalo.push(this.auxMazoPalo[random]);
    }
  }

  //REPARTIMOS LA PRIMERA RONDA.
  primeraMano()
  {
    this.CargoMazoNumeros();
    this.npcCard1 = this.mazoNumeros[0];
    this.npcCard2 = this.mazoNumeros[1];
    this.npcCard3 = this.mazoNumeros[2];
    this.CargoMazoPalo();
    this.npcCard1 = this.npcCard1 + ' de ' + this.mazoPalo[0];
    this.npcCard2 = this.npcCard2 + ' de ' + this.mazoPalo[1];
    this.npcCard3 = this.npcCard3 + ' de ' + this.mazoPalo[2];

    this.CargoMazoNumeros();
    this.cartaTablero1 = this.mazoNumeros[0];
    this.cartaTablero2 = this.mazoNumeros[1];
    this.cartaTablero3 = this.mazoNumeros[2];
    this.cartaTablero4 = this.mazoNumeros[3];
    this.CargoMazoPalo();
    this.cartaTablero1 = this.cartaTablero1 + ' de ' + this.mazoPalo[0];
    this.cartaTablero2 = this.cartaTablero2 + ' de ' + this.mazoPalo[1];
    this.cartaTablero3 = this.cartaTablero3 + ' de ' + this.mazoPalo[2];
    this.cartaTablero4 = this.cartaTablero4 + ' de ' + this.mazoPalo[3];

    this.CargoMazoNumeros();
    this.playerCard1 = this.mazoNumeros[0];
    this.playerCard2 = this.mazoNumeros[1];
    this.playerCard3 = this.mazoNumeros[2];
    this.CargoMazoPalo();
    this.playerCard1 = this.playerCard1 + ' de ' + this.mazoPalo[0];
    this.playerCard2 = this.playerCard2 + ' de ' + this.mazoPalo[1];
    this.playerCard3 = this.playerCard3 + ' de ' + this.mazoPalo[2];
  }

  //MAZO DE CARTAS PRINCIPAL
  mazoPrincipal()
  {
    this.CargoMazoNumeros();
    this.cartaTablero1 = this.mazoNumeros[0];
    this.cartaTablero2 = this.mazoNumeros[1];
    this.cartaTablero3 = this.mazoNumeros[2];
    this.cartaTablero4 = this.mazoNumeros[3];
    this.CargoMazoPalo();
    this.cartaTablero1 = this.cartaTablero1 + ' de ' + this.mazoPalo[0];
    this.cartaTablero2 = this.cartaTablero2 + ' de ' + this.mazoPalo[1];
    this.cartaTablero3 = this.cartaTablero3 + ' de ' + this.mazoPalo[2];
    this.cartaTablero4 = this.cartaTablero4 + ' de ' + this.mazoPalo[3];
  }

  mazoNPC()
  {
    //Mesclo mazo NPC
    this.CargoMazoNumeros();
    this.npcCard1 = this.mazoNumeros[0];
    this.npcCard2 = this.mazoNumeros[1];
    this.npcCard3 = this.mazoNumeros[2];
    this.CargoMazoPalo();
    this.npcCard1 = this.npcCard1 + ' de ' + this.mazoPalo[0];
    this.npcCard2 = this.npcCard2 + ' de ' + this.mazoPalo[1];
    this.npcCard3 = this.npcCard3 + ' de ' + this.mazoPalo[2];
  }


  mazoPlayer()
  {
    //Mesclo mazo JUGADOR
    this.CargoMazoNumeros();
    this.playerCard1 = this.mazoNumeros[0];
    this.playerCard2 = this.mazoNumeros[1];
    this.playerCard3 = this.mazoNumeros[2];
    this.CargoMazoPalo();
    this.playerCard1 = this.playerCard1 + ' de ' + this.mazoPalo[0];
    this.playerCard2 = this.playerCard2 + ' de ' + this.mazoPalo[1];
    this.playerCard3 = this.playerCard3 + ' de ' + this.mazoPalo[2];
  }

  Puntaje(carta:string)
  {
    //#region Jugada player
    if(this.jugadaDelPlayer == carta)
    {
      console.log("3 puntos para el player");
      this.puntajePlayer += 3;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('1 ') && carta.includes('1 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('2 ') && carta.includes('2 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('3 ') && carta.includes('3 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    
    else if(this.jugadaDelPlayer.includes('4 ') && carta.includes('4 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('5 ') && carta.includes('5 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('6 ') && carta.includes('6 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('7 ') && carta.includes('7 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('8 ') && carta.includes('8 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('9 ') && carta.includes('9 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('10 ') && carta.includes('10 '))
    {
      console.log("2 puntos para el player");
      this.puntajePlayer +=2;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('corazones') && carta.includes('corazones'))
    {
      console.log("1 puntos para el player");
      this.puntajePlayer += 1;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('diamantes') && carta.includes('diamantes'))
    {
      console.log("1 puntos para el player");
      this.puntajePlayer += 1;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('pika') && carta.includes('pika'))
    {
      console.log("1 puntos para el player");
      this.puntajePlayer += 1;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    else if(this.jugadaDelPlayer.includes('trebol') && carta.includes('trebol'))
    {
      console.log("1 puntos para el player");
      this.puntajePlayer += 1;
      this.jugadaDelPlayer = '';
      this.mazoPrincipal();
      this.mazoPlayer();
    }
    //#endregion

    //#region Jugada NPC
    if(this.jugadaDelNPC == carta)
    {
      this.puntajeNPC += 3;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("3 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('1 ') && carta.includes('1 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('2 ') && carta.includes('2 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('3 ') && carta.includes('3 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    
    else if(this.jugadaDelNPC.includes('4 ') && carta.includes('4 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('5 ') && carta.includes('5 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('6 ') && carta.includes('6 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('7 ') && carta.includes('7 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('8 ') && carta.includes('8 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('9 ') && carta.includes('9 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('10 ') && carta.includes('10 '))
    {
      this.puntajeNPC +=2;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("2 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('corazones') && carta.includes('corazones'))
    {
      this.puntajeNPC += 1;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("1 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('diamantes') && carta.includes('diamantes'))
    {
      this.puntajeNPC += 1;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("1 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('pika') && carta.includes('pika'))
    {
      this.puntajeNPC += 1;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("1 puntos para el NPC");
    }
    else if(this.jugadaDelNPC.includes('trebol') && carta.includes('trebol'))
    {
      this.puntajeNPC += 1;
      this.jugadaDelNPC = '';
      this.mazoPrincipal();
      this.mazoPlayer();
      this.jugadaNumero = -1;
      console.log("1 puntos para el NPC");
    }
    //#endregion
    this.jugadaNumero++;
  }

  jugadaPlayer(jugada:string)
  {
    console.log("Juega el player");
    this.jugadaDelPlayer = jugada;
  }

  jugadaNPC()
  {
    this.auxPuntaje = this.puntajeNPC;
    if(this.jugadaNumero == 0)
    {
      this.jugadaDelNPC = this.npcCard1;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero1);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    if(this.jugadaNumero == 1)
    {
      this.jugadaDelNPC = this.npcCard1;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero2);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 2)
    {
      this.jugadaDelNPC = this.npcCard1;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero3);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 3)
    {
      this.jugadaDelNPC = this.npcCard1;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero4);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 4)
    {
      this.jugadaDelNPC = this.npcCard2;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero1);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 5)
    {
      this.jugadaDelNPC = this.npcCard2;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero2);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 6)
    {
      this.jugadaDelNPC = this.npcCard2;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero3);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else
    if(this.jugadaNumero == 7)
    {
      this.jugadaDelNPC = this.npcCard2;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero4);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 8)
    {
      this.jugadaDelNPC = this.npcCard3;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero1);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 9)
    {
      this.jugadaDelNPC = this.npcCard3;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero2);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 10)
    {
      this.jugadaDelNPC = this.npcCard3;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero3);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero == 11)
    {
      this.jugadaDelNPC = this.npcCard3;
      console.log("voy por la jugada: " + this.jugadaNumero);
      this.Puntaje(this.cartaTablero4);
      this.turnoNPC = false;
      this.turnoPlayer = true;
      console.log("turno del player.");
    }
    else if(this.jugadaNumero < 0)
    {
      console.log("turno del player.");
    }
  }

  manejadora(carta: string)
  {
    if(this.puntajeNPC >= 10)
    {
      console.log("El ganador es el NPC.");
      this.user.okupaPerdidos++;
      this.db.insertIndividualScore(this.user);

    }
    else if(this.puntajePlayer >= 10)
    {
      console.log("El ganador es el Player.");
      this.user.okupaGanados++;
      this.db.insertIndividualScore(this.user);
    }
    else{
      if(this.jugadaDelPlayer != '' && this.turnoPlayer)
      {
        this.Puntaje(carta);
        this.turnoNPC = true;
        this.turnoPlayer = false;
        console.log("turno del npc.");
        this.jugadaNumero = 0;
        this.jugadaNPC();
      }
      else{
        console.log("no es tu turno.");
        this.jugadaDelNPC = '';
        this.jugadaDelPlayer = '';
        this.errorMSJ = "Selecciona tu jugada primero.";
        setTimeout(() => {
          this.errorMSJ = '';
        }, 5000);
      }
    }
  }
}