import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorProfileEditPageRoutingModule } from './vendor-profile-edit-routing.module';

import { VendorProfileEditPage } from './vendor-profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorProfileEditPageRoutingModule
  ],
  declarations: [VendorProfileEditPage]
})
export class VendorProfileEditPageModule {}
