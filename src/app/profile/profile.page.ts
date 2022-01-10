import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup } from '@angular/forms';
import { doc, deleteDoc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  updateData: FormGroup;

  userInfo = []
  userData = []

  constructor(private UsersService: UsersService,
    public router: Router,
    public alertController: AlertController) {

  }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userInfo = users.providerData
        let ableToGetData = await getDoc(doc(this.db, "User", users.uid))
        this.userData.push(ableToGetData.data())
        console.log(this.userData)
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  async deleteData() {
    // disable accout tbh, dont delete 
    // do update role or smt
    const frankDocRef = doc(this.db, "User", this.userInfo[0].uid);
    await deleteDoc(frankDocRef);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Log out',
      message: 'Are you sure you want to log out?',
      buttons: [{
        text: 'No',
        handler: () => {
          alert.dismiss()
        }
      },
      {
        text: 'Logout',
        handler: () => {
          this.UsersService.signoutUser();
          this.userInfo = []
          this.userData = []
          // this.router.navigateByUrl('/login-or-register');
        }
      },]
    });
    await alert.present();
  }

  async emailForward() {
    this.router.navigateByUrl[('/profile-email-edit')]
  }
}
