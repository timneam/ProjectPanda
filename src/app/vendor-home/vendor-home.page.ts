import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.page.html',
  styleUrls: ['./vendor-home.page.scss'],
})
export class VendorHomePage implements OnInit {

  db = getFirestore();
  menu = [];

  constructor(private stallService: StallsService) { }

  ngOnInit() {
    this.showMenu();
  }

  async showMenu(){
    // user id to get doc data
    const auth = getAuth();
    const user = auth.currentUser;
    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    console.log(vendorData.data().stallId);

    const stallDetails = await getDocs(collection(this.db, 'Stall', vendorData.data().stallId, 'Menu'));
    
    stallDetails.forEach((doc) => {
      console.log(doc.id);
      let menuData = doc.data();
      let menuItems = { "foodId" : doc.id, "foodName" : menuData.foodName, "foodPrice": menuData.foodPrice , "foodDetails": menuData.foodDetails , "foodEstTime": menuData.foodEstTime}
      this.menu.push(menuItems);
    })
    
  }

}
