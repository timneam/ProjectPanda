import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth } from "firebase/auth";
import * as firebase from '@angular/fire'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  db = getFirestore();
  router: any;

  auth = getAuth();
  user = this.auth.currentUser;

  constructor(private firestore: Firestore) { }

  // Get all stalls in the cart collection (cart -> stalls)
  async getAllStallsCart(userId) {
    const querySnapshot = await getDocs(collection(this.db, 'User', userId, 'Cart'))
    let stallList = [];
    querySnapshot.forEach((doc) => {
      let stallData = doc.id;
      stallList.push(stallData)
    })
    return stallList
  }

  // create cart for a stall (cart -> stall -> menuList)
  async createCartForAStall(userId, stallId, data) {
    const addStallCart = await setDoc(doc(this.db, 'User', userId, 'Cart', stallId), data)
  }

  // get Items in cart ( cart -> stall -> menuList -> documents )
  async getItemsInACart(userId, stallId) {
    const querySnapshot = await getDocs(collection(this.db, 'User', userId, 'Cart', stallId, 'menuList'))
    let cartItems = [];
    querySnapshot.forEach((doc) => {
      let items = { "id": doc.id, "foodName": doc.data().foodName, "foodPrice": doc.data().foodPrice, "foodDescription": doc.data().foodDescription, "foodEstTime": doc.data().foodEstTime, "foodQty": doc.data().foodQty }
      cartItems.push(items)
    })
    return cartItems
  }

  // get Items in cart ( cart -> stall -> menuList -> documents )
  async getAddonForItem(userId, stallId, menuId) {
    const querySnapshot = await getDocs(collection(this.db, 'User', userId, 'Cart', stallId, 'menuList', menuId, 'Addon'))
    let addOnItems = [];
    querySnapshot.forEach((doc) => {
      let items = { "id": doc.id, "addOnTitle": doc.data().addOnTitle, "addOnPrice": doc.data().addOnPrice }
      addOnItems.push(items)
    })
    return addOnItems
  }

  // add items into a cart (cart -> stall -> menuList -> add a document)
  async setItemToCart(userId, stallId, menuId, data) {
    const addItemToCart = await setDoc(doc(this.db, 'User', userId, 'Cart', stallId, 'menuList', menuId), data)
    return addItemToCart
  }

  // add items into a cart (cart -> stall -> menuList -> addon -> add a document)
  async setItemAddonToCart(userId, stallId, menuId, addonId, data) {
    const addAddonToCart = await setDoc(doc(this.db, 'User', userId, 'Cart', stallId, 'menuList', menuId, 'Addon', addonId), data)
    return addAddonToCart
  }

  // remove items from a cart (cart -> stall -> menuList -> remove a document)
  async removeItemFromCart(userId, stallId, menuId) {
    const removeItemFromCart = await deleteDoc(doc(this.db, 'User', userId, 'Cart', stallId, 'menuList', menuId))
    console.log("deleted : " + menuId)
  }

}
