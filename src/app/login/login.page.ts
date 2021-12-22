import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  db = getFirestore();
  formData: FormGroup;

  constructor(
    private UsersService: UsersService,
    private formBuilder: FormBuilder,
    private navController: NavController) {

  }
  ngOnInit() {
    this.getData()

    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

  }

  onLogin() {
    console.log(this.formData.value)
    this.UsersService.loginUser(this.formData.value.email, this.formData.value.password)
    this.navController.navigateForward('/tabs/stalls');
  }
  
  async getData() {
    const querySnapshot = await getDocs(collection(this.db, "User"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
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
