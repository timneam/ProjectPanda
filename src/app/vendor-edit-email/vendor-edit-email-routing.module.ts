import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorEditEmailPage } from './vendor-edit-email.page';

const routes: Routes = [
  {
    path: '',
    component: VendorEditEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorEditEmailPageRoutingModule {}
