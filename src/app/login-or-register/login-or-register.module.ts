import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOrRegisterPageRoutingModule } from './login-or-register-routing.module';

import { LoginOrRegisterPage } from './login-or-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOrRegisterPageRoutingModule
  ],
  declarations: [LoginOrRegisterPage]
})
export class LoginOrRegisterPageModule {}
