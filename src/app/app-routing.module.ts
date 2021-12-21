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
  },  {
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
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
