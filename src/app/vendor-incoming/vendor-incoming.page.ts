import { Component, OnInit } from '@angular/core';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-vendor-incoming',
  templateUrl: './vendor-incoming.page.html',
  styleUrls: ['./vendor-incoming.page.scss'],
})
export class VendorIncomingPage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  stallId: any;

  OrderCode: any;
  orders = [];
  incomingOrders = [];

  // audio = new Audio('../../assets/1.mp3')
  
  constructor(private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentUser()
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
    // user id to get doc data
    const auth = getAuth();
    const user = auth.currentUser;
    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    this.stallId = vendorData.data().stallId;

    this.orderService.incomingOrders(this.stallId).then((res) => {
      res.forEach((doc) => {
        console.log(doc.data())
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
      this.incomingOrders = this.orders.filter(rqeq => {
        return rqeq.Status == "Pending" 
      })
      console.log(this.incomingOrders)
    })
  }

  async goToOrderDetails(orderId){
    this.router.navigateByUrl(`/vendor-incoming-order-details/${orderId}`)
  }

  doRefresh(event) {
    this.orders = [];
    this.incomingOrders = [];
    
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
