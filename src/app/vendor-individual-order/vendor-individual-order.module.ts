import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorIndividualOrderPageRoutingModule } from './vendor-individual-order-routing.module';

import { VendorIndividualOrderPage } from './vendor-individual-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorIndividualOrderPageRoutingModule
  ],
  declarations: [VendorIndividualOrderPage]
})
export class VendorIndividualOrderPageModule {}
