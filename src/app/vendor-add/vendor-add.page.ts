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
      MySelect1:any=[];
moreIndex1:any=1;
doc_name:any=[];
doc_price:any=[]; 


selectNo1(val1){
    if(val1==1)
    {
     this.MySelect1.push(this.moreIndex1);
     this.moreIndex1++;
    }
    else{
      this.MySelect1.pop(this.moreIndex1);
      this.moreIndex1--;
    }    
  }
}
