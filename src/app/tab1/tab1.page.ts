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
  stallData = [];
  stallId = [];
  stallDetails = [];

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
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // this.stallDetails.push(doc.data(), doc.id);
      // console.log(this.stallData)
      // this.stallId.push(doc.id);
      // console.log(this.stallId);
      this.stallData = [doc.id, doc.data()]
      console.log(this.stallData)
    })
  }






}
