import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  db = getFirestore();
  formData: FormGroup;

  constructor(
    private LoadingController : LoadingController ,
    private UsersService: UsersService,
    private formBuilder: FormBuilder,
    private navController: NavController) {

  }
  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
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
    console.log('Loading dismissed!');
  }


  onLogin() {
    console.log(this.formData.value)
    this.UsersService.loginUser(this.formData.value.email, this.formData.value.password)
  }

  async addData() {
    const data = {
      firstName: "Alan",
      lastName: "Turing",
      phoneNumber: 696969697
    }

    const frankDocRef = doc(this.db, "User", "DeezNutz");

    // Manually set Doc ID

    await setDoc(frankDocRef, data);

    // Auto Generate Doc ID

    //   try {
    //     const docRef = await addDoc(collection(this.db, "User"), data);

    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
  }

  async updateData() {

    const frankDocRef = doc(this.db, "User", "DeezNutz");

    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      firstName: "Frank",
      lastName: { food: "Pizza", color: "Blue", subject: "recess" },
      phoneNumber: 12
    });
  }

  async deleteData() {
    const frankDocRef = doc(this.db, "User", "DeezNutz");
    await deleteDoc(frankDocRef);
  }
  
}
