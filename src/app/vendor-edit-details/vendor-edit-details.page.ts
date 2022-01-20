import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-vendor-edit-details',
  templateUrl: './vendor-edit-details.page.html',
  styleUrls: ['./vendor-edit-details.page.scss'],
})
export class VendorEditDetailsPage implements OnInit {

  constructor(private _location: Location,) { }

  ngOnInit() {
  }
  
  backClicked() {
    this._location.back();
  }
}
