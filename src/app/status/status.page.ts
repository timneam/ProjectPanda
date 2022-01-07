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
    this.getUserOrders();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        console.log(this.userId)
        this.getUserOrders()        
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
        console.log(this.stallId)
      })
    }).then(() => {
      this.stallId.forEach((doc) => {
        console.log(doc)
        this.orderService.getOrdersByUserID(doc.id, this.userId).then((res) => {
          console.log(res)
          this.userOrders.push(res)
        })
      })
    })
    
  }

}
