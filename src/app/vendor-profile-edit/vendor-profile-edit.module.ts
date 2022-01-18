import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorProfileEditPageRoutingModule } from './vendor-profile-edit-routing.module';

import { VendorProfileEditPage } from './vendor-profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VendorProfileEditPageRoutingModule
  ],
  declarations: [VendorProfileEditPage]
})
export class VendorProfileEditPageModule {}
