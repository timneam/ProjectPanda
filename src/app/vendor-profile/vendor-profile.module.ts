import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorProfilePageRoutingModule } from './vendor-profile-routing.module';

import { VendorProfilePage } from './vendor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorProfilePageRoutingModule
  ],
  declarations: [VendorProfilePage]
})
export class VendorProfilePageModule {}
