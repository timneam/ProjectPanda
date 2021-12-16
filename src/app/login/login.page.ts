import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
   formData: FormGroup;

  constructor(
    private UsersService: UsersService,
    private formBuilder: FormBuilder) {

  }
  ngOnInit() {

    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onLogin() {
    console.log(this.formData.value)
    this.UsersService.loginUser(this.formData.value.email, this.formData.value.password)

  }

  onRegister() {
    console.log(this.formData.value)
    this.UsersService.registerUser(this.formData.value.email, this.formData.value.password)

  }

}
