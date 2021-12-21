import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDocs, collection, where, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  db = getFirestore();
  formData: FormGroup;

  constructor(private UsersService: UsersService) {

    // this.UsersService.getUserInformation().subscribe(res => {
    //   console.log(res);
    // })

  }
  data = "lol"
  userData = null

  ngOnInit() {
    this.getData()

    this.formData = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phoneNumeber: new FormControl(),
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
      user.providerData.forEach((tomisnos) => {
        console.log("  Sign-in provider: " + tomisnos.providerId);
        console.log("  Provider-specific UID: " + tomisnos.uid);
        console.log("  Name: " + tomisnos.displayName);
        console.log("  Email: " + tomisnos.email);
        console.log("  Photo URL: " + tomisnos.photoURL);
        this.userData = tomisnos
      });
    }

    if (ableToGetData.exists) {
      console.log(ableToGetData.data());
      return ableToGetData.data
    }
    else {
      console.log("No Such Document!");
    }
  }

  async deleteData() {
    const frankDocRef = doc(this.db, "User", "DeezNutz");
    await deleteDoc(frankDocRef);
  }

}
