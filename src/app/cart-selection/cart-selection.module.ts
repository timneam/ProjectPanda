import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartSelectionPageRoutingModule } from './cart-selection-routing.module';

import { CartSelectionPage } from './cart-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartSelectionPageRoutingModule
  ],
  declarations: [CartSelectionPage]
})
export class CartSelectionPageModule {}
