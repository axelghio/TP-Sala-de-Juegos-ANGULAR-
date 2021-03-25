import { Component, OnInit } from '@angular/core';

//clase usuario
import { Usuario } from "../../clases/user";

//import Services
import { AuthService } from "../../servicios/auth.service";

//importo mi db services
import { FdbService } from '../../servicios/fdb.service';

@Component({
  selector: 'app-clasificaciones-globales',
  templateUrl: './clasificaciones-globales.component.html',
  styleUrls: ['./clasificaciones-globales.component.css']
})
export class ClasificacionesGlobalesComponent implements OnInit {

  listUser;
  listAux;
  usuario: Usuario;
  cont : number = 0;

  constructor(private myDatabase: FdbService, private auth: AuthService) {
    this.usuario = new Usuario();
    this.listUser = new Array();
    this.listAux = new Array();
    this.ObtenerUsuario();
  }

  ObtenerUsuario()
  {
    this.myDatabase.getIndividualUsers()
    .snapshotChanges()
    .subscribe((item)=>{
      item.forEach((element) => {
        let user = element.payload.toJSON();
        //this.usuario.correo = user['correo'];
        //this.usuario.gano = user['gano'];
        //this.usuario.perdio = user['perdio'];
        this.usuario.juego = user['juego'];
        this.listUser.push(user);
      })
      this.listAux = this.listUser.sort((a, b) => a.correo.localeCompare(b.correo));
    });
  }

  ngOnInit(): void {
  }

}