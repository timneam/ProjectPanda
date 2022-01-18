import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorEditEmailPageRoutingModule } from './vendor-edit-email-routing.module';

import { VendorEditEmailPage } from './vendor-edit-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VendorEditEmailPageRoutingModule
  ],
  declarations: [VendorEditEmailPage]
})
export class VendorEditEmailPageModule {}
