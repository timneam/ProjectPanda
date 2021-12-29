import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { StallsService } from '../services/stalls.service';
import { error } from 'protractor';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.page.html',
  styleUrls: ['./vendor-add.page.scss'],
})

export class VendorAddPage implements OnInit {

  db = getFirestore();
  docid = "BreakfastStall"
  addonId = "ev2tlYTTE2sWQzeFG7RJ"
  stallMenu = []
  addonData = []

  addMenuForm: FormGroup;

  item_qty = 1

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private stallsService: StallsService) {

  }

  ngOnInit() {
    // Get Data from firebase
    this.getMenuItem();
    // Assign the Addon or what
    this.addMenuForm = new FormGroup({
      foodName: new FormControl(),
      foodPrice: new FormControl(),
      foodDescription: new FormControl()
    })
  }

  addMenuDetails() {
    this.stallsService.addItemToStall(
      this.addMenuForm.value.foodName,
      this.addMenuForm.value.foodPrice,
      this.addMenuForm.value.foodDescription,
    )
    console.log("test");
    console.log(this.addMenuForm.value);
  }

  // Use this function for Edit not Add 
  getMenuItem() {
    this.stallsService.getMenuItem(this.docid).then(res => {
      this.stallMenu.push(res)
      console.log(this.stallMenu)
    })

    this.stallsService.getMenuAddon(this.docid, this.addonId).then(res => {
      this.addonData.push(res[0])
      console.log(this.addonData)
    })
  }

  async addAddon() {
    const alert = await this.alertController.create({
      header: "Add Addon",
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "Title",
        },
        {
          name: "price",
          type: "number",
          placeholder: "Price",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            // Call Add Addon API in service
            console.log(data)
            this.addonData.push(data)
          },
        },
      ],
    });
    await alert.present();
  }
  
  async deleteAddon(index: number) {
    const alert = await this.alertController.create({
      header: "Are you sure?",
      subHeader: "This will remove the addon permanently ",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.addonData.splice(index, 1)
            console.log(this.addonData)
          },
        },
      ],
    });
    await alert.present();
  }

  backClicked() {
    this._location.back();
  }


  changeQty(increment) {
    if (increment == 1) {
      this.item_qty += 1;
      console.log(this.item_qty + 1);
    } else if (increment == 0) {
      if (this.item_qty - 1 < 1) {
        this.item_qty = 1;
        console.log('item_1->' + this.item_qty)
      }
      else {
        this.item_qty -= 1;
        console.log('item_2->' + this.item_qty);
      }

    }
  }

}
