import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { RuteandoModule } from './ruteando/ruteando.module';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { AgmCoreModule } from '@agm/core';
import { SexoPipe } from './pipes/sexo.pipe';
import { PptComponent } from './componentes/ppt/ppt.component';
import { TatetiComponent } from './componentes/tateti/tateti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { OcupaComponent } from './componentes/ocupa/ocupa.component';
import { ClasificacionesIndividualesComponent } from './componentes/clasificaciones-individuales/clasificaciones-individuales.component';
import { ClasificacionesGlobalesComponent } from './componentes/clasificaciones-globales/clasificaciones-globales.component';

//Import firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//servicios
import { AuthService } from "../app/servicios/auth.service";

const firebaseConfig = {
  apiKey: "AIzaSyDlW-3mHm-Z3peRyHSROVl6nmSrpZDRURo",
  authDomain: "sala-de-juegos-6f20b.firebaseapp.com",
  databaseURL: "https://sala-de-juegos-6f20b.firebaseio.com",
  projectId: "sala-de-juegos-6f20b",
  storageBucket: "sala-de-juegos-6f20b.appspot.com",
  messagingSenderId: "549977025079",
  appId: "1:549977025079:web:4c5a8d9a1d993f6fb16db2",
  measurementId: "G-W0JF3YLNHD"
};

@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    JuegosComponent,
    RegistroComponent,
    QuienSoyComponent,
    AnagramaComponent,
    SexoPipe,
    PptComponent,
    TatetiComponent,
    MemotestComponent,
    OcupaComponent,
    ClasificacionesIndividualesComponent,
    ClasificacionesGlobalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    //firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
