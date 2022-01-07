import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorIndividualOrderPage } from './vendor-individual-order.page';

const routes: Routes = [
  {
    path: '',
    component: VendorIndividualOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorIndividualOrderPageRoutingModule {}
