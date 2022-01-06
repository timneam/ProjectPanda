import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { UsersService } from '../services/users.service';
import { UserPhoto, PhotoService } from '../services/photo.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  auth = getAuth();
  userId: any;
  stallId: any;

  cartItems = [];

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
      });
  }

  removeItemFromCart(id) {
    this.cartService.removeItemFromCart(this.userId, this.stallId, id).then(() => {
      console.log("Item removed from cart successfully!")
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

  checkout() {
    this.orderService.addOrderId(this.stallId).then((res) => {
      console.log(res.id)
      this.cartItems.forEach((doc) => {
        console.log(doc)
        this.orderService.addToOrders(this.stallId, res.id, doc.id, doc)
      })
    })
  }

}
