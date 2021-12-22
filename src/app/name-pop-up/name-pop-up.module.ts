import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamePopUpPageRoutingModule } from './name-pop-up-routing.module';

import { NamePopUpPage } from './name-pop-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NamePopUpPageRoutingModule
  ],
  declarations: [NamePopUpPage]
})
export class NamePopUpPageModule {}
