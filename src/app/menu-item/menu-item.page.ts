import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
   
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

      backClicked() {
        this._location.back();
      }
}
