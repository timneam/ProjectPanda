import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formData: FormGroup;

  constructor(
    private UsersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.formData = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      reEnterPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
    })

  }

  onRegister() {
    console.log(this.formData.value)
    this.UsersService.registerUser(
      this.formData.value.email, 
      this.formData.value.password,
      this.formData.value.reEnterPassword, 
      this.formData.value.firstName,    
      this.formData.value.lastName, 
      this.formData.value.phoneNumber)

  }

}
