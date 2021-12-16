import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore:Firestore) { }

  getUserInformation(){
    const usersRef = collection(this.firestore, 'User');
    return collectionData(usersRef);
  }


}
