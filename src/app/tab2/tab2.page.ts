import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { UserPhoto, PhotoService } from '../services/photo.service';
import { getAuth, onAuthStateChanged, reload } from 'firebase/auth';
import { OrderService } from '../services/order.service';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { of } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  auth = getAuth();
  db = getFirestore();
  userId: any;
  stallId: any;

  userDetails: any;
  cartItems = [];

  total = 0
  totalString: any
  addOnPrice = 0
  surcharge = 0
  surchargeString: any
  containercost = 0.3
  grandTotal = 0
  grandTotalString: any
  containerQuantity = 0
  discountedPrice = 0
  discountedPriceString: any
  amountSaved = 0
  amountSavedString: any
  addOnPriceFinal = 0
  FoodQuantity = 0;
  subTotal = 0;


  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private navCntrl: NavController,
    private cartService: CartService,
    private usersService: UsersService,
    private orderService: OrderService) {
    this.stallId = this.activatedRoute.snapshot.paramMap.get("stallId");
  }

  async ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let users = this.auth.currentUser
        this.userId = users.uid
        this.getItemsInCart()
      } else {
        console.log("User is signed out")
        this.navCntrl.navigateForward('splash');
      }
    });
  };


  getItemsInCart() {
    this.cartService.getItemsInACart(this.userId, this.stallId).then(doc => {
      doc.forEach(res => {
        let addon = [];
        this.cartService.getAddonForItem(this.userId, this.stallId, res.id).then(doc => {
          addon = doc
        }).then(() => {
          let cartData = { "id": res.id, "foodName": res.foodName, "foodPrice": res.foodPrice, "foodDescription": res.foodDescription, "foodEstTime": res.foodEstTime, "foodQty": res.foodQty, "addon": addon }
          this.cartItems.push(cartData)
        })
      });
    }).then(() => {
      setTimeout(() => {
        this.calcGrandTotal();
      }, 1000)
    });
  }

  removeItemFromCart(id) {
    this.cartService.removeItemFromCart(this.userId, this.stallId, id).then(() => {
      console.log("Item removed from cart successfully!")
    })
  }

  clearCart() {
    this.cartService.getItemsInACart(this.userId, this.stallId).then((doc) => {
      doc.forEach((doc) => {
        console.log(doc.id)
        this.cartService.removeItemFromCart(this.userId, this.stallId, doc.id).then(() => {
          console.log("All items removed from cart!")
          document.location.reload();
        })
      })
    })
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  async checkout() {
    let users = this.auth.currentUser
    const ableToGetData = await getDoc(doc(this.db, "User", users.uid))
    if (this.cartItems.length != 0) {
      this.userDetails = { 
        "UserID": this.userId, 
        "UserFirstName": ableToGetData.data().firstName, 
        "UserLastName": ableToGetData.data().lastName, 
        "UserPhoneNumber": ableToGetData.data().phoneNumber, 
        "Status": "Pending", 
        "stallID": this.stallId, 
        "Subtotal": this.totalString, 
        "Surcharge": this.surchargeString, 
        "GrandTotal": this.grandTotalString 
      }
      this.orderService.addOrderId(this.stallId, this.userDetails).then((res) => {
        console.log(res.id)
        this.cartItems.forEach((doc) => {
          console.log(doc)
          this.orderService.addToOrders(this.stallId, res.id, doc.id, doc)
        })
      }).then(() => {
        this.cartService.getItemsInACart(this.userId, this.stallId).then((doc) => {
          doc.forEach((doc) => {
            console.log(doc.id)
            this.cartService.removeItemFromCart(this.userId, this.stallId, doc.id).then(() => {
              console.log("All items removed from cart!")
              this.cartService.removeCart(this.userId, this.stallId)
              this.navCntrl.navigateForward('payment-options');
            })
          })
        })
      })
    }
  }

  calFood(_callback) {
    // do some asynchronous work
    // and when the asynchronous stuff is complete'
    this.cartItems.forEach(data => {
      this.containerQuantity = this.containerQuantity + data.foodQty
      this.total = this.total + (data.foodPrice * data.foodQty)
      this.FoodQuantity = data.foodQty
      data.addon.forEach(data => {
        this.addOnPrice = this.addOnPrice + parseFloat(data.addOnPrice)
        console.log("addon : $" + this.addOnPrice)
      })
      console.log("total : $" + this.total)
    })

    _callback();
  }

  calcGrandTotal() {
    // call first function and pass in a callback function which
    // first function runs when it has completed
    this.calFood(function () {
      console.log("---------------------");
    });

    this.addOnPriceFinal = this.addOnPrice * this.FoodQuantity
    this.surcharge = (this.containerQuantity * 3) / 10
    this.grandTotal = this.total + this.addOnPriceFinal + this.surcharge
    this.subTotal = this.total + this.addOnPriceFinal
    this.totalString = this.subTotal.toFixed(2)
    this.surchargeString = this.surcharge.toFixed(2)
    this.grandTotalString = this.grandTotal.toFixed(2)
    this.discountedPrice = (this.grandTotal / 100) * 90
    this.discountedPriceString = this.discountedPrice.toFixed(2)
    this.amountSaved = this.grandTotal - this.discountedPrice
    this.amountSavedString = this.amountSaved.toFixed(2)

    console.log("Surcharge : $" + this.surcharge)
    console.log("Container Cost : $" + this.containercost)
    console.log("Grand Total : $" + this.grandTotal)
  }

  doRefresh(event) {
    this.cartItems = []
    this.total = 0
    this.totalString = ""
    this.addOnPrice = 0
    this.surcharge = 0
    this.surchargeString = ""
    this.grandTotal = 0
    this.grandTotalString = ""
    this.containerQuantity = 0
    this.discountedPrice = 0
    this.addOnPriceFinal = 0
    this.FoodQuantity = 0;
    this.subTotal = 0;

    setTimeout(() => {
      event.target.complete().then(() => {
        this.getCurrentUser()
      })
    }, 2000);
  }

}
