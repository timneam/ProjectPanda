import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {

  db = getFirestore();
  menuDetails = [];

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
    console.log(this.stallRoute);
    console.log(this.menuRoute);
    this.thisMenuDetails();
  }

  async thisMenuDetails(){
    const getMenuDetails = await getDoc(doc(this.db, 'Stall', this.stallRoute, 'Menu', this.menuRoute))
    console.log(getMenuDetails.data());
    let data = getMenuDetails.data();
    let menuData = { "foodName": data.foodName, "foodDetails": data.foodDetails, "foodPrice": data.foodPrice, "foodEstTime": data.foodEstTime }
    this.menuDetails.push(menuData)

    console.log(this.menuDetails)
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

