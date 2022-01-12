import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
      },
    
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login-or-register',
    loadChildren: () => import('./login-or-register/login-or-register.module').then( m => m.LoginOrRegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'singtel-staff-registration',
    loadChildren: () => import('./singtel-staff-registration/singtel-staff-registration.module').then( m => m.SingtelStaffRegistrationPageModule)
  },
  {
    path: 'are-you-singtel-staff',
    loadChildren: () => import('./are-you-singtel-staff/are-you-singtel-staff.module').then( m => m.AreYouSingtelStaffPageModule)
  },
  {
    path: 'singtel',
    loadChildren: () => import('./singtel/singtel.module').then( m => m.SingtelPageModule)
  },
  {
    path: 'name-pop-up',
    loadChildren: () => import('./name-pop-up/name-pop-up.module').then( m => m.NamePopUpPageModule)
  },
  {
    path: 'menu/:id',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./vendor-tabs/vendor-tabs.module').then( m => m.VendorTabsPageModule)
  },
{
  path: 'vendor-tabs/:stallId/add', 
  loadChildren: () =>
  import('./vendor-add/vendor-add.module').then( m => m.VendorAddPageModule)
},
  {
    path: 'menu-item/:stallId/:menuId',
    loadChildren: () => import('./menu-item/menu-item.module').then( m => m.MenuItemPageModule)
  },
  {
    path: 'vendor-tabs/:stallId/update-item/:menuId',
    loadChildren: () => import('./update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  {
    path: 'vendor-profile',
    loadChildren: () => import('./vendor-profile/vendor-profile.module').then( m => m.VendorProfilePageModule)
  },
  {
    path: 'cart/:stallId',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'profile-email-edit',
    loadChildren: () => import('./profile-email-edit/profile-email-edit.module').then( m => m.ProfileEmailEditPageModule)
  },
  {
    path: 'profile-password-edit',
    loadChildren: () => import('./profile-password-edit/profile-password-edit.module').then( m => m.ProfilePasswordEditPageModule)
  },
  {
    path: 'vendor-incoming',
    loadChildren: () => import('./vendor-incoming/vendor-incoming.module').then( m => m.VendorIncomingPageModule)
  },
  {
    path: 'status',
    loadChildren: () => import('./status/status.module').then( m => m.StatusPageModule)
  },
  {
    path: 'vendor-individual-order/:orderId',
    loadChildren: () => import('./vendor-individual-order/vendor-individual-order.module').then( m => m.VendorIndividualOrderPageModule)
  },
  {
    path: 'vendor-incoming-order-details/:orderId',
    loadChildren: () => import('./vendor-incoming-order-details/vendor-incoming-order-details.module').then( m => m.VendorIncomingOrderDetailsPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'vendor-complete',
    loadChildren: () => import('./vendor-complete/vendor-complete.module').then( m => m.VendorCompletePageModule)
  },
  {
    path: 'vendor-complete-order-details/:orderId',
    loadChildren: () => import('./vendor-complete-order-details/vendor-complete-order-details.module').then( m => m.VendorCompleteOrderDetailsPageModule)
  },
  {
    path: 'payment-options',
    loadChildren: () => import('./payment-options/payment-options.module').then( m => m.PaymentOptionsPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  }










];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
