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

  orderData = []
  stallData = []
  orderStatus = []

  pendingOrder = []
  preparingOrder = []
  cancelledOrder = []
  completedOrder = []



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
        this.getOrdersFunction()
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
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
                let data = { "stallID": doc.stallID, "OrderID": doc.OrderID, "Status": doc.Status, "UserFirstName": doc.UserFirstName, "UserLastName": doc.UserLastName, "UserID": doc.UserID, "UserPhoneNumber": doc.UserPhoneNumber }
                this.orderStatus.push(data)
              })
              resolve('get order')
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

            let data = {
              "stallID": doc.stallID,
              "OrderID": doc.OrderID,
              "Status": doc.Status,
              "UserFirstName": doc.UserFirstName,
              "UserLastName": doc.UserLastName,
              "UserID": doc.UserID,
              "UserPhoneNumber": doc.UserPhoneNumber,
              "menuItem": menuArray
            }

            console.log(data)
            this.orderData.push(data)

          })

        })
        setTimeout(() => {
          resolve('data')
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

      console.log(this.pendingOrder)
      console.log(this.cancelledOrder)
      console.log(this.preparingOrder)
      console.log(this.completedOrder)
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.orderStatus = []
    this.orderData = []
    this.pendingOrder = []
    this.preparingOrder = []
    this.cancelledOrder = []
    this.completedOrder = []

    console.log(this.orderStatus)
    console.log(this.orderData)
    console.log(this.pendingOrder)
    console.log(this.cancelledOrder)
    console.log(this.preparingOrder)
    console.log(this.completedOrder)
    
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }
}
