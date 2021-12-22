import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NamePopUpPage } from './name-pop-up.page';

const routes: Routes = [
  {
    path: '',
    component: NamePopUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamePopUpPageRoutingModule {}
