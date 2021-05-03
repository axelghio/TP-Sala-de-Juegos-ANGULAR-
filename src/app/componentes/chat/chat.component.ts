import { Component, OnInit } from '@angular/core';
import { Msj } from '../../clases/msj';
import { FdbService } from '../../servicios/fdb.service';
import { AuthService } from "../../servicios/auth.service";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  listaMensajes
  mensaje: Msj;
  envMensj: string;
  email;

  constructor(
    private db: FdbService,
    private auth: AuthService) {
      this.mensaje = new Msj();
  }

  ngOnInit(): void {
    this.email = localStorage.getItem("usuario");
    this.db.getMensajes()
    .snapshotChanges()
    .subscribe((item) => {
      this.listaMensajes = [];
      item.forEach((element) => {
      let x = element.payload.toJSON();
      x["$key"] = element.key;
      this.listaMensajes.push(x as Msj);
    })
  });
  }

  getFecha(): string {
    var fecha = new Date();
    let d, m, y, h, min, s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();
    return d + "/" + m + "/" + y + "-" + h + ":" + min + ":" + s;
  }

  EnviarMensaje(envMsj: string){
    this.mensaje.correo = this.email;
    this.mensaje.fecha = this.getFecha();
    this.mensaje.mensaje = envMsj;
    this.envMensj = "";
    this.db.guardarMensajes(this.mensaje);
  }

}
