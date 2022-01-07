import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, where, query, getDoc, QuerySnapshot } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth } from 'firebase/auth';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class StallsService {

  db = getFirestore();

  constructor(private firestore: Firestore,
    private navCntrl: NavController,
    private userService: UsersService) { }

  getStallInformation() {
    return collectionData(collection(this.firestore, 'Stall'));
  }

  getAStallInformation(stallId) {
    return getDoc(doc(this.firestore, 'Stall', stallId));
  }

  async updateStallInformation(stallId, data){
    await updateDoc(doc(this.db, "Stall", stallId), data)
  }

  async getMenuInformation() {
    const querySnapshot = await getDocs(query(collection(this.firestore, "Stall")));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
  }

  async getOneMenuDetails(stallId, menuId) {

    const menu = await getDoc(doc(this.db, 'Stall', stallId, 'Menu', menuId));
    return menu;
  }

  async addItem(stallId, data) {
    const response = await addDoc(collection(this.db, 'Stall', stallId, 'Menu'), data)
    return response
  }

  async updateItem(stallId, menuId, data) {
    await updateDoc(doc(this.db, "Stall", stallId, "Menu", menuId), data)
    return "Updated Successfully"
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
    const response = await addDoc(collection(this.db, 'Stall', stallId, 'Menu', menuId, "Addon"), data)
    return response
  }

  async deleteMenuAddon(stallId, menuId, addonId) {
    await deleteDoc(doc(this.db, 'Stall', stallId, 'Menu', menuId, 'Addon', addonId))
    console.log("deleted : " + addonId)
  }
}
