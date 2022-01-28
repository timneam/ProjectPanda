import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { UsersService } from '../services/users.service';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile-password-edit',
  templateUrl: './profile-password-edit.page.html',
  styleUrls: ['./profile-password-edit.page.scss'],
})
export class ProfilePasswordEditPage implements OnInit {

  db = getFirestore();
  updateUserPasswordForm: FormGroup
  userData = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService, private toastCtrl: ToastController,) { }

  ngOnInit() {
    this.updateUserPasswordForm = new FormGroup({
      password: new FormControl(),
      reEnterPassword: new FormControl(), })
  }

  updateUserPassword(){
    if(this.updateUserPasswordForm.value.password != this.updateUserPasswordForm.value.reEnterPassword){
      return  this.toastCtrl.create({
        message: 'Password fields do not match',
        duration: 2000,
        position: 'bottom'
      }).then(alert=> alert.present()); 
          }
          else if(this.updateUserPasswordForm.value.password.length < 6) {
            return  this.toastCtrl.create({
              message: 'Password needs to be at least 6 characters long',
              duration: 2000,
              position: 'bottom'
            }).then(alert=> alert.present()); 
            }
    this.userService.updateUserPassword(
      this.updateUserPasswordForm.value.password,
    )
  }

}
