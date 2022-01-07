import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
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
  stallId = [];

  userOrders = [];

  db = getFirestore();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.test();       
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  getUserOrders(){
    this.orderService.getAllStallId().then((res) => {
      res.forEach((doc) =>{
        this.stallId.push(doc.id)
      })
    }).then(() => {
      this.stallId.forEach((doc) => {
        this.orderService.getOrdersByUserID(doc, this.userId).then((res) => {
          console.log(res)
          this.userOrders.push(res)
          console.log(this.userOrders)
        })
      })
    })
  }

  test() {
    this.orderService.getAllStallId().then((res) => {
      res.forEach((doc) =>{
        this.stallId.push(doc.id)
      })
    }).then(() => {
      this.stallId.forEach((doc) => {
        this.orderService.test(doc, this.userId, 'Pending').then((res) => {
          console.log(res)
          this.userOrders.push(res)
          console.log(this.userOrders)
        })
      })
    })
  }

}
