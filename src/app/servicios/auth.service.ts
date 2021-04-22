import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth) { }

  register(email: string, password: string)
  {
    return new Promise<any>((resolve, rejected) => {
      this.authFire.createUserWithEmailAndPassword(email, password).then((response: any) => {
        resolve(response);
      }).catch(error => rejected(error))
    });
  }

  async login(email:string, password:string)
  {
    return new Promise((resolve, rejected)=>{
      this.authFire.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)  
      }).catch(err => rejected(err));
    });
  }

  getCurrentUser() {
    return this.authFire.currentUser;
  }

  getCurrentID(){
    return this.authFire.currentUser.then((response:any)=>{response.uid});
  }

  logOutCurrentUser() {
    this.authFire.signOut();
  }
}
