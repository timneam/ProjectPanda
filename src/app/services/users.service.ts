import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import * as firebase from '@angular/fire'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  db = getFirestore();

  constructor(private firestore: Firestore) { }

  getUserInformation() {
    const usersRef = collection(this.firestore, 'User');
    return collectionData(usersRef);
  }

  loginUser(email, password) {
    console.log(email)
    console.log(password)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        console.log(user)
        // if successful, add to local storage, route to home page
        if (user.uid != null) {
          localStorage.setItem("token", user.uid)
        } else {
          console.log("Error Logging In!")
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }

  registerUser(firstName, lastName, email, password, reEnterPassword, phoneNumber) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log(userCredential);
        if ( userCredential.user.uid != null) {
          const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
          }
          const newUser = doc(this.db, "User", userCredential.user.uid);
          // Manually set Doc ID
          await setDoc(newUser, data);
        }
        else {
          console.log(" retry ");
        }
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
