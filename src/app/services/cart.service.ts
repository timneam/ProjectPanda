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
  router:any;

  constructor(private firestore:Firestore) { }

  createCartForAStall(){
    
  }

  getAllStallsCart(){

  }

  getItemInCart(){

  }

  addItemToCart(){

  }

  removeItemFromCart(){

  }


}
