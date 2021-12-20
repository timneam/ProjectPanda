import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingtelStaffRegistrationPage } from './singtel-staff-registration.page';

const routes: Routes = [
  {
    path: '',
    component: SingtelStaffRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingtelStaffRegistrationPageRoutingModule {}
