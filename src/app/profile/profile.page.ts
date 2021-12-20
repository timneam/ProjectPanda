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
    // get user id from local storage
    const userIDFromLocalStorage = localStorage.getItem('token')
    console.log(userIDFromLocalStorage);

    // search firebase and auth with the given uid
    const docRef = doc(this.db, "User", userIDFromLocalStorage)

    // get the data
    const ableToGetData = await getDoc(docRef)

    //Get data from the fire auth
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      console.log(displayName);
      console.log(email);
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      // const uid = user.uid;
    }
    
    //display the data
    if (ableToGetData.exists) {
      console.log(ableToGetData.data());
      return ableToGetData.data

      // need to create variable to display in html
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
