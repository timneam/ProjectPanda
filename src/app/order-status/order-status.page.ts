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

  orderId : any;
  stallId : any;
  userId: any;

  vendorData = []

  orderData = []
  orderedItemData = []
  stallData = []
  orderStatus: any

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
        console.log("User is signed out")
        this.router.navigateByUrl('splash');
      }
    });
  };

  getOrdersFunction(){
    this.orderService.getUserDetailsInOrder(this.stallId, this.orderId).then((res) => {
      console.log(res)
      this.orderData.push(res)
    })
    this.orderService.lol(this.stallId, this.orderId).then((res) => {
      res.forEach(doc => {
        this.orderedItemData.push(doc.data())
        console.log(this.orderedItemData)
      })
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

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

  getVendorData(){
    this.orderService.findVendorDetails(this.stallId).then((doc) => {
      this.vendorData = doc
      console.log(this.vendorData)
    })
  }

}
