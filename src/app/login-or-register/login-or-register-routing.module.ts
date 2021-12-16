import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOrRegisterPage } from './login-or-register.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOrRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOrRegisterPageRoutingModule {}
