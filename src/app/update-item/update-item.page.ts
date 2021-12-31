import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { StallsService } from '../services/stalls.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  db = getFirestore();

  // Test Data
  stallId: any;
  menuId: any;
  stallMenu = []
  addonData = []
  getAddonData = []
  deleteAddonData = []

  updateMenuForm: FormGroup;

  foodQuantity = null

  constructor(private _location: Location, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private stallsService: StallsService) {

    this.menuId = this.activatedRoute.snapshot.paramMap.get('menuId')
    this.stallId = this.activatedRoute.snapshot.paramMap.get('stallId')
  }

  ngOnInit() {
    // Get Data from firebase
    this.getMenuItem();
    // Assign the Addon or what
    this.updateMenuForm = new FormGroup({
      foodName: new FormControl(),
      foodPrice: new FormControl(),
      foodDetails: new FormControl(),
      foodEstTime: new FormControl()
    })
  }

  // Use this function for Edit not Add 
  getMenuItem() {
    this.stallsService.getOneMenuDetails(this.stallId, this.menuId).then(res => {
      this.stallMenu.push(res.data())
      this.foodQuantity = res.data().foodQuantity
      console.log(this.stallMenu)
    })
    this.stallsService.getMenuAddon(this.stallId, this.menuId).then(res => {
      for (let i = 0; i < res.length; i++) {
        this.getAddonData.push(res[i])
      }
      console.log(this.getAddonData)
    })
  }

  updateMenu() {
    const data = {
      foodName: this.updateMenuForm.value.foodName ? this.updateMenuForm.value.foodName : this.stallMenu[0].foodName,
      foodPrice: this.updateMenuForm.value.foodPrice ? this.updateMenuForm.value.foodPrice : this.stallMenu[0].foodPrice,
      foodDetails: this.updateMenuForm.value.foodDetails ? this.updateMenuForm.value.foodDetails : this.stallMenu[0].foodDetails,
      foodQuantity: this.foodQuantity ? this.foodQuantity : this.stallMenu[0].foodQuantity,
      foodEstTime: this.updateMenuForm.value.foodEstTime ? this.updateMenuForm.value.foodEstTime : this.stallMenu[0].foodEstTime
    }
    this.stallsService.updateItem(
      this.stallId,
      this.menuId,
      data
    ).then(res => {
      console.log(res)
      if (res != undefined) {
        // Add addon
        for (let i = 0; i < this.addonData.length; i++) {
          this.stallsService.addMenuAddon(this.stallId, this.menuId, this.addonData[i])
        }
        // Delete addon
        for (let i = 0; i < this.deleteAddonData.length; i++) {
          this.stallsService.deleteMenuAddon(this.stallId, this.menuId, this.deleteAddonData[i])
        }
      }

    }).catch((error) => {
      console.error(error);
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
            console.log(data)
            this.addonData.push(data)
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAddonInArray(index: number) {
    console.log(index)
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

  async deleteAddonInDatabase(addonId) {
    console.log(addonId)
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
            // add id of Addons to remove
            this.deleteAddonData.push(addonId)
            console.log(this.deleteAddonData)
            // remove addon from array
            this.getAddonData.splice(addonId, 1)
            console.log(this.getAddonData)
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
      this.foodQuantity += 1;
      console.log(this.foodQuantity);
    } else if (increment == 0) {
      if (this.foodQuantity - 1 < 1) {
        this.foodQuantity = 1;
        console.log('item cannot be lower than : ' + this.foodQuantity)
      }
      else {
        this.foodQuantity -= 1;
        console.log('item left : ' + this.foodQuantity);
      }

    }
  }

}
