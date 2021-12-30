import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import { getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {

  db = getFirestore();
  menuDetails = [];

  menuAddOns = [];

  stallRoute:any;
  menuRoute: any;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private stallService: StallsService) { 
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
      let menuVar = { "addOnTitle": data.title, "addOnPrice": data.price}
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
}

function stallId(stallId: any, menuId: any) {
  throw new Error('Function not implemented.');
}

