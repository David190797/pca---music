import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage:Storage) { }

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      this.storage.get('users').then(users => {
        if (users) {
          const user = users.find((u: any) => 
            u.email === credentials.email && u.password === btoa(credentials.password)
          );
          if (user) {
            accept("Login Correcto");
          } else {
            reject("Correo y/o contraseña incorrecto");
          }
        } else {
          reject("Correo y/o contraseña incorrecto");
        }
      });
    });
  }

  registerUser(registerData:any){
    registerData.password= btoa(registerData.password)
    //return this.storage.set("user",registerData);
    return new Promise((resolve, reject) => {
      this.storage.get("users").then(users => {
        if (users) {
          users.push(registerData);
        } else {
          users = [registerData];
        }
        this.storage.set("users", users).then(() => {
          resolve("Usuario registrado con éxito");
        });
      });
    });
  }
}
