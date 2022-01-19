import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.page.html',
  styleUrls: ['./vendor-home.page.scss'],
})
export class VendorHomePage implements OnInit {

  auth = getAuth();
  db = getFirestore();

  menu = [];

  stallId : any;

  soldOut = []
  gotStocks = []
selected_state: any;
state: string[] = ['Open','Last Order','Closed' ]

  constructor(private stallService: StallsService, private router: Router) {
    this.selected_state="Open"
   }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.showMenu()
      } else {
        console.log("User is signed out")
        this.router.navigateByUrl('splash');
      }
    });
  };

  async showMenu(){
    // user id to get doc data
    const user = this.auth.currentUser.uid;
    const vendorData = await getDoc(doc(this.db, 'User', user));
    console.log(vendorData.data().stallId);
    this.stallId = vendorData.data().stallId;

    const stallDetails = await getDocs(collection(this.db, 'Stall', vendorData.data().stallId, 'Menu'));
    
    stallDetails.forEach((doc) => {
      console.log(doc.id);
      let menuData = doc.data();
      let menuItems = { 
        "foodId" : doc.id, 
        "foodName" : menuData.foodName,
        "foodPrice": menuData.foodPrice, 
        "foodDetails": menuData.foodDetails, 
        "foodEstTime": menuData.foodEstTime,
        "foodQuantity": menuData.foodQuantity,
        "foodImg" : menuData.foodImg
      }
      this.menu.push(menuItems);
      if (menuItems.foodQuantity == 0) {
        this.soldOut.push(menuItems)
        console.log(this.soldOut) 
      } else {
        this.gotStocks.push(menuItems)
        console.log(this.gotStocks) 
      }
    })
  }

  toUpdateItem(foodId){
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/update-item/${foodId}`)
  }

  addMenuItem(){
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/add`)
  }

}
