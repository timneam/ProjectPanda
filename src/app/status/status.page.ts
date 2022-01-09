import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  
  auth = getAuth();
  userId: any;
  stallId: any;

  stallData = [];
  orderStatus = [];


  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getUserOrders()
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  getUserOrders() {
    this.orderService.getAllStallId().then((res) => {
      res.forEach((doc) => {
        this.stallData.push(doc.id)
      })
    }).then(() => {
      this.stallData.forEach((doc) => {
        this.orderService.test(doc, this.userId, 'Pending').then((res) => {
          this.orderStatus.push(res)
          console.log(this.orderStatus)
        })
      })
    })
  }

}
