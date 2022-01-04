import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEmailEditPageRoutingModule } from './profile-email-edit-routing.module';

import { ProfileEmailEditPage } from './profile-email-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEmailEditPageRoutingModule
  ],
  declarations: [ProfileEmailEditPage]
})
export class ProfileEmailEditPageModule {}
