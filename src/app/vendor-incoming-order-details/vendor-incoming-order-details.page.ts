import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-vendor-incoming-order-details',
  templateUrl: './vendor-incoming-order-details.page.html',
  styleUrls: ['./vendor-incoming-order-details.page.scss'],
})
export class VendorIncomingOrderDetailsPage implements OnInit {

  orderId: any
  stallId: any

  auth = getAuth();
  db = getFirestore();

  userDetails = [];
  orderDetails = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService) {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId')
  }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getOrderDetails()
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  async getOrderDetails() {
    const vendorData = await getDoc(doc(this.db, 'User', this.auth.currentUser.uid));
    this.stallId = vendorData.data().stallId;

    this.orderService.getUserDetailsInOrder(this.stallId, this.orderId).then((res) => {
      console.log(res)
      this.userDetails.push(res)
    })

    this.orderService.getOrderedItems(this.stallId, this.orderId).then((res) => {
      this.orderDetails = res
      console.log(this.orderDetails)
    })
  }

  cancelOrder() {
    this.orderService.declineOrders(this.stallId, this.orderId)
  }

  acceptOrder() {
    this.orderService.acceptOrders(this.stallId, this.orderId)
  }

}
