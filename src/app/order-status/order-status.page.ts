import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, doc, getDoc, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { StallsService } from '../services/stalls.service';
import { CartService } from '../services/cart.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {

  auth = getAuth();
  db = getFirestore();

  paymentStatus = "Refund in progress!";

  orderId : any;
  stallId : any;
  userId: any;
  orderCode: any;

  vendorImg: any;
  orderStatus: any

  vendorData = []
  orderData = []
  orderedItemData = []
  stallData = []

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private stallService: StallsService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
   ) {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId')
    this.stallId = this.activatedRoute.snapshot.paramMap.get('stallId')
   }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getOrdersFunction()
        this.getVendorData()
      } else {
        this.router.navigateByUrl('splash');
      }
    });
  };

  getOrdersFunction(){
    this.orderService.getUserDetailsInOrder(this.stallId, this.orderId).then((res) => {
      this.orderData.push(res)
      this.orderCode = res.OrderCode
    })
    this.orderService.lol(this.stallId, this.orderId).then((res) => {
      res.forEach(doc => {
        this.orderedItemData.push(doc.data())
      })
    })
  }

  getVendorData(){
    this.orderService.findVendorDetails(this.stallId).then((doc) => {
      this.vendorData = doc
    })

    this.stallService.getAStallInformation(this.stallId).then((res) => {
      console.log(res.data())
      this.vendorImg = res.data().vendorPhoto
    })

  }

  doRefresh(event) {

    this.vendorData = []
    this.orderData = []
    this.orderedItemData = []
    this.stallData = []
    this.orderData = []
    
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
