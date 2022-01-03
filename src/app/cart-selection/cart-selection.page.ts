import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-selection',
  templateUrl: './cart-selection.page.html',
  styleUrls: ['./cart-selection.page.scss'],
})
export class CartSelectionPage implements OnInit {

  userId: any;
  stallsCart = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getStallsCart();
  }

  getStallsCart() {
    let auth = getAuth();
    let user = auth.currentUser;

    this.userId = user.uid

    console.log(this.userId)

    this.cartService.getAllStallsCart(this.userId).then(res => {
      console.log(res)
      this.stallsCart.push(res)
      console.log(this.stallsCart)
    });
  }

}
