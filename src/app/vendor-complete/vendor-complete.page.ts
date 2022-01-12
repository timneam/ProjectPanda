import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-vendor-complete',
  templateUrl: './vendor-complete.page.html',
  styleUrls: ['./vendor-complete.page.scss'],
})
export class VendorCompletePage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  stallId: any;

  orders = [];
  completedOrders = [];

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
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  async getIncomingOrders() {
    // user id to get doc data
    const user = this.auth.currentUser;
    const vendorData = await getDoc(doc(this.db, 'User', user.uid));
    this.stallId = vendorData.data().stallId;

    this.orderService.incomingOrders(this.stallId).then((res) => {
      res.forEach((doc) => {
        let orderData = {'id': doc.id, 'UserFirstName': doc.data().UserFirstName, 'UserLastName': doc.data().UserLastName,'UserID': doc.data().UserID, 'UserPhoneNumber': doc.data().UserPhoneNumber,'Status': doc.data().Status};
        this.orders.push(orderData)
      })
    }).then(() => {
      this.completedOrders = this.orders.filter(rqeq => {
        return rqeq.Status == "Completed" 
      })
      console.log(this.completedOrders)
    })
  }

  async goToOrderDetails(orderId){
    this.router.navigateByUrl(`/vendor-complete-order-details/${orderId}`)
  }

}
