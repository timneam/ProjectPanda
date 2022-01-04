import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile-email-edit',
  templateUrl: './profile-email-edit.page.html',
  styleUrls: ['./profile-email-edit.page.scss'],
})
export class ProfileEmailEditPage implements OnInit {

  db = getFirestore();
  updateUserEmailForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService) { }

  ngOnInit() {

    // this.getUserEmail();

    this.updateUserEmailForm = new FormGroup({
      email: new FormControl()
    })

  }

  // getUserEmail() {
  //   const auth = getAuth();
  //   const user = auth.currentUser
  //   console.log(user)
  //   let email = user.email;

  //   if (user !== null) {
  //     console.log(email)
  //     this.updateUserEmailForm.patchValue({
  //       email: email
  //     })
  //   }
  // }

  updateUserEmail(){
    this.userService.updateUserEmail(
      this.updateUserEmailForm.value.email,
    )
    // console.log(this.updateDataForm)
  }

}
