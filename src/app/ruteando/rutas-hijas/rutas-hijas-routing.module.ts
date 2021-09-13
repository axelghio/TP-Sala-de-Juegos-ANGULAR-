import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegosComponent } from '../../componentes/juegos/juegos.component';
import { OcupaComponent } from '../../componentes/ocupa/ocupa.component';
import { AhorcadoComponent } from '../../componentes/ahorcado/ahorcado.component';
import { MayormenorComponent } from '../../componentes/mayormenor/mayormenor.component';

const routes: Routes = [
  {
    path: "",
    children: 
    [
      //{ path: "Ppt", component: PptComponent },
      { path: "", component: JuegosComponent },
      { path: "Ahorcado", component: AhorcadoComponent},
      { path: "MayorMenor", component: MayormenorComponent },
      { path: "MiJuego", component: OcupaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasHijasRoutingModule { }