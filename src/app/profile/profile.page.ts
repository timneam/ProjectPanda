import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private UsersService: UsersService) { 

    this.UsersService.getUserInformation().subscribe(res => {
      console.log(res);
    })

  }

  ngOnInit() {
  }

}
