import { Component } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, query, where, QuerySnapshot, } from 'firebase/firestore';


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
    private StallsService: StallsService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getStallData()
  }

  async getStallData() {
    const querySnapshot = await getDocs(collection(this.db, "Stall"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let stallData = { "id": doc.id, "stallName": data.stallName, "stallDetails": data.stallDetails }
      this.stall.push(stallData)
    })
    console.log(this.stall)
  }

}
