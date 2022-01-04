import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileEmailEditPage } from './profile-email-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileEmailEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEmailEditPageRoutingModule {}
