import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorIncomingPage } from './vendor-incoming.page';

const routes: Routes = [
  {
    path: '',
    component: VendorIncomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorIncomingPageRoutingModule {}
