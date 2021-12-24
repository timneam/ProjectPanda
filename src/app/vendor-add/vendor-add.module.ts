import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorAddPageRoutingModule } from './vendor-add-routing.module';

import { VendorAddPage } from './vendor-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorAddPageRoutingModule
  ],
  declarations: [VendorAddPage]
})
export class VendorAddPageModule {}
