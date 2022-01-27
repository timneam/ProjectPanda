import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl()
    })
  }

  sendResetPasswordEmail() {
    this.userService.passwordReset(
      this.forgotPasswordForm.value.email
    )
  }

}
