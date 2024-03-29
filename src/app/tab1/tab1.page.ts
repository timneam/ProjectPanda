import { Component } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder } from '@angular/forms';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { LoadingController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  auth = getAuth();
  db = getFirestore();

  userData = [];

  stallName = []
  stallDetails = []
  stallId = []
  stall = []

  constructor(
    private LoadingController: LoadingController,
    private StallsService: StallsService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.getStallData()
        this.presentLoading()
        this.getUserData()
        console.log(this.auth.currentUser)
      } else {
        console.log("User is signed out")
        this.router.navigateByUrl('splash');
      }
    });
  };

  async presentLoading() {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async getUserData() {
    const user = this.auth.currentUser
    console.log(user)

    const photoURL = user.photoURL;

    const userdata = await getDoc(doc(this.db, "User", user.uid)).then((res) => {
      console.log(res.data())
      let data = {
        'uid': user.uid,
        'firstName': res.data().firstName,
        'lastName': res.data().lastName,
        'photoURL': photoURL,
      }
      this.userData.push(data)
      console.log(this.userData)
    })
    return userdata

  }

  async getStallData() {
    const querySnapshot = await getDocs(collection(this.db, "Stall"));
    querySnapshot.forEach((doc) => {
      let data = doc.data() //store stallname and stalldetails
      let stallData = { 
        "id": doc.id, 
        "stallName": data.stallName, 
        "stallDetails": data.stallDetails,
        "stallImg": data.stallImg
       }
      this.stall.push(stallData)
    })
    console.log(this.stall)
  }

}
