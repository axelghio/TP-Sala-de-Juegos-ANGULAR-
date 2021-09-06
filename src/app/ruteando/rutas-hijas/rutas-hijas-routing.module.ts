import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegosComponent } from '../../componentes/juegos/juegos.component';
import { PptComponent } from '../../componentes/ppt/ppt.component';
import { TatetiComponent } from '../../componentes/tateti/tateti.component';
import { MemotestComponent } from '../../componentes/memotest/memotest.component';
import { OcupaComponent } from '../../componentes/ocupa/ocupa.component';

const routes: Routes = [
  {
    path: "",
    children: 
    [
      { path: "", component: JuegosComponent },
      { path: "Ppt", component: PptComponent },
      { path: "Memotest", component: MemotestComponent },
      { path: "MiJuego", component: OcupaComponent },
      { path: "Tateti", component: TatetiComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasHijasRoutingModule { }
