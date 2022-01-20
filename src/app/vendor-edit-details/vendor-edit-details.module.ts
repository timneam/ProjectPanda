import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorEditDetailsPageRoutingModule } from './vendor-edit-details-routing.module';

import { VendorEditDetailsPage } from './vendor-edit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorEditDetailsPageRoutingModule
  ],
  declarations: [VendorEditDetailsPage]
})
export class VendorEditDetailsPageModule {}
