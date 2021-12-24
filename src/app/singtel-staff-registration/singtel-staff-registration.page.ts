import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { SingtelStaffRegistrationPageModule } from './singtel-staff-registration.module';

@Component({
  selector: 'app-singtel-staff-registration',
  templateUrl: './singtel-staff-registration.page.html',
  styleUrls: ['./singtel-staff-registration.page.scss'],
})
export class SingtelStaffRegistrationPage implements OnInit {

  singtelStaffReg : FormGroup

  constructor(
    private usersService: UsersService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.singtelStaffReg = new FormGroup ({
      staffName: new FormControl(),
      staffId: new FormControl()
    })
  }

  addSingtelStaffData(){
    this.usersService.singtelStaffRegister(
      this.singtelStaffReg.value.staffName,
      this.singtelStaffReg.value.staffId
    )
    console.log(this.singtelStaffReg.value)
  }

}
