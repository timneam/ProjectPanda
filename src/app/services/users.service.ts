import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import * as firebase from '@angular/fire'




@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  getUserInformation() {
    const usersRef = collection(this.firestore, 'User');
    return collectionData(usersRef);
  }

  login(email, password) {

  }

  // broken

  loginUser(email, password) {
    console.log(email)
    console.log(password)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // Route if successful

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }

  // working lmao

  registerUser(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // Route if successful

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }

  signoutUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

}
