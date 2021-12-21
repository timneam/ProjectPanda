import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingtelPageRoutingModule } from './singtel-routing.module';

import { SingtelPage } from './singtel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingtelPageRoutingModule
  ],
  declarations: [SingtelPage]
})
export class SingtelPageModule {}
