import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDocs, collection } from 'firebase/firestore'; 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  db = getFirestore();
  formData: FormGroup;

  constructor(private UsersService: UsersService) { }

  ngOnInit() {
    this.getData()

    this.formData = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phoneNumeber: new FormControl(),
      password: new FormControl()
    })
  }

  async getData() {
    // get user id from local storage
    // search firebase with the given uid
    // display the data
    const userID = localStorage.getItem('token')
    console.log(userID);
    
    // const querySnapshot = await getDocs(collection(this.db, "User"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
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

}
