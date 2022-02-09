import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-cart-selection',
  templateUrl: './cart-selection.page.html',
  styleUrls: ['./cart-selection.page.scss'],
})
export class CartSelectionPage implements OnInit {

  auth = getAuth();
  db = getFirestore();
  
  userId: any;
  stallsCart = [];
  stallDetails = [];

  constructor(private cartService: CartService,
    private router: Router,
    private navCntrl: NavController,
    private usersService: UsersService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser = async function () {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getStallsCart()
      } else {
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  async getStallsCart() {
    this.cartService.getAllStallsCart(this.userId).then(res => {
      if (res.length !== 0) {
        res.forEach(res => {
          let stallData = { "id": res }
          this.stallsCart.push(stallData)
        });
      }
    }).then(() => {
      this.stallsCart.forEach(async (res) => {
        const stallDetails = await getDoc(doc(this.db, 'Stall', res.id));
        let stallInfo = {
          'id': res.id,
          'stallStatus': stallDetails.data().stallStatus,
          'stallName': stallDetails.data().stallName,
          'stallImg': stallDetails.data().stallImg
        }
        this.stallDetails.push(stallInfo)
        console.log(this.stallDetails)
      })
    });
  }

  goToStallCart(stallId) {
    this.router.navigateByUrl(`/cart/${stallId}`)
  }

  doRefresh(event) {
    this.stallsCart = [];
    this.stallDetails = [];
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
