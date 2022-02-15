import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup } from '@angular/forms';
import { doc, deleteDoc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  updateData: FormGroup;

  userId : any;
  userInfo = []
  userData = []

  constructor(private UsersService: UsersService,
    public router: Router,
    public alertController: AlertController) {

  }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userInfo = users.providerData
        this.userId = users.uid;
        let ableToGetData = await getDoc(doc(this.db, "User", users.uid))
        this.userData.push(ableToGetData.data())
      } else {
        this.router.navigateByUrl('splash');
      }
    });
  };

  async deleteData() {
    // disable accout tbh, dont delete 
    // do update role or smt
    const frankDocRef = doc(this.db, "User", this.userInfo[0].uid);
    await deleteDoc(frankDocRef);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Log out',
      message: 'Are you sure you want to log out?',
      buttons: [{
        text: 'No',
        handler: () => {
          alert.dismiss()
        }
      },
      {
        text: 'Logout',
        handler: () => {
          this.UsersService.signoutUser();
          this.userInfo = []
          this.userData = []
          // this.router.navigateByUrl('/login-or-register');
        }
      },]
    });
    await alert.present();
  }

  async emailForward() {
    this.router.navigateByUrl[('/profile-email-edit')]
  }

  //-----------------------------------------------------------------------------------

  fileImg: any;
  progress: any;

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
              updateProfile(this.auth.currentUser, {
                photoURL: downloadURL
              })
              this.UsersService.addUserImgToDatabase(this.userId, downloadURL)
            });
          }
        );
      }
    };
    input.click();
  }


  doRefresh(event) {
    
    this.userInfo = []
    this.userData = []

    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }



}
