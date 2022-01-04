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
  },  {
    path: 'profile-email-edit',
    loadChildren: () => import('./profile-email-edit/profile-email-edit.module').then( m => m.ProfileEmailEditPageModule)
  }









];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
