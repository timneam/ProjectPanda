import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorEditPasswordPage } from './vendor-edit-password.page';

const routes: Routes = [
  {
    path: '',
    component: VendorEditPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorEditPasswordPageRoutingModule {}
