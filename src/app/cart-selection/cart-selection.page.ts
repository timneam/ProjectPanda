import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.getStallsCart();
  }

  getStallsCart() {
    let auth = getAuth();
    let user = auth.currentUser;

    this.userId = user.uid

    // console.log(this.userId)

    this.cartService.getAllStallsCart(this.userId).then(res => {
      // console.log(res)
    
      res.forEach(res => {
        let stallData = { "id": res }
        this.stallsCart.push(stallData)
      });

      console.log(this.stallsCart)
      // console.log(this.stallsCart)
    });
  }

  goToStallCart(stallId) {
    this.router.navigateByUrl(`/cart/${stallId}`)
  }

}
