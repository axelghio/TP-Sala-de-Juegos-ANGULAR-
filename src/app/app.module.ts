import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RuteandoModule } from './ruteando/ruteando.module';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AgmCoreModule } from '@agm/core';
import { SexoPipe } from './pipes/sexo.pipe';
import { ClasificacionesIndividualesComponent } from './componentes/clasificaciones-individuales/clasificaciones-individuales.component';

//Import Juegos
import { PptComponent } from './componentes/ppt/ppt.component';
import { TatetiComponent } from './componentes/tateti/tateti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { OcupaComponent } from './componentes/ocupa/ocupa.component';

//Import firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//servicios
import { AuthService } from "../app/servicios/auth.service";
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

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
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    JuegosComponent,
    RegistroComponent,
    QuienSoyComponent,
    SexoPipe,
    PptComponent,
    TatetiComponent,
    MemotestComponent,
    OcupaComponent,
    ClasificacionesIndividualesComponent,
    ChatComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RuteandoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    //firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
