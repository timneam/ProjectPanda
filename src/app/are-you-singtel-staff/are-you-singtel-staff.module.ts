import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreYouSingtelStaffPageRoutingModule } from './are-you-singtel-staff-routing.module';

import { AreYouSingtelStaffPage } from './are-you-singtel-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreYouSingtelStaffPageRoutingModule
  ],
  declarations: [AreYouSingtelStaffPage]
})
export class AreYouSingtelStaffPageModule {}
