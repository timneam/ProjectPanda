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

  async getOrders(stallId, Orders) {
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

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    return q
  }

  // find the document based on user ID
  async test(stallId, userId) {

    // Create a field search against a collection.

    const querySnapshot = await getDocs(query(collection(this.db, "Stall", stallId, "OrdersRecieved"), where("UserID", "==", userId)));

    let orderDetails = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      let orderData = { "OrderID": doc.id, "UserID": data.UserID, "UserFirstName": data.UserFirstName, "UserLastName": data.UserLastName, "UserPhoneNumber": data.UserPhoneNumber, "Status": data.Status }
      orderDetails.push(orderData)
    });
    return orderDetails
  }

  async getUserDetailsInOrder(stallId, orderId){
    
    const querySnapshot = await getDoc(doc(this.db, "Stall", stallId, "OrdersRecieved", orderId))

    if (querySnapshot.exists()) {
      let orderUserDetails = querySnapshot.data()
      return orderUserDetails
    } else {
      console.log("No such document!");
    }
  }

  async getOrderedItems(stallId, orderId){
    const querySnapshot = await getDocs(collection(this.db, "Stall", stallId, "OrdersRecieved", orderId, "orderList"));

    let orderDetails = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data())
      let data = doc.data()
      // let orderData = { "OrderID": doc.id, "foodName": data.foodName, "foodPrice": data.foodPrice, "foodQty": data.foodQty, "foodEstTime": data.foodEstTime, "foodDescription": data.foodDescription, "addOn": data.addon}
      orderDetails.push(data)
      console.log(orderDetails)
    });
    return orderDetails
  }

  // add orders into preparing orders collection (Orders Preparing)
  async declineOrders(stallId, orderId) {
    const addOrders = await updateDoc(doc(this.db, 'Stall', stallId, 'OrdersRecieved', orderId), {
      Status: "Cancelled"
    })
    return addOrders
  }

  // add orders into preparing orders collection (Orders Preparing)
  async acceptOrders(stallId, orderId) {
    const addOrders = await updateDoc(doc(this.db, 'Stall', stallId, 'OrdersRecieved', orderId), {
      Status: "Preparing"
    })
    return addOrders
  }

  // add orders into preparing orders collection (Orders Completed)
  async completedOrders(stallId, orderId) {
    const addOrders = await updateDoc(doc(this.db, 'Stall', stallId, 'OrdersRecieved', orderId), {
      Status: "Done"
    })
    return addOrders
  }


}
