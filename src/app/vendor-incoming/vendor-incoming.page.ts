import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-incoming',
  templateUrl: './vendor-incoming.page.html',
  styleUrls: ['./vendor-incoming.page.scss'],
})
export class VendorIncomingPage implements OnInit {

  db = getFirestore();
  stallId: any;
  orders = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getIncomingOrders();
  }

  async getIncomingOrders() {
    // user id to get doc data
    const auth = getAuth();
    const user = auth.currentUser;
    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    console.log(vendorData.data().stallId);
    this.stallId = vendorData.data().stallId;

    this.orderService.incomingOrders(this.stallId).then((res) => {

      res.forEach((doc) => {
        let orderData = doc;
        this.orders.push(orderData)
        console.log(this.orders)
      })
    })

  }

}
