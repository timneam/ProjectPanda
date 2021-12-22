import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDoc, collection } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { NamePopUpPage } from '../name-pop-up/name-pop-up.page';
import {NavController, PopoverController,ToastController} from "@ionic/angular";
import {Router} from '@angular/router'
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  db = getFirestore();
  updateDataForm: FormGroup;

  constructor(
    private UsersService: UsersService,
    private formBuilder: FormBuilder ,
    public router: Router, public popoverCtrl: PopoverController ) {

  }

  userData = null
  userData2 = null

  ngOnInit() {
    this.getData()

    this.updateDataForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      password: new FormControl()
    })
  }

  async getData() {
    
    //Get data from the fire auth
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    // get the data
    const ableToGetData = await getDoc(doc(this.db, "User", user.uid))
    
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log("  Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        this.userData = profile
      });
    }

    if (ableToGetData.exists) {
      console.log(ableToGetData.data());
      this.userData2 = ableToGetData.data();
    }
    else {
      console.log("No Such Document!");
    }
  }

  updateUserProfile(){
    this.UsersService.updateUserProfile(
      this.updateDataForm.value.firstName,
      this.updateDataForm.value.lastName,
      this.updateDataForm.value.email,
      this.updateDataForm.value.password,
      this.updateDataForm.value.phoneNumber
    )
    console.log(this.updateDataForm)
  }

  async editName() {
    const popover = await this.popoverCtrl.create({
      component: NamePopUpPage
    });

    popover.present();
  }

}
