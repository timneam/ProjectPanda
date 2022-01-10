import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-incoming-order-details',
  templateUrl: './vendor-incoming-order-details.page.html',
  styleUrls: ['./vendor-incoming-order-details.page.scss'],
})
export class VendorIncomingOrderDetailsPage implements OnInit {

  orderId: any
  stallId: any

  userDetails = [];
  orderDetails = [];

  db = getFirestore();

  constructor(private activatedRoute: ActivatedRoute,
    private orderService:OrderService) {
      this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId')
     }

  ngOnInit() {
    this.getOrderDetails()
  }

  async getOrderDetails(){
    const auth = getAuth();
    const user = auth.currentUser;
    
    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    console.log(vendorData.data().stallId);
    this.stallId = vendorData.data().stallId;

    console.log(this.orderId)

    this.orderService.getUserDetailsInOrder(this.stallId, this.orderId).then((res) => {
      this.userDetails.push(res)
    })

    this.orderService.getOrderedItems(this.stallId, this.orderId).then((res) => {
      this.orderDetails.push(res)
      console.log(this.orderDetails)
    })
  }

  cancelOrder() {

  }

  acceptOrder() {

  }

}
