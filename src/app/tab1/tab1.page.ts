import { Component } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, query, where, QuerySnapshot, } from 'firebase/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  db = getFirestore();
  stallName = []
  stallDetails = []
  stallId = []
  stall = []

  constructor(
    private LoadingController : LoadingController ,
    private StallsService: StallsService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getStallData()
    this.presentLoading()

  }


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


  async getStallData() {
    const querySnapshot = await getDocs(collection(this.db, "Stall"));
    querySnapshot.forEach((doc) => {
      let data = doc.data() //store stallname and stalldetails
      let stallData = { "id": doc.id, "stallName": data.stallName, "stallDetails": data.stallDetails }
      this.stall.push(stallData)
    })
    console.log(this.stall)
  }

}
