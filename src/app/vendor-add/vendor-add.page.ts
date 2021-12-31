import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { getFirestore } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.page.html',
  styleUrls: ['./vendor-add.page.scss'],
})

export class VendorAddPage implements OnInit {

  db = getFirestore();
  // Test Data
  stallId : any;
  menuId : any;
  addonId : any;
  stallMenu = []
  addonData = []
  getAddonData = []

  addMenuForm: FormGroup;

  item_qty = 1

  constructor(private _location: Location,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private stallsService: StallsService,
    private route: Router) {

      this.stallId = this.activatedRoute.snapshot.paramMap.get('stallId')

  }

  ngOnInit() {
    // Get Data from firebase
    // Assign the Addon or what
    this.addMenuForm = new FormGroup({
      foodName: new FormControl(),
      foodPrice: new FormControl(),
      foodDescription: new FormControl(),
      foodEstTime: new FormControl(),
    })
  }

  async addMenuDetails() {
    const data = {
      foodName: this.addMenuForm.value.foodName,
      foodPrice: this.addMenuForm.value.foodPrice,
      foodDetails: this.addMenuForm.value.foodDescription,
      foodEstTime: this.addMenuForm.value.foodEstTime,
      foodQuantity: this.item_qty,
    }
    this.stallsService.addItem(
      this.stallId,
      data
    ).then(res => {
      console.log("Menu add with Id :" + res.id)
      if (res.id != null && this.addonData != null) {
        for (let i = 0; i < this.addonData.length; i++) {
          this.stallsService.addMenuAddon(this.stallId, res.id, this.addonData[i]).then(res => {
            console.log("Addon added with Id :" + res.id)
          })
        }
      }
      this.route.navigateByUrl('/vendor-tabs/home');
    }).catch((error) => {
      console.error(error);
    });
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
      console.log(this.item_qty);
    } else if (increment == 0) {
      if (this.item_qty - 1 < 1) {
        this.item_qty = 1;
        console.log('item cannot be lower than : ' + this.item_qty)
      }
      else {
        this.item_qty -= 1;
        console.log('item left : ' + this.item_qty);
      }

    }
  }

}
