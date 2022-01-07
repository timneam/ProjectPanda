import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDocs, collection, where, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.page.html',
  styleUrls: ['./vendor-profile.page.scss'],
})
export class VendorProfilePage implements OnInit {

  db = getFirestore();
  updateData: FormGroup;

  stallId: any;

  constructor(
    private UsersService: UsersService,
    public router: Router, 
    public alertController: AlertController,
    private stallService: StallsService
  ) { }

  userData = null
  userData2 = null
  vendorData = null

  ngOnInit() {
    this.getData()
  }

  async getData() {
    //Get data from the fire auth
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log(user)
    // get the data
    const ableToGetData = await getDoc(doc(this.db, "User", user.uid))
    
    if (user !== null) {
      user.providerData.forEach((profile) => {
        // console.log("  Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Name: " + profile.displayName);
        // console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
        this.userData = profile
      });
    }

    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    console.log(vendorData.data().stallId);
    this.stallId = vendorData.data().stallId;

    this.vendorData = this.stallService.getAStallInformation(this.stallId)
    console.log(vendorData.data())

    if (ableToGetData.exists) {
      // console.log(ableToGetData.data());
      this.userData2 = ableToGetData.data();
    }
    else {
      console.log("No Such Document!");
    }
  }

  async deleteData() {
    const frankDocRef = doc(this.db, "User", "DeezNutz");
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
