import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorIncomingOrderDetailsPage } from './vendor-incoming-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: VendorIncomingOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorIncomingOrderDetailsPageRoutingModule {}
