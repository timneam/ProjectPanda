import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';
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

}
