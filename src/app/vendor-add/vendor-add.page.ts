import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { getFirestore } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StallsService } from '../services/stalls.service';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.page.html',
  styleUrls: ['./vendor-add.page.scss'],
})

export class VendorAddPage implements OnInit {

  db = getFirestore();
  // Test Data
  stallId: any;
  menuId: any;
  addonId: any;
  stallMenu = []
  addonData = []
  getAddonData = []

  photoURL: any;

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
    if (this.fileImg == undefined) {
      this.addMenuItem()
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${this.fileImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.fileImg);
      // make if statement if file size to big or if format is wrong
      uploadTask.on('state_changed',
        (snapshot) => {
          // progress bar
          // make global variable that updates then display it on HTML
          // console.log(snapshot)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
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
          getDownloadURL(uploadTask.snapshot.ref).then((res) => {
            // This is the file url for the image btw 
            // Go add this to the SRC on front-end
            // update doc image or add to doc
            console.log('File available at', res);
            this.photoURL = res
            this.addMenuItem()
          });
        }
      );
    }
  }

  addMenuItem() {
    const data = {
      foodName: this.addMenuForm.value.foodName,
      foodPrice: this.addMenuForm.value.foodPrice,
      foodDetails: this.addMenuForm.value.foodDescription,
      foodEstTime: this.addMenuForm.value.foodEstTime,
      foodQuantity: this.item_qty,
      foodImg: this.photoURL ? this.photoURL : "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
    }

    this.stallsService.addItem(this.stallId, data).then(res => {
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

  // ------------------------------------------------------------------------------------

  fileImg: any;
  progress: any;
  preview: any;

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
