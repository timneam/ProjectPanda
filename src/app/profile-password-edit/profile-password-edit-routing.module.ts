import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePasswordEditPage } from './profile-password-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePasswordEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePasswordEditPageRoutingModule {}
