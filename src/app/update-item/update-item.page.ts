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
  stallId : any;
  menuId : any;
  addonId : any;
  stallMenu = []
  addonData = []
  getAddonData = []

  updateMenuForm: FormGroup;

  item_qty = 0

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
      foodDescription: new FormControl()
    })
  }

  updateMenu() {
    this.stallsService.updateItem(
      this.stallId, 
      this.menuId, 
      this.updateMenuForm.value.foodName,
      this.updateMenuForm.value.foodPrice,
      this.updateMenuForm.value.foodDescription,
      this.item_qty
      ).then(res => {
        for (let i = 0; i < this.addonData.length; i++ ) {
          this.stallsService.addMenuAddon(this.stallId, this.menuId, this.addonData[i])
          .catch((error) => {
            console.error(error);
          })
        }
      }) 
      .catch((error) => {
        console.error(error);
      })

  }

  // Use this function for Edit not Add 
  getMenuItem() {
    this.stallsService.getOneMenuDetails(this.stallId, this.menuId).then(res => {
      this.stallMenu.push(res.data())
      console.log(this.stallMenu)
    })
    this.stallsService.getMenuAddon(this.stallId, this.menuId).then(res => {
      for (let i = 0; i < res.length; i++) {
        this.getAddonData.push(res[i])
      }
      console.log(this.getAddonData)
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

  async deleteAddonInDatabase(addonId){
    this.stallsService.deleteMenuAddon(this.stallId, this.menuId, addonId)
    console.log()
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
