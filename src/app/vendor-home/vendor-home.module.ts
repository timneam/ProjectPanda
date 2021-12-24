import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorHomePageRoutingModule } from './vendor-home-routing.module';

import { VendorHomePage } from './vendor-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorHomePageRoutingModule
  ],
  declarations: [VendorHomePage]
})
export class VendorHomePageModule {}
