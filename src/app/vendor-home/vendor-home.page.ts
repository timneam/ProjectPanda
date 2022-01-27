import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.page.html',
  styleUrls: ['./vendor-home.page.scss'],
})
export class VendorHomePage implements OnInit {

  auth = getAuth();
  db = getFirestore();

  open = false;

  menu = [];
  filtermenu = []

  filterstatus = "All"
  stallId: any;
  status: any;
  stallImg: any;
  stallName: any;
  soldOut = []
  gotStocks = []


  constructor(
    private stallService: StallsService,
    private router: Router,
    public modalController: ModalController) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.showMenu()
      } else {
        this.router.navigateByUrl('splash');
      }
    });
  };

  async showMenu() {
    // user id to get doc data
    const user = this.auth.currentUser.uid;
    const vendorData = await getDoc(doc(this.db, 'User', user));
    this.stallId = vendorData.data().stallId;

    const stallData = await getDoc(doc(this.db, 'Stall', vendorData.data().stallId));
    this.status = stallData.data().stallStatus
    this.stallName = stallData.data().stallName
    this.stallImg = stallData.data().stallImg
    const stallDetails = await getDocs(collection(this.db, 'Stall', vendorData.data().stallId, 'Menu'));

    stallDetails.forEach((doc) => {
      let menuData = doc.data();
      let menuItems = {
        "foodId": doc.id,
        "foodName": menuData.foodName,
        "foodPrice": menuData.foodPrice,
        "foodDetails": menuData.foodDetails,
        "foodEstTime": menuData.foodEstTime,
        "foodQuantity": menuData.foodQuantity,
        "foodImg": menuData.foodImg
      }
      this.menu.push(menuItems);
      this.filtermenu = this.menu
      if (menuItems.foodQuantity == 0) {
        this.soldOut.push(menuItems)
      } else {
        this.gotStocks.push(menuItems)
      }
    })
  }

  updateStallStatus = (value) => {
    this.stallService.updateStallStatus(this.stallId, value.detail.value).then(res => {
      this.open = false
      this.status = value.detail.value
    })
  }

  filter = (value) => {
    this.filtermenu = []

    if (value.detail.value == "All") {
      this.filterstatus = "All"
      this.filtermenu = this.menu
    } else if (value.detail.value == "Available") {
      this.filterstatus = "Available"
      this.filtermenu = this.gotStocks
    } else if (value.detail.value == "SoldOut") {
      this.filterstatus = "SoldOut"
      this.filtermenu = this.soldOut
    }

    this.open = false
  }

  toUpdateItem(foodId) {
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/update-item/${foodId}`)
  }

  addMenuItem() {
    this.router.navigateByUrl(`/vendor-tabs/${this.stallId}/add`)
  }

  click() {
    if (this.open == true) {
      this.open = false
      console.log(this.open)
    } else {
      this.open = true
      console.log(this.open)
    }
  }

  updateStallDetails() {
    this.router.navigateByUrl(`/vendor-edit-details/${this.stallId}`)
  }

  doRefresh(event) {

    this.open = false
    this.filterstatus = "All"
    this.menu = [];
    this.soldOut = []
    this.gotStocks = []

    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
