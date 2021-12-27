import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, where, query, getDoc, QuerySnapshot } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { documentId, Firestore } from '@angular/fire/firestore';
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
    const stallRef = collection(this.firestore, 'Stall');
    return collectionData(stallRef);
  }

  async getMenuInformation() {
    const q = query(collection(this.firestore, "Stall"));

    const querySnapshot = await getDocs(q);
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

}
