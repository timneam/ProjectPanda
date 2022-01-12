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
  totalString: any;
  addOnPrice = 0
  surcharge = 0.9
  surchargeString: any;
  containercost = 0.3
  containerCostString: any;
  grandTotal = 0
  grandTotalString: any;
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
    // console.log(ableToGetData.data())
    // console.log(this.stallId)
    this.userDetails = { "UserID": this.userId, "UserFirstName": ableToGetData.data().firstName, "UserLastName": ableToGetData.data().lastName, "UserPhoneNumber": ableToGetData.data().phoneNumber, "Status": "Pending", "TotalPrice": this.grandTotal, "stallID": this.stallId }
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

  calcGrandTotal() {
    // call first function and pass in a callback function which
    // first function runs when it has completed
    this.calFood(function () {
      console.log("---------------------");
    });

    this.containercost = (this.containerQuantity * 3) / 10
    this.grandTotal = this.total + this.addOnPrice + this.surcharge + this.containercost
    this.totalString =this.total.toFixed(2)
    this.surchargeString = this.surcharge.toFixed(2)
    this.containerCostString = this.containercost.toFixed(2)
    this.grandTotalString = this.grandTotal.toFixed(2)
    console.log("Surcharge : $" + this.surcharge)
    console.log("Container Cost : $" + this.containercost)
    console.log("Grand Total : $" + this.grandTotal)
  }

  imageData: any

  metadata = {
    contentType: 'image/jpeg'
  };

  // Create a root reference
  storage = getStorage();

  // Create a reference to 'mountains.jpg'
  storageRef = ref(this.storage);

  // Create a reference to 'images/mountains.jpg'
  mountainImagesRef = ref(this.storage, 'images/mountains.jpg');

  // uploadTask = uploadBytesResumable(this.storageRef, this.imageData, this.metadata);

  fileImg: any;

  onchange = (img) => {
    console.log("test meow")
    const file = img.target.files
    this.fileImg = file[0]
    console.log(this.fileImg)
    console.log(this.fileImg.name)

  }
  addImageToDatabase() {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${this.fileImg.name}`);

    const uploadTask = uploadBytesResumable(storageRef, this.fileImg);
    console.log(uploadTask)

    uploadTask.on('state_changed',
      (snapshot) => {
        // do shit here for the "progress bar"
        // make global variable that updates then display it on HTML
        console.log(snapshot)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // This is the file url for the image btw 
          // Go add this to the SRC on front-end
          console.log('File available at', downloadURL);
        });
      }
    );

    // // Pause the upload
    // uploadTask.pause();

    // // Resume the upload
    // uploadTask.resume();

    // // Cancel the upload
    // uploadTask.cancel();
  }

}
