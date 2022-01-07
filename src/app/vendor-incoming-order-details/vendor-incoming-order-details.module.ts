import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorIncomingOrderDetailsPageRoutingModule } from './vendor-incoming-order-details-routing.module';

import { VendorIncomingOrderDetailsPage } from './vendor-incoming-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorIncomingOrderDetailsPageRoutingModule
  ],
  declarations: [VendorIncomingOrderDetailsPage]
})
export class VendorIncomingOrderDetailsPageModule {}
