import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FilterModalComponent } from './filter-modal.component';



@NgModule({
  declarations: [FilterModalComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
  ]
})


export class FilterModalComponentRoutingModule {}
