import { Component, OnInit } from '@angular/core';
import { StallsService } from '../services/stalls.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, query, where, getDoc, } from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  db = getFirestore();
  stallData = []
  stallMenu = []

  stallId = this.activatedRoute.snapshot.paramMap.get("id");

  totalEstTime = 0;
  reallyTotalEstTime = [];
  totalEstTimeString: any;
  Est: any;
  foodID: any;
  
  constructor(
    private LoadingController : LoadingController,
    private stallService: StallsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private orderService: OrderService) { 
      this.foodID = localStorage.getItem("foodI")
    }

  ngOnInit() {
    this.presentLoading()
    this.getStallData();
    this.getStallMenu();
    this.estTime()
  }

  estTime() {
    console.log(this.stallId)
    let status = "Preparing"
    this.orderService.totalEstTime(this.stallId, status).then((doc) => {
      doc.forEach((doc) => {
        let time = parseInt(doc.TotalEstTime)
        this.totalEstTime = this.totalEstTime + time
        console.log(this.totalEstTime)
      })
    })

  }

  async presentLoading() {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  
  async getStallData() {
    const stallData = await getDoc(doc(this.db, "Stall", this.stallId));
    if (stallData.exists()) {
      this.stallData = [stallData.data()]
    } else {
      console.log("No such document!");
    }
  }

  async getStallMenu() {
    const querySnapshot = await getDocs(collection(this.db, "Stall", this.stallId, "Menu"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let foodData = { 
        "foodId": doc.id,
        "foodName": data.foodName, 
        "foodDetails": data.foodDetails, 
        "foodPrice": data.foodPrice, 
        "foodEstTime": data.foodEstTime,
        "foodImg" : data.foodImg,
      "foodQuantity": data.foodQuantity}
      this.stallMenu.push(foodData)
    })
    console.log(this.stallMenu[0].foodEstTime)
    localStorage.setItem("est1",this.stallMenu[0].foodEstTime)
    localStorage.setItem("foodI",this.stallMenu[0].foodId)
    console.log(this.stallMenu)
  }

  async goToMenuDetails(foodId){
    console.log(foodId)
    this.router.navigateByUrl(`/menu-item/${this.stallId}/${foodId}`)
  }

}
