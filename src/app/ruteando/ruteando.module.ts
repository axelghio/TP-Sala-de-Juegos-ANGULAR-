import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { PptComponent } from '../componentes/ppt/ppt.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { TatetiComponent } from '../componentes/tateti/tateti.component';
import { MemotestComponent } from '../componentes/memotest/memotest.component';
import { OcupaComponent } from '../componentes/ocupa/ocupa.component';
import { ClasificacionesIndividualesComponent } from '../componentes/clasificaciones-individuales/clasificaciones-individuales.component';
import { ClasificacionesGlobalesComponent } from '../componentes/clasificaciones-globales/clasificaciones-globales.component';

// declaro donde quiero que se dirija
const MiRuteo = [
{path: '', component: LoginComponent},
{path: 'Login', component: LoginComponent},
{path: 'QuienSoy', component: QuienSoyComponent},
{path: 'Registro', component: RegistroComponent},
{path: 'Principal', component: PrincipalComponent},
{path: 'Juegos', component: JuegosComponent},

//clasificaciones
{path: 'ClaIndi', component: ClasificacionesIndividualesComponent},
{path: 'ClaGlo', component: ClasificacionesGlobalesComponent},

//JUEGOS
{path: 'Adivina', component: AdivinaElNumeroComponent},
{path: 'Agilidad', component: AgilidadAritmeticaComponent},
{path: 'Ppt', component: PptComponent},
{path: 'Anagrama', component: AnagramaComponent},
{path: 'Tateti', component: TatetiComponent},
{path: 'Memotest', component: MemotestComponent},
{path: 'Ocupa', component: OcupaComponent},

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
