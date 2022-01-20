import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorEditDetailsPage } from './vendor-edit-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorEditDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorEditDetailsPageRoutingModule {}
