import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn:'root'
})

export class LoginGuard implements CanActivate{
  constructor(private router:Router, private storage:Storage){
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async canActivate() {
    const isUserLoggedIn= await this.storage.get('isUserLoggedIn');
    if(isUserLoggedIn){
      return true;
    }else{
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}