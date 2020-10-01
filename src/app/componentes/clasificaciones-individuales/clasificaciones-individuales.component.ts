import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

//clase usuario
import { Usuario } from "../../clases/user";

//import Services
import { AuthService } from "../../servicios/auth.service";

//importo mi db services
import { FdbService } from '../../servicios/fdb.service';

@Component({
  selector: 'app-clasificaciones-individuales',
  templateUrl: './clasificaciones-individuales.component.html',
  styleUrls: ['./clasificaciones-individuales.component.css']
})
export class ClasificacionesIndividualesComponent implements OnInit {
  
  listUser;
  
  usuarioActual;

  //usuarios
  user1: Usuario;
  user2: Usuario;
  user3: Usuario;
  user4: Usuario;
  user5: Usuario;
  user6: Usuario;
  user7: Usuario;


  //contadores de juegos
  cGanoAA = 0;
  cPerdioAA = 0;

  cGanoPPT = 0;
  cPerdioPPT = 0;
  
  cGanoAN = 0;
  cPerdioAN = 0;

  cGanoAEN = 0;
  cPerdioAEN = 0;
  
  cGanoTTT = 0;
  cPerdioTTT = 0;

  
  cGanoM = 0;
  cPerdioM = 0;

  
  cGanoO = 0;
  cPerdioO = 0;

  constructor(private myDatabase: FdbService, private auth: AuthService) {
    this.TraerUser();
    this.listUser = new Array();
    this.user1 = new Usuario();
    this.user2 = new Usuario();
    this.user3 = new Usuario();
    this.user4 = new Usuario();
    this.user5 = new Usuario();
    this.user6 = new Usuario();
    this.user7 = new Usuario();
    this.ObtenerUsuario();
  }

  ngOnInit(): void {
  }

  TraerUser()
  {
    this.auth.getCurrentUser().then((response: any) => {
      this.usuarioActual = response.email;
    });
  }

  ObtenerUsuario()
  {
    this.myDatabase.getIndividualUsers()
    .snapshotChanges()
    .subscribe((item)=>{
      item.forEach((element) => {
        let user = element.payload.toJSON();

        //this.user1.correo = user['correo'];
        //this.user1.juego = 'adivina el numero';
        if(this.usuarioActual == user['correo'])
        {
          if(user['gano'] == 1 && user['juego'] == 'adivina el numero'){
            this.cGanoAEN++;
          }
          if(user['perdio'] == 1 && user['juego'] == 'adivina el numero'){
            this.cPerdioAEN++;
          }
          if(user['gano'] == 1 && user['juego'] == 'agilidad aritmetica')
          {
            this.cGanoAA++;
          }
          if(user['perdio'] == 1 && user['juego'] == 'agilidad aritmetica')
          {
            this.cPerdioAA++;
          }
          if(user['gano'] == 1 && user['juego'] == 'ppt')
          {
            this.cGanoPPT++;
          }
          if(user['perdio'] == 1 && user['juego'] == 'ppt')
          {
            this.cPerdioPPT++;
          }
          if(user['gano'] == 1 && user['juego'] == 'anagrama')
          {
            this.cGanoAN++;
          }
          if(user['perdio'] == 1 && user['juego'] == 'anagrama')
          {
            this.cPerdioAN++;
          }
          if(user['gano'] == 1 && user['juego'] == 'tateti')
          {
            this.cGanoTTT++;
          }
          if(user['perdio'] == 1 && user[''] == 'tateti')
          {
            this.cPerdioTTT++;
          }
          if(user['gano'] == 1 && user[''] == 'memotest')
          {
            this.cGanoM++;
          }
          if(user['perdio'] == 1 && user[''] == 'memotest')
          {
            this.cPerdioM++;
          }
          if(user['gano'] == 1 && user[''] == 'okupa')
          {
            this.cGanoO++;
          }
          if(user['perdio'] == 1 && user[''] == 'okupa')
          {
            this.cPerdioO++;
          }
        }
      } )
      if(this.cGanoAEN > 0)
        {
          this.user1.juego = 'Adivina el numero';
          this.user1.correo = this.usuarioActual;
          this.user1.gano =  this.cGanoAEN;
          this.user1.perdio = this.cPerdioAEN;
          this.listUser.push(this.user1 as Usuario);
        }

        if(this.cGanoAA > 0)
        {
          this.user2.juego = 'Agilidad Aritmetica';
          this.user2.correo = this.usuarioActual;
          this.user2.gano =  this.cGanoAA;
          this.user2.perdio = this.cPerdioAA;
          this.listUser.push(this.user2 as Usuario);
        }
        if(this.cGanoPPT > 0)
        {
          this.user3.juego = 'Piedra Papel o Tijera';
          this.user3.correo = this.usuarioActual;
          this.user3.gano =  this.cGanoPPT;
          this.user3.perdio = this.cPerdioPPT;
          this.listUser.push(this.user3 as Usuario);
        }
        if(this.cGanoAN > 0)
        {
          this.user4.juego = 'Anagrama';
          this.user4.correo = this.usuarioActual;
          this.user4.gano =  this.cGanoAN;
          this.user4.perdio = this.cPerdioAN;
          this.listUser.push(this.user4 as Usuario);
        }
        if(this.cGanoTTT > 0)
        {
          this.user5.juego = 'TATETI';
          this.user5.correo = this.usuarioActual;
          this.user5.gano =  this.cGanoTTT;
          this.user5.perdio = this.cPerdioTTT;
          this.listUser.push(this.user5 as Usuario);
        }
        if(this.cGanoM > 0)
        {
          this.user6.juego = 'MEMOTEST';
          this.user6.correo = this.usuarioActual;
          this.user6.gano =  this.cGanoM;
          this.user6.perdio = this.cPerdioM;
          this.listUser.push(this.user6 as Usuario);
        }
        if(this.cGanoO > 0)
        {
          this.user7.juego = 'OKUPA';
          this.user7.correo = this.usuarioActual;
          this.user7.gano =  this.cGanoO;
          this.user7.perdio = this.cPerdioO;
          this.listUser.push(this.user7 as Usuario);
        }
    });
  }
}
