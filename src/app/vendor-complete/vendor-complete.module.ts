import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorCompletePageRoutingModule } from './vendor-complete-routing.module';

import { VendorCompletePage } from './vendor-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorCompletePageRoutingModule
  ],
  declarations: [VendorCompletePage]
})
export class VendorCompletePageModule {}
