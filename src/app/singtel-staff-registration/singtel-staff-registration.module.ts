import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingtelStaffRegistrationPageRoutingModule } from './singtel-staff-registration-routing.module';

import { SingtelStaffRegistrationPage } from './singtel-staff-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SingtelStaffRegistrationPageRoutingModule
  ],
  declarations: [SingtelStaffRegistrationPage]
})
export class SingtelStaffRegistrationPageModule {}
