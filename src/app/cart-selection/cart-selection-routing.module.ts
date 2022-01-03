import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartSelectionPage } from './cart-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CartSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartSelectionPageRoutingModule {}
