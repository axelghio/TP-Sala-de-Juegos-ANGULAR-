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

  constructor(private db: FdbService, private auth: AuthService) {
    this.listUser = [];
    this.db.getIndividualUsers().snapshotChanges().subscribe((item)=>{
      item.forEach((element) => {
        let user = element.payload.toJSON();
        this.listUser.push(user);
      })
    });
  }

  ngOnInit(): void {
  }

}
