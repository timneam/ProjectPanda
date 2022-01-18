import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StallsService } from '../services/stalls.service';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


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

  imgURL: any;
  foodQuantity = null

  constructor(private _location: Location, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private stallsService: StallsService,
    private router: Router) {

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
      foodEstTime: new FormControl(),
      foodQuantity: new FormControl()
    })
  }

  // Use this function for Edit not Add 
  getMenuItem() {
    this.stallsService.getOneMenuDetails(this.stallId, this.menuId).then(res => {
      console.log(this.stallMenu)
      this.stallMenu.push(res.data())
      this.foodQuantity = res.data().foodQuantity
      this.updateMenuForm.patchValue({
        foodName: res.data().foodName,
        foodPrice: res.data().foodPrice,
        foodDetails:res.data().foodDetails,
        foodEstTime: res.data().foodEstTime,
     });
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
    if (this.fileImg == undefined) {
      this.updateMenuItem()
    } else {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${this.fileImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.fileImg);
     // make if statement if file size to big? or format is wrong
    uploadTask.on('state_changed',
       (snapshot) => {
         // do shit here for the "progress bar"
         // make global variable that updates then display it on HTML
         console.log(snapshot)
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         // go show this in HTML or smt for the progress tracking
         this.progress = progress
         switch (snapshot.state) {
           case 'paused':
             console.log('Upload is paused');
             break;
           case 'running':
             console.log('Upload is running');
             break;
         }
       },
       (error) => {
         // Handle unsuccessful uploads
         console.log(error)
       },
       () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           // This is the file url for the image btw 
           // Go add this to the SRC on front-end
           // update doc image or add to doc
           console.log('File available at', downloadURL);
           this.imgURL = downloadURL
           this.updateMenuItem()
         });
       }
     );
    }
  }

  updateMenuItem() {
    const data = {
      foodName: this.updateMenuForm.value.foodName ? this.updateMenuForm.value.foodName : this.stallMenu[0].foodName,
      foodPrice: this.updateMenuForm.value.foodPrice ? this.updateMenuForm.value.foodPrice : this.stallMenu[0].foodPrice,
      foodDetails: this.updateMenuForm.value.foodDetails ? this.updateMenuForm.value.foodDetails : this.stallMenu[0].foodDetails,
      foodQuantity: this.foodQuantity,
      foodEstTime: this.updateMenuForm.value.foodEstTime ? this.updateMenuForm.value.foodEstTime : this.stallMenu[0].foodEstTime,
      foodImg: this.imgURL ? this.imgURL : this.stallMenu[0].foodImg
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
      this.router.navigateByUrl('/vendor-tabs/home');
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

  async deleteAddonInDatabase(addonId, index) {
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
            this.getAddonData.splice(index, 1)
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
      this.foodQuantity ++;
      console.log(this.foodQuantity);
    } else if (increment == 0) {
      if (this.foodQuantity - 1 < 0) {
        this.foodQuantity = 0;
        console.log('This item is out of stock!')
      }
      else {
        this.foodQuantity -= 1;
        console.log('item left : ' + this.foodQuantity);
      }
    }
  }

  async alertChangeQuantity(){
    const alert = await this.alertController.create({
      header: "Input Quantity",
      inputs: [{
        name: 'Quantity',
        value: this.foodQuantity,
        type: 'number',
      }],
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
          handler: (res) => {
            console.log(res)
            // add id of Addons to remove
            this.foodQuantity = res.Quantity
          },
        },
      ],
    });
    await alert.present();
  }

  deleteItem(){
    this.stallsService.deleteItemFromMenu(this.stallId, this.menuId).then((res) => {
      console.log("Item removed from menu!")
      this.router.navigate(['/vendor-tabs/home'])
    })
  }

   // ------------------------------------------------------------------------------------

   fileImg: any;
   progress: any;
 
   onchange() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (img) => {
      // you can use this method to get file and perform respective operations
      let file = Array.from(input.files);
      console.log(file);

      this.fileImg = file[0]
      let reader = new FileReader();
      reader.onload = function () {
        let output: any = document.getElementById('previewImg');
        output.src = reader.result;
      }
      if (this.fileImg) {
        reader.readAsDataURL(this.fileImg);
      }
    };
    input.click();
  }

}
