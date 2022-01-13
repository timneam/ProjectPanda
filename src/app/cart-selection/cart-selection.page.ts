import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-cart-selection',
  templateUrl: './cart-selection.page.html',
  styleUrls: ['./cart-selection.page.scss'],
})
export class CartSelectionPage implements OnInit {

  auth = getAuth();
  userId: any;
  stallsCart = [];

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
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };

  getStallsCart() {
    this.cartService.getAllStallsCart(this.userId).then(res => {
      if (res.length !== 0) {
        res.forEach(res => {
          let stallData = { "id": res }
          this.stallsCart.push(stallData)
        });
      } else {
        // Add Ui for this Thanks
        console.log("No Item in Cart")
      }

    });
  }

  goToStallCart(stallId) {
    this.router.navigateByUrl(`/cart/${stallId}`)
  }

  doRefresh(event) {
    this.stallsCart = [];
    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
