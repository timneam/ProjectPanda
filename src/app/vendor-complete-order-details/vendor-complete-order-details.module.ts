import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorCompleteOrderDetailsPageRoutingModule } from './vendor-complete-order-details-routing.module';

import { VendorCompleteOrderDetailsPage } from './vendor-complete-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorCompleteOrderDetailsPageRoutingModule
  ],
  declarations: [VendorCompleteOrderDetailsPage]
})
export class VendorCompleteOrderDetailsPageModule {}
