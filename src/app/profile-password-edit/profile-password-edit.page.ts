import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile-password-edit',
  templateUrl: './profile-password-edit.page.html',
  styleUrls: ['./profile-password-edit.page.scss'],
})
export class ProfilePasswordEditPage implements OnInit {

  db = getFirestore();
  updateUserPasswordForm: FormGroup
  userData = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService) { }

  ngOnInit() {
    this.updateUserPasswordForm = new FormGroup({
      password: new FormControl()
    })
  }

  updateUserPassword(){
    this.userService.updateUserPassword(
      this.updateUserPasswordForm.value.password,
    )
  }

}
