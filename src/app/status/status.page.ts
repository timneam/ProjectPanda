import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  orderData = []
  stallData = []
  orderStatus = []

  pendingOrder = []
  preparingOrder = []
  cancelledOrder = []
  completedOrder = []

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getOrdersFunction()
      } else {
        console.log("User is signed out")
        this.router.navigateByUrl('splash');
      }
    });
  };

  getOrdersFunction() {
    this.getUserOrders().then(res => {
      console.log(res)
      this.getMenuItems().then(res => {
        console.log(res)
        this.filteredOrders().then(res => {
          console.log(res)
        })
      })
    })
  }

  getUserOrders() {
    return new Promise((resolve, reject) => {
      this.orderService.getAllStallId().then((res) => {
        res.forEach((doc) => {
          this.stallData.push(doc.id)
        })
      }).then(() => {
        this.stallData.forEach((doc) => {
          this.orderService.test(doc, this.userId).then((res) => {
            if (res.length != 0) {
              res.forEach((doc) => {
                console.log(doc)
                let data = {
                  "stallID": doc.stallID, 
                  "OrderID": doc.OrderID,
                  "OrderCode": doc.OrderCode, 
                  "Status": doc.Status, 
                  "UserFirstName": doc.UserFirstName, 
                  "UserLastName": doc.UserLastName, 
                  "UserID": doc.UserID, 
                  "UserPhoneNumber": doc.UserPhoneNumber,
                  "Subtotal": doc.Subtotal,
                  "Surcharge": doc.Surcharge,
                  "GrandTotal": doc.GrandTotal, 
                }
                this.orderStatus.push(data)
              })
              resolve('Get order')
            }
          })
        })
      })
    })
  }

  getMenuItems() {
    return new Promise((resolve, reject) => {
      if (this.orderStatus.length == 0) {
        reject('hmmm')
      } else {
        this.orderStatus.forEach((doc) => {
          this.orderService.lol(doc.stallID, doc.OrderID).then(res => {
            let menuArray = []
            res.forEach(doc => {
              menuArray.push(doc.data())
            })
            this.stallId = doc.stallID
            let data = {
              "stallID": doc.stallID,
              "OrderID": doc.OrderID,
              "OrderCode":doc.OrderCode,
              "Status": doc.Status,
              "UserFirstName": doc.UserFirstName,
              "UserLastName": doc.UserLastName,
              "UserID": doc.UserID,
              "UserPhoneNumber": doc.UserPhoneNumber,
              "Subtotal": doc.Subtotal,
              "Surcharge": doc.Surcharge,
              "GrandTotal": doc.GrandTotal,
              "menuItem": menuArray
            }
            this.orderData.push(data)
          })
        })
        setTimeout(() => {
          resolve('Menu data')
        }, 2000);
      }
    })
  }

  filteredOrders() {
    return new Promise((resolve, reject) => {

      this.pendingOrder = this.orderData.filter(res => {
        return res.Status == "Pending"
      })
      this.cancelledOrder = this.orderData.filter(res => {
        return res.Status == "Cancelled"
      })
      this.preparingOrder = this.orderData.filter(res => {
        return res.Status == "Preparing"
      })
      this.completedOrder = this.orderData.filter(res => {
        return res.Status == "Completed"
      })

      resolve('Done Filter')
    })
  }

  doRefresh(event) {
    this.orderStatus = []
    this.orderData = []
    this.pendingOrder = []
    this.preparingOrder = []
    this.cancelledOrder = []
    this.completedOrder = []
    
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

  goToOrderStatusPage(orderId){
    this.router.navigateByUrl(`/order-status/${this.stallId}/${orderId}`)
    
  }

}
