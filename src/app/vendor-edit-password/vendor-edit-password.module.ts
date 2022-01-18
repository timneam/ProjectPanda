import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorEditPasswordPageRoutingModule } from './vendor-edit-password-routing.module';

import { VendorEditPasswordPage } from './vendor-edit-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorEditPasswordPageRoutingModule
  ],
  declarations: [VendorEditPasswordPage]
})
export class VendorEditPasswordPageModule {}
