import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router'
import { LoadingController , ToastController} from '@ionic/angular';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, updateProfile } from 'firebase/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  auth = getAuth();

  formData: FormGroup;
  photoURL: any;

  constructor(
    private LoadingController: LoadingController,
    private UsersService: UsersService,
    private formBuilder: FormBuilder,   private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {

    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      reEnterPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      role: new FormControl('User'),
    })
  }


  async presentLoading() {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async addProfilePicture() {
    if (this.fileImg == undefined) {
      this.router.navigateByUrl('/are-you-singtel-staff');
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${this.fileImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.fileImg);
      // make if statement if file size to big? or format is wrong
      uploadTask.on('state_changed',
        (snapshot) => {
          // do shit here for the "progress bar"
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
            updateProfile(this.auth.currentUser, {
              photoURL: res
            }).then(() => {
              console.log("Email Verification Sent!")
              this.router.navigateByUrl('/are-you-singtel-staff');
            });
          });
        }
      );
    }
  }

  onRegister() {

    console.log(this.formData.value)

    if( this.formData.value.firstName == null || this.formData.value.lastName == null||  this.formData.value.email == null || this.formData.value.password == null || this.formData.value.phoneNumber ==null ){
      this.InvalidToast();
      return console.log("All fields are required")
    }

    else if(this.formData.value.password != this.formData.value.reEnterPassword){
      return  this.toastCtrl.create({
        message: 'Password fields do not match',
        duration: 2000,
        position: 'bottom'
      }).then(alert=> alert.present()); 
          }
     
            else if(this.formData.value.password.length < 6) {
              return  this.toastCtrl.create({
                message: 'Password needs to be at least 6 characters long',
                duration: 2000,
                position: 'bottom'
              }).then(alert=> alert.present()); 
              }



    this.UsersService.registerUser(
      this.formData.value.firstName,
      this.formData.value.lastName,
      this.formData.value.email,
      this.formData.value.password,
      this.formData.value.reEnterPassword,
      this.formData.value.phoneNumber,
      this.formData.value.role)
      
    this.presentLoading()
    setTimeout(() => {
      this.addProfilePicture()
    }, 1500);

  }

  backk() {
    this.router.navigateByUrl('[/login-or-register]')
  }

  fileImg: any;
  progress: any;
  preview: any;

  onchange() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = (img) => {
      // you can use this method to get file and perform respective operations
      let file = Array.from(input.files);

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
  InvalidToast() {
    const toast= this.toastCtrl.create({
      message: 'All fields are required',
      duration: 2000,
      position: 'bottom'
    }).then(alert=> alert.present()); }
}
