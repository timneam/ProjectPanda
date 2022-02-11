import { Component, OnInit } from '@angular/core';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-individual-order',
  templateUrl: './vendor-individual-order.page.html',
  styleUrls: ['./vendor-individual-order.page.scss'],
})
export class VendorIndividualOrderPage implements OnInit {

  orderId: any
  stallId: any

  auth = getAuth();
  db = getFirestore();

  customerId: any;
  customerImg: any;

  OrderCode: any;

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
        this.router.navigateByUrl('splash');
      }
    });
  };

  async getOrderDetails() {
    const vendorData = await getDoc(doc(this.db, 'User', this.auth.currentUser.uid));
    this.stallId = vendorData.data().stallId;

    this.orderService.getUserDetailsInOrder(this.stallId, this.orderId).then(async (res) => {
      this.OrderCode = res.OrderCode
      this.customerId = res.UserID
      this.userDetails.push(res)
      const userdata = await getDoc(doc(this.db, "User", this.customerId)).then((res) => {
        console.log(res.data())
        this.customerImg = res.data().UserPhoto
        console.log(this.customerImg)
      })
    })

    this.orderService.getOrderedItems(this.stallId, this.orderId).then((res) => {
      this.orderDetails = res
      console.log(this.orderDetails)
    })
  }

  cancelOrder() {
    this.orderService.declineOrders(this.stallId, this.orderId)
  }

  completeOrder() {
    this.orderService.completedOrders(this.stallId, this.orderId)
  }

}
