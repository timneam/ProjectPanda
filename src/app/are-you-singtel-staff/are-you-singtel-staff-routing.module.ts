import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreYouSingtelStaffPage } from './are-you-singtel-staff.page';

const routes: Routes = [
  {
    path: '',
    component: AreYouSingtelStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreYouSingtelStaffPageRoutingModule {}
