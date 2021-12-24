import { Component, OnInit } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, query, where, getDoc, } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  db = getFirestore();
  stallData = []
  stallMenu = []

  docid = this.activatedRoute.snapshot.paramMap.get("id");

  constructor(
    private stallService: StallsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getStallData();
    this.getStallMenu();
  }

  async getStallData() {
    const stallData = await getDoc(doc(this.db, "Stall", this.docid));
    if (stallData.exists()) {
      this.stallData = [stallData.data()]
    } else {
      console.log("No such document!");
    }
  }

  async getStallMenu() {
    const querySnapshot = await getDocs(collection(this.db, "Stall", this.docid, "Menu"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let foodData = { "foodId": doc.id, "foodName": data.foodName, "foodDetails": data.foodDetails, "foodPrice": data.foodPrice, "foodEstTime": data.foodEstTime }
      this.stallMenu.push(foodData)
    })
    console.log(this.stallMenu)
  }

}
