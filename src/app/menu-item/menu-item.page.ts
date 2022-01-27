import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import { getDocs } from '@angular/fire/firestore';
import { CartService } from '../services/cart.service';
import { getAuth } from 'firebase/auth';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {

  db = getFirestore();

  menuDetails = []
  menuAddOns = []

  userAddons = []

  stallRoute: any
  menuRoute: any

  item_qty = 1
  userAddonInput = []

  selectedItemsList = [];
  checkedIDs = [];

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private stallService: StallsService,
    private cartService: CartService) { 
      this.stallRoute = this.activatedRoute.snapshot.paramMap.get('stallId');
      this.menuRoute = this.activatedRoute.snapshot.paramMap.get('menuId');
    }

  ngOnInit() {
    this.thisMenuDetails();
    this.thisMenuAddOns();
  }

  async thisMenuDetails(){
    const getMenuDetails = await getDoc(doc(this.db, 'Stall', this.stallRoute, 'Menu', this.menuRoute))

    let data = getMenuDetails.data();
    let menuData = { 
      "foodName": data.foodName, 
      "foodDetails": data.foodDetails, 
      "foodPrice": data.foodPrice, 
      "foodEstTime": data.foodEstTime,
      "foodQuantity": data.foodQuantity,
      "foodImg": data.foodImg
     }
    this.menuDetails.push(menuData)
  }

  async thisMenuAddOns(){
    const querySnapshot = await getDocs(collection(this.db, 'Stall', this.stallRoute, 'Menu', this.menuRoute, 'Addon'))

    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let menuVar = { "id": doc.id, "addOnTitle": data.title, "addOnPrice": data.price}
      this.menuAddOns.push(menuVar);  
    })
  }

  incrementQty() {
    if (this.item_qty >= this.menuDetails[0].foodQuantity) {
    } else {
      this.item_qty += 1;
    }
  }

  decrementQty() {
    if (this.item_qty - 1 < 1) {
      this.item_qty = 1;
      console.log(this.item_qty)
    }
    else {
      this.item_qty -= 1;
      console.log(this.item_qty)
    }
  }

  backClicked() {
    this._location.back();
  }

  addToCart(){
    let auth = getAuth();
    let user = auth.currentUser;

    let menuData = {
      foodName: this.menuDetails[0].foodName,
      foodPrice: this.menuDetails[0].foodPrice,
      foodDescription: this.menuDetails[0].foodDetails,
      foodEstTime: this.menuDetails[0].foodEstTime,
      foodImg: this.menuDetails[0].foodImg,
      foodQty: this.item_qty,
      userComment: (<HTMLInputElement>document.getElementById("userComment")).value
    }

    let stallData = {
      stallId: this.stallRoute
    }

    this.cartService.createCartForAStall(user.uid, this.stallRoute, stallData).then((res) => {
      this.cartService.setItemToCart(user.uid, this.stallRoute, menuData).then((res) => {
        this._location.back();
        this.selectedItemsList.forEach(element => {
          let data = { 
          "addOnTitle": element.addOnTitle, 
          "addOnPrice": element.addOnPrice }
          this.cartService.setItemAddonToCart(user.uid, this.stallRoute, res.id, element.id, data )
        });
      })
    })
  }

  changeSelection() {
    this.selectedItemsList = this.menuAddOns.filter((value, index) => {
      if (value.isChecked) {
      }
      return value.isChecked
    });
  }


}
