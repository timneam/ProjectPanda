import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { doc, updateDoc, deleteDoc, getFirestore, getDocs, collection } from 'firebase/firestore'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  db = getFirestore();
  formData: FormGroup;

  constructor(private UsersService: UsersService) { 

    this.UsersService.getUserInformation().subscribe(res => {
      console.log(res);
    })

  }

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
    const querySnapshot = await getDocs(collection(this.db, "User"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  async deleteData() {
    const frankDocRef = doc(this.db, "User", "DeezNutz");
    await deleteDoc(frankDocRef);
  }

}
