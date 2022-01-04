import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePasswordEditPageRoutingModule } from './profile-password-edit-routing.module';

import { ProfilePasswordEditPage } from './profile-password-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePasswordEditPageRoutingModule
  ],
  declarations: [ProfilePasswordEditPage]
})
export class ProfilePasswordEditPageModule {}
