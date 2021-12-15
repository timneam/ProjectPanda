import { Component, OnInit } from '@angular/core';
//import login from '../login/login.page'

import { Router } from '@angular/router';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
  
      }, 10000); //5s
  }

}
