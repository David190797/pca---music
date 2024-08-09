import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_message={
    email:[
      {type:"required",message:"El email es obligatorio"},
      {type:"email",message:"Email inválido"}
    ],
    password:[
      {type:"required",message:"La contraseña es obligatorio"},
      //{ type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      //{ type: 'pattern', message: 'La contraseña debe tener al menos una letra mayúscula, un número y un símbolo' }
    ]
  }

  errorMessage:any;
  constructor(private formBuilder:FormBuilder, private authService:AuthenticateService, private navCtrl: NavController,private alertControler:AlertController, private storage:Storage) {
    this.loginForm=this.formBuilder.group({

      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),

      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ])
      ),
    });

    this.init();
  }

  async init() {
    await this.storage.create();
  }
    
  ngOnInit() {
    this.storage.remove("isUserLoggedIn");
  }

  loginUser(dataLogin: any){
    this.authService.loginUser(dataLogin).then(res=>{
      
      this.errorMessage="";
      this.storage.set("isUserLoggedIn",true)
      
      this.navCtrl.navigateForward("home")
    }).catch(err=>{
      this.errorMessage=err;
      this.presentAlert(this.errorMessage);
    });
  }

  async presentAlert(mss:string){
    const alert= await this.alertControler.create({
      header: 'Login',
      message:mss,
      buttons:['OK'],
    });

    await alert.present();
  }

  logoutUser() {
    this.storage.remove("isUserLoggedIn").then(() => {
      this.navCtrl.navigateBack("/login");
    });
  }



  registrarse(){
    this.navCtrl.navigateRoot("/register");
  }

}
