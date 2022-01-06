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
export class OrderService {

  db = getFirestore();

  constructor() { }

    async getOrders(stallId, Orders){
      const getOrders = await getDocs(collection(this.db, 'Stall', stallId, Orders))
      return getOrders
    }

    async addOrderId(stallId) {
      const addOrders = await addDoc(collection(this.db, 'Stall', stallId, 'OrdersRecieved'), {
        orderName: '',
        orderedBy: ''
      })
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


}
