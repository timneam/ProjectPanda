import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.page.html',
  styleUrls: ['./vendor-add.page.scss'],
})
export class VendorAddPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
  }
  item_qty = 1

  incrementQty(){
    this.item_qty += 1;
    console.log(this.item_qty + 1);
    }

    decrementQty(){
      if(this.item_qty-1 < 1){
        this.item_qty = 1;
        console.log('item_1->' + this.item_qty)
      }
      else{
        this.item_qty -= 1;
        console.log('item_2->' + this.item_qty);
      }
      }
}
