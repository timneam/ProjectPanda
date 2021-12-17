import { Component, OnInit } from '@angular/core';
//import login from '../login/login.page'

import { Router} from '@angular/router';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
  this.router.navigate(['/login-or-register'])
      }, 3000); //2s
  }

}
