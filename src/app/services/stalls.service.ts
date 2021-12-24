import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc, where, query } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { documentId, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StallsService {

  db = getFirestore();

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
      console.log(doc.id, " => ", doc.data());
    });
  }

  async getOneStallInformation(id){
    const stallInformation = collection(this.firestore, 'Stall', id)
  }

  async getOneStallMenu(id, docid){
    const stallInformation = collection(this.firestore, 'Stall', id, 'Menu', docid)
  }

}
