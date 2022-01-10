import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorCompletePage } from './vendor-complete.page';

const routes: Routes = [
  {
    path: '',
    component: VendorCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorCompletePageRoutingModule {}
