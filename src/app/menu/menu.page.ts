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
  thisStallData = [];
  docid: string;

  constructor(
    private stallService: StallsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getStallData();

    let docid = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(docid);
  }

  async getStallData() {
    const stallRef = doc(this.db, "Stall", this.docid);
    console.log(stallRef)
    const stallData = await getDoc(stallRef);
    
    if (stallData.exists()) {
      // console.log("Document data:", stallData.data());

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async getStallMenu(){
  }

}
