import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import { getDocs } from '@angular/fire/firestore';
import { CartService } from '../services/cart.service';
import { getAuth } from 'firebase/auth';

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
    console.log(getMenuDetails.data());
    let data = getMenuDetails.data();
    let menuData = { "foodName": data.foodName, "foodDetails": data.foodDetails, "foodPrice": data.foodPrice, "foodEstTime": data.foodEstTime }
    this.menuDetails.push(menuData)
  }

  async thisMenuAddOns(){
    const querySnapshot = await getDocs(collection(this.db, 'Stall', this.stallRoute, 'Menu', this.menuRoute, 'Addon'))

    querySnapshot.forEach((doc) => {
      let data = doc.data()
      console.log(data);
      let menuVar = { "id": doc.id, "addOnTitle": data.title, "addOnPrice": data.price}
      this.menuAddOns.push(menuVar);  
    })
    console.log(this.menuAddOns)
  }

  item_qty = 1

  incrementQty() {
    this.item_qty += 1;
    console.log(this.item_qty + 1);
  }

  decrementQty() {
    if (this.item_qty - 1 < 1) {
      this.item_qty = 1;
      console.log('item_1->' + this.item_qty)
    }
    else {
      this.item_qty -= 1;
      console.log('item_2->' + this.item_qty);
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
      foodQty: this.item_qty
    }

    let stallData = {
      stallId: this.stallRoute
    }

    this.cartService.createCartForAStall(user.uid, this.stallRoute, stallData).then((res) => {
      console.log(res)
      this.cartService.addItemToCart(user.uid, this.stallRoute, this.menuRoute, menuData).then((res) => {
        this.selectedItemsList.forEach(element => {
          console.log(element)
          let data = { "addOnTitle": element.addOnTitle, "addOnPrice": element.addOnPrice }
          this.cartService.addItemAddonToCart(user.uid, this.stallRoute, this.menuRoute, element.id, data )
          console.log("Added to cart!")
          console.log(data)
        });
      })
    })
  }

  changeSelection() {
    this.selectedItemsList = this.menuAddOns.filter((value, index) => {
      if (value.isChecked) {
        console.log(value)
      }
      return value.isChecked
    });
  }

  allUserAddons() {
    
  }


}
