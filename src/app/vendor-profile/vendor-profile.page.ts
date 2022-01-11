import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDocs, collection, where, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.page.html',
  styleUrls: ['./vendor-profile.page.scss'],
})
export class VendorProfilePage implements OnInit {

  auth = getAuth();
  db = getFirestore();

  updateData: FormGroup;

  stallId: any;

  constructor(
    private UsersService: UsersService,
    public router: Router, 
    public alertController: AlertController,
    private stallService: StallsService
  ) { }

  userData = []
  userInfo = []

  userData2 = null
  vendorData = null

  allOfVendorData = []

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userInfo = users.providerData
        console.log(this.userInfo)
        let ableToGetData = await getDoc(doc(this.db, "User", users.uid))
        this.userData.push(ableToGetData.data())
        console.log(this.userData)
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  async getData() {
    const user = this.auth.currentUser;
    // console.log(user)
    // get the data
    const ableToGetData = await getDoc(doc(this.db, "User", user.uid))

    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    // console.log(vendorData.data().stallId);
    this.stallId = vendorData.data().stallId;

    this.vendorData = this.stallService.getAStallInformation(this.stallId)
    // console.log(vendorData.data())

    if (ableToGetData.exists) {
      this.userData2 = ableToGetData.data();
    }
    else {
      console.log("No Such Document!");
    }
  }

  async deleteData() {
    const user = this.auth.currentUser;
    const frankDocRef = doc(this.db, "User", user.uid);
    await deleteDoc(frankDocRef);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Log out',
     
      message: 'Are you sure you want to log out?',
      buttons: [ {
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
        }
      },]
    });
    await alert.present();
  }

  async emailForward() {
    this.router.navigateByUrl[('/profile-email-edit')]
  }

}
