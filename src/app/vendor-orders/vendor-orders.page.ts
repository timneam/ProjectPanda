import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.page.html',
  styleUrls: ['./vendor-orders.page.scss'],
})
export class VendorOrdersPage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  stallId: any;

  orders = [];
  preparingOrders = [];

  constructor(private orderService: OrderService,
    private router: Router) { }

    ngOnInit() {
      this.getIncomingOrders()
      // this.audio.play(); 
    }

    async getIncomingOrders() {
      // user id to get doc data
      const auth = getAuth();
      const user = auth.currentUser;
      const vendorData = await getDoc(doc(this.db, 'User', user.uid));
      this.stallId = vendorData.data().stallId;
  
      this.orderService.incomingOrders(this.stallId).then((res) => {
        res.forEach((doc) => {
          let orderData = {'id': doc.id, 'UserFirstName': doc.data().UserFirstName, 'UserLastName': doc.data().UserLastName,'UserID': doc.data().UserID, 'UserPhoneNumber': doc.data().UserPhoneNumber,'Status': doc.data().Status};
          this.orders.push(orderData)
        })
      }).then(() => {
        this.preparingOrders = this.orders.filter(rqeq => {
          return rqeq.Status == "Preparing" 
        })
        console.log(this.preparingOrders)
      })
    }
  
    async goToOrderDetails(orderId){
      this.router.navigateByUrl(`/vendor-individual-order/${orderId}`)
    }

}
