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

  constructor(private stallService: StallsService, private router: Router) { }

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
      let menuItems = { "foodId" : doc.id, "foodName" : menuData.foodName, "foodPrice": menuData.foodPrice , "foodDetails": menuData.foodDetails , "foodEstTime": menuData.foodEstTime}
      this.menu.push(menuItems);
    })
  }

  toUpdateItem(foodId){
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/update-item/${foodId}`)
  }

  addMenuItem(){
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/add`)
  }

}
