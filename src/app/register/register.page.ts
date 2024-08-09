import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
    ],
    last_name: [
      { type: 'required', message: 'El apellido es obligatorio' },
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Email inválido' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      { type: 'pattern', message: 'La contraseña debe contener al menos una letra mayúscula, un número y un símbolo' },
    ]
  };

  constructor(private FormBuilder:FormBuilder,private navCtrl:NavController, private storage:Storage,private authServise:AuthenticateService) { 
    this.registerForm=this.FormBuilder.group({
      email:new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),

      password:new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$')
        ])
      ),

      name:new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),

      last_name:new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      )
    });
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  ngOnInit() { }

  goToLogin(){
    this.navCtrl.navigateBack("/login")
  }

  register(registerData:any){
    console.log(registerData)
    //this.storage.set("user",registerData);
    this.authServise.registerUser(registerData).then(res=>{
      this.navCtrl.navigateBack("/login")
      
    })
  }

}
