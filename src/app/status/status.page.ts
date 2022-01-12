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

  cancelledOrder = [];
  pendingOrder = [];
  preparingOrder = [];
  completedOrder = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getCurrentUser()
    this.getOrderedItems()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getUserOrders()
        this.getOrderedItems()
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  getUserOrders() {
    this.orderService.getAllStallId().then((res) => {
      console.log(res)
      res.forEach((doc) => {
        this.stallData.push(doc.id)
      })
    }).then(() => {
      this.stallData.forEach((doc) => {
        this.orderService.test(doc, this.userId).then((res) => {
          if (res.length != 0) {
            res.forEach((doc) => {
              // console.log(doc)
              // console.log(doc.OrderID)
              this.orderStatus.push(doc)
              console.log(this.orderStatus)
            })
          }
        })
      })
    })
  }

  getOrderedItems() {
    this.orderStatus.forEach((doc) => {
      console.log(doc)
    })
    this.orderService.getOrderedItems(this.stallId, this.orderStatus)
  }

  filteredOrders(){
    this.pendingOrder = this.orderStatus.filter(rqeq => {
      return rqeq.Status == "Pending" 
    })
    this.cancelledOrder = this.orderStatus.filter(rqeq => {
      return rqeq.Status == "Cancelled" 
    })
    this.preparingOrder = this.orderStatus.filter(rqeq => {
      return rqeq.Status == "Preparing" 
    })
    this.completedOrder = this.orderStatus.filter(rqeq => {
      return rqeq.Status == "Completed" 
    })
    console.log(this.pendingOrder)
    console.log(this.cancelledOrder)
    console.log(this.preparingOrder)
    console.log(this.completedOrder)
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete().then(() => {
        this.getUserOrders()
      })
    }, 2000);
  }

}
