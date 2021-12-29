import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, where, query, getDoc, QuerySnapshot } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class StallsService {

  db = getFirestore();
  menu = [];

  constructor(private firestore: Firestore,
    private navCntrl: NavController) { }

  getStallInformation() {
    return collectionData(collection(this.firestore, 'Stall'));
  }

  async getMenuInformation() {
    const querySnapshot = await getDocs(query(collection(this.firestore, "Stall")));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
  }

  // async vendorAndStore(){
  //   // user id to get doc data
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   const vendorData = await getDoc(doc(this.db, 'User', user.uid));
  //   console.log(vendorData.data().stallId);

  //   const stallDetails = await getDocs(collection(this.db, 'Stall', vendorData.data().stallId, 'Menu'));

  //   stallDetails.forEach((doc) => {
  //     console.log(doc.id);
  //     let menuData = doc.data();
  //     let menuItems = { "foodId" : doc.id, "foodName" : menuData.foodName, "foodPrice": menuData.foodPrice , "foodDetails": menuData.foodDetails , "foodEstTime": menuData.foodEstTime}
  //     this.menu.push(menuItems);
  //   })
  // }

  async addItem(foodName, foodPrice, foodDescription, item_qty, stallId) {
    const data = {
      foodName: foodName,
      foodPrice: foodPrice,
      foodDetails: foodDescription,
      foodQuantity: item_qty,
      foodEstTime: 3
    }
    const docRef = await addDoc(collection(this.db, 'Stall', stallId, 'Menu'), data)
    return docRef
  }

  async updateItem(stallId, menuId, data) {
    await updateDoc(doc(this.db, "Stall", stallId, "Menu", menuId), data)
  }

  async deleteItem(stallId, menuId, data) {

  }
  async getMenuItem(stallId) {
    const querySnapshot = await getDocs(collection(this.db, "Stall", stallId, "Menu"));
    let MenuItem = []

    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let foodData = { "menuId": doc.id, "foodName": data.foodName, "foodDetails": data.foodDetails, "foodPrice": data.foodPrice, "foodEstTime": data.foodEstTime }
      MenuItem.push(foodData)
    })
    return MenuItem
  }

  async getMenuAddon(stallId, menuId) {
    const querySnapshot = await getDocs(collection(this.db, "Stall", stallId, "Menu", menuId, "Addon"));
    let MenuAddon = []

    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let foodData = { "addonId": doc.id, "title": data.title, "price": data.price }
      MenuAddon.push(foodData)
    })
    return MenuAddon
  }

  async addMenuAddon(stallId, menuId, data) {
    const docRef = await addDoc(collection(this.db, 'Stall', stallId, 'Menu', menuId, "Addon"), data)
    return docRef
  }

  async updateMenuAddon(stallId, menuId, addonId, data) {
    await updateDoc(doc(this.db, "Stall", stallId, "Menu", menuId, "Addon", addonId), data)
  }

  async deleteMenuAddon(stallId, menuId, addonId, data) {
    
  }
}
