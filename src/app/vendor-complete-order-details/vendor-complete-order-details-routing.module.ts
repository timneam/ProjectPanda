import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorCompleteOrderDetailsPage } from './vendor-complete-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorCompleteOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorCompleteOrderDetailsPageRoutingModule {}
