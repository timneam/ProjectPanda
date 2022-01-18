import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-edit-password',
  templateUrl: './vendor-edit-password.page.html',
  styleUrls: ['./vendor-edit-password.page.scss'],
})
export class VendorEditPasswordPage implements OnInit {

  db = getFirestore();
  updateUserPasswordForm: FormGroup
  userData = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService,
    private router:Router) { }

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
