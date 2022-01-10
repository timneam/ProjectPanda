import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-complete-order-details',
  templateUrl: './vendor-complete-order-details.page.html',
  styleUrls: ['./vendor-complete-order-details.page.scss'],
})
export class VendorCompleteOrderDetailsPage implements OnInit {

  orderId: any
  stallId: any

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

    console.log(this.stallId)

    this.orderService.getOrderedItems(this.stallId, this.orderId)
  }



}
