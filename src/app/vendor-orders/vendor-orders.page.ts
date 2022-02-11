import { Component, OnInit } from '@angular/core';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
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

  constructor(
    private orderService: OrderService,
    private router: Router
    ) { }

    ngOnInit() {
      this.getCurrentUser();
      // this.audio.play(); 
    }

    getCurrentUser = async function () {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          this.getIncomingOrders()
        } else {
          console.log("User is signed out")
          this.router.navigateByUrl('splash');
        }
      });
    };

    async getIncomingOrders() {
      const user = this.auth.currentUser;
      const vendorData = await getDoc(doc(this.db, 'User', user.uid));
      this.stallId = vendorData.data().stallId;
      console.log(this.stallId)
      this.orderService.incomingOrders(this.stallId).then((res) => {
        res.forEach((doc) => {
          let orderData = {
            'id': doc.id, 
            'UserFirstName': doc.data().UserFirstName, 
            'UserLastName': doc.data().UserLastName,
            'UserID': doc.data().UserID, 
            'UserPhoneNumber': doc.data().UserPhoneNumber,
            'Status': doc.data().Status,
            'OrderCode': doc.data().OrderCode
          };
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

    doRefresh(event) {
      console.log('Begin async operation');
  
      this.orders = [];
      this.preparingOrders = [];
      
      setTimeout(() => {
        event.target.complete().then(() => {
          this.getCurrentUser()
        })
      }, 2000);
    }

}
