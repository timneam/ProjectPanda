import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorTabsPage } from './vendor-tabs.page';

const routes: Routes = [
  {
    path: 'vendor-tabs',
    component: VendorTabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../vendor-home/vendor-home.module').then( m => m.VendorHomePageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
             import('../vendor-add/vendor-add.module').then( m => m.VendorAddPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/vendor-tabs/home',
        pathMatch: 'full'
      }
    ]
  },
      {
        path: '',
        redirectTo: '/vendor-tabs/home',
        pathMatch: 'full'
      }
    
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorTabsPageRoutingModule {}
