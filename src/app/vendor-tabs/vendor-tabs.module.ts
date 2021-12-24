import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorTabsPageRoutingModule } from './vendor-tabs-routing.module';

import { VendorTabsPage } from './vendor-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorTabsPageRoutingModule
  ],
  declarations: [VendorTabsPage]
})
export class VendorTabsPageModule {}
