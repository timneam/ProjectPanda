import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorIncomingPageRoutingModule } from './vendor-incoming-routing.module';

import { VendorIncomingPage } from './vendor-incoming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorIncomingPageRoutingModule
  ],
  declarations: [VendorIncomingPage]
})
export class VendorIncomingPageModule {}
