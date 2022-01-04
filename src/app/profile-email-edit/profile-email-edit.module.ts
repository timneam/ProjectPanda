import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEmailEditPageRoutingModule } from './profile-email-edit-routing.module';

import { ProfileEmailEditPage } from './profile-email-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileEmailEditPageRoutingModule
  ],
  declarations: [ProfileEmailEditPage]
})
export class ProfileEmailEditPageModule {}
