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
    this.getData()
  }

  async getData() {
    // const querySnapshot = await getDocs(collection(this.db, "Stall"));
    // querySnapshot.forEach(async (doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    //  });

    const querySnapshot = await getDocs(collection(this.db, "Stall"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      this.stallName.push(data.stallName);
      this.stallDetails.push(data.stallDetails);
      this.stallId.push(doc.id);
    })
    for (let i = 0; i < this.stallName.length; i++) {
      let data = { "id": this.stallId[i], "stallName": this.stallName[i], "stallDetails": this.stallDetails[i] }
      this.stall.push(data)
    }
    console.log(this.stall)
  }

}
