import { Component, OnInit } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, query, where, getDoc, } from 'firebase/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  db = getFirestore();
  thisStallData = [];

  constructor(private stallService: StallsService) { }

  ngOnInit() {
    this.getStallData()
  }

  async getStallData() {
    const stallRef = doc(this.db, "Stall", "BreakfastStall");
    const stallData = await getDoc(stallRef);
    
    if (stallData.exists()) {
      console.log("Document data:", stallData.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async getStallMenu(){
  }

}
