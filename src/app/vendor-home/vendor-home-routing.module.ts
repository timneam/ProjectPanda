import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorHomePage } from './vendor-home.page';

const routes: Routes = [
  {
    path: '',
    component: VendorHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorHomePageRoutingModule {}
