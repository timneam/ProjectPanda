import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { StallsService } from '../services/stalls.service';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

@Component({
  selector: 'app-vendor-edit-details',
  templateUrl: './vendor-edit-details.page.html',
  styleUrls: ['./vendor-edit-details.page.scss'],
})
export class VendorEditDetailsPage implements OnInit {

  imgURL: any;

  stallImg: any;
  stallId: any;
  allStallDetails = null;
  db = getFirestore();

  updateStallDetailsForm: FormGroup;

  constructor(private _location: Location,
    private activatedRoute: ActivatedRoute,
    private stallService: StallsService,
    private router: Router) {
    this.stallId = this.activatedRoute.snapshot.paramMap.get('stallId')
   }

  ngOnInit() {
    this.getStallDetails()

    this.updateStallDetailsForm = new FormGroup({
      stallName: new FormControl(),
      stallDetails: new FormControl()
    })
  }
  
  backClicked() {
    this._location.back();
  }

  async getStallDetails(){
    console.log(this.stallId)
    const stallDetails = await getDoc(doc(this.db, "Stall", this.stallId)).then((res) => {
      this.allStallDetails = res.data()
      this.stallImg = res.data().stallImg
      console.log(this.stallImg)
      console.log(this.allStallDetails)
    })

    this.updateStallDetailsForm.patchValue({
      stallName: this.allStallDetails.stallName,
      stallDetails: this.allStallDetails.stallDetails,
      stallImg: this.allStallDetails.stallImg
    })
  }

  updateStall() {
    if (this.fileImg == undefined) {
      this.updateStallDetails()
    } else {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${this.fileImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.fileImg);
     // make if statement if file size to big or if format is wrong
    uploadTask.on('state_changed',
       (snapshot) => {
         // progress bar
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
           this.updateStallDetails()
         });
       }
     );
    }
  }

  updateStallDetails(){
    const data = {
      stallName: this.updateStallDetailsForm.value.stallName ? this.updateStallDetailsForm.value.stallName : this.allStallDetails.stallName,
      stallDetails: this.updateStallDetailsForm.value.stallDetails ? this.updateStallDetailsForm.value.stallDetails : this.allStallDetails.stallDetails,
      stallImg: this.imgURL ? this.imgURL : this.allStallDetails.stallImg
    }
    this.stallService.updateStallDetails(this.stallId, data).then(() => {
      this.router.navigateByUrl('/vendor-tabs/home')
    })
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
