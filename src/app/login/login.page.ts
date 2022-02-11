import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { deleteDoc, doc, getFirestore, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
import { AppLauncher } from '@capacitor/app-launcher';
import { time } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  db = getFirestore();
  formData: FormGroup;

  constructor(
    private LoadingController: LoadingController,
    private UsersService: UsersService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private toastCtrl: ToastController,) {

  }
  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

  }

  async presentLoading() {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  onLogin() {
    this.UsersService.loginUser(this.formData.value.email, this.formData.value.password)
  }


  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let date = new Date().toLocaleDateString()
    let formatdate = date.replace(/\//g, "-")
    
    document.getElementById("demo").innerHTML = "BFS" + "-" + formatdate + "-" + result
    return result;
  }


}
