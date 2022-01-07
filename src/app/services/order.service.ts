import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth } from "firebase/auth";
import * as firebase from '@angular/fire'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  db = getFirestore();

  constructor() { }

    async getAllStallId() {
      const getStallId = await getDocs(collection(this.db, "Stall"))
      return getStallId
    }

    async getOrders(stallId, Orders){
      const getOrders = await getDocs(collection(this.db, 'Stall', stallId, Orders))
      return getOrders
    }

    async addOrderId(stallId, data) {
      const addOrders = await addDoc(collection(this.db, 'Stall', stallId, 'OrdersRecieved'), data)
      return addOrders
    }

    async addToOrders(stallId, orderId, menuId, data) {
      const addOrders = await setDoc(doc(this.db, 'Stall', stallId, 'OrdersRecieved', orderId, "orderList", menuId), data)
      return addOrders
    }

    async incomingOrders(stallId) {
      const incomingOrders = await getDocs(collection(this.db, 'Stall', stallId, 'OrdersRecieved'))
      return incomingOrders
    }
  
    // find the document based on user ID
    async getOrdersByUserID(stallId, userId) {

      // Create a field search against a collection.
      const q = query(collection(this.db, "Stall", stallId, "OrdersRecieved"), where("UserID", "==", userId));
      console.log(q)
      return q
    }

    // add orders into preparing orders collection (Orders Preparing)
    async acceptOrders(stallId, orderId, menuId, data) {
      const addOrders = await setDoc(doc(this.db, 'Stall', stallId, 'OrdersPreparing', orderId, "orderList", menuId), data)
      return addOrders
    }

    // add orders into preparing orders collection (Orders Completed)
    async completedOrders(stallId, orderId, menuId, data) {
      const addOrders = await setDoc(doc(this.db, 'Stall', stallId, 'OrdersCompleted', orderId, "orderList", menuId), data)
      return addOrders
    }


}
