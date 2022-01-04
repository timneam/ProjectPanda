import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { CartService } from '../services/cart.service';
import { UserPhoto, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  userId: any;
  stallId: any;

  cartItems = [];

  constructor(
    public photoService: PhotoService, 
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService) {
    this.stallId = this.activatedRoute.snapshot.paramMap.get("stallId");
  }

  async ngOnInit() {
    this.getItemsInCart();

    await this.photoService.loadSaved();
  }
  
  getItemsInCart(){
    let auth = getAuth();
    let user = auth.currentUser;

    this.userId = user.uid

    console.log(this.userId)
    console.log(this.stallId)

    this.cartService.getItemsInACart(this.userId, this.stallId).then(doc => {

      doc.forEach(res => {
        // console.log(res)
        let cartData = { "id": res.id, "foodName": res.foodName , "foodPrice":res.foodPrice , "foodDescription":res.foodDescription , "foodEstTime":res.foodEstTime , "foodQty": res.foodQty}
        this.cartItems.push(cartData)
        console.log(this.cartItems)
      });
    });

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
}
