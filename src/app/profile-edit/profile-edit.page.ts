import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDoc, collection } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { NamePopUpPage } from '../name-pop-up/name-pop-up.page';
import { NavController, PopoverController, ToastController } from "@ionic/angular";
import { Router } from '@angular/router'

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
    private formBuilder: FormBuilder,
    public router: Router, 
    public popoverCtrl: PopoverController ) {

  }

  userData = null
  userData2 = null
  allUserData = [];

  ngOnInit() {
    this.getUserData();

    this.updateDataForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
    })
  }

  async getUserData() {
    
    //Get data from the fire auth
    const auth = getAuth();
    const user = auth.currentUser;
    // get the data
    const ableToGetData = await getDoc(doc(this.db, "User", user.uid))
    
    if (user !== null) {
      user.providerData.forEach((profile) => {
        this.userData = profile
      });
    }

    if (ableToGetData.exists) {
      this.userData2 = ableToGetData.data();
    }
    else {
    }

    this.updateDataForm.patchValue({
      firstName: this.userData2.firstName,
      lastName: this.userData2.lastName,
      phoneNumber: this.userData2.phoneNumber
    })
  }

  updateUserProfile(){
    this.UsersService.updateUserProfile(
      this.updateDataForm.value.firstName,
      this.updateDataForm.value.lastName,
      this.updateDataForm.value.phoneNumber
    )
  }

  async editName() {
    const popover = await this.popoverCtrl.create({
      component: NamePopUpPage
    });

    popover.present();
  }

}
