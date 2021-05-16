import { NgModule } from '@angular/core';
// importo del module principal
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { ClasificacionesIndividualesComponent } from '../componentes/clasificaciones-individuales/clasificaciones-individuales.component';
import { ChatComponent} from '../componentes/chat/chat.component';
import { EncuestaComponent } from '../componentes/encuesta/encuesta.component'; 

//import {  } from "../ruteando/ppt/ppt-routing.module"
// declaro donde quiero que se dirija
const MiRuteo = [
{path: '', component: LoginComponent},
{path: 'Login', component: LoginComponent},
{path: 'QuienSoy', component: QuienSoyComponent},
{path: 'Registro', component: RegistroComponent},
{path: 'Principal', component: PrincipalComponent},
{path: 'Chat', component: ChatComponent},
{path: "Juegos",
    loadChildren: ()=> import('../ruteando/rutas-hijas/rutas-hijas.module').then(m => m.RutasHijasModule)
    },
//clasificaciones
{path: 'clasificaciones', component: ClasificacionesIndividualesComponent},
{path: 'encuesta', component: EncuestaComponent},

//OTROS
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
