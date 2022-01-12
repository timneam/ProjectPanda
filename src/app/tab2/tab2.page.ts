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
  addOnPrice = 0
  surcharge = 0.9
  containercost = 0.3
  grandtotal = 0
  containerQuantity = 0

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
    this.testRefresh()
  }

  testRefresh = async function () {
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
        this.grandTotal();
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
    console.log(ableToGetData.data())

    this.userDetails = { "UserID": this.userId, "UserFirstName": ableToGetData.data().firstName, "UserLastName": ableToGetData.data().lastName, "UserPhoneNumber": ableToGetData.data().phoneNumber, "Status": "Pending", "TotalPrice": this.grandtotal}
    // console.log(this.userId)
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
            this.navCntrl.navigateForward('payment-options');
          })
        })
      })
    })
  }

  calFood(_callback) {
    // do some asynchronous work
    // and when the asynchronous stuff is complete'
    this.cartItems.forEach(data => {
      this.containerQuantity = this.containerQuantity + data.foodQty
      this.total = this.total + (data.foodPrice * data.foodQty)
      data.addon.forEach(data => {
        this.addOnPrice = this.addOnPrice + parseFloat(data.addOnPrice)
        console.log("addon : $" + this.addOnPrice)
      })
      console.log("total : $" + this.total)
    })

    _callback();
  }

  grandTotal() {
    // call first function and pass in a callback function which
    // first function runs when it has completed
    this.calFood(function() {
      console.log("Test calFood Function");
    });

    this.containercost = 0.3 * this.containerQuantity
    this.grandtotal = this.total + this.addOnPrice + this.surcharge + this.containercost
    console.log("Container Cost : $" + this.containercost)
    console.log("Surcharge : $" + this.surcharge)
    console.log("Grand Total : $" + this.grandtotal)
  }

}
