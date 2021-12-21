import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import * as firebase from '@angular/fire'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { async } from '@angular/core/testing';

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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // if successful, add to local storage, route to home page
        // if (user.uid != null) {
        //   localStorage.setItem("token", user.uid)
        // } else {
        //   console.log("Error Logging In!")
        // }

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
        if (userCredential.user.uid != null) {
          const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
          }
          const newUser = doc(this.db, "User", userCredential.user.uid);
          // Manually set Doc ID
          await setDoc(newUser, data);

          const username = `${firstName}${lastName}`
          console.log(username)
          updateProfile(auth.currentUser, {
            displayName: username, photoURL: "https://emoji.gg/assets/emoji/8858-pepekek.png"
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });

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

  updateUserProfile(firstName, lastName, email, password, phoneNumber) {
    const auth = getAuth();
    const user = auth.currentUser;
    const username = `${firstName}${lastName}`
    updateProfile(auth.currentUser, {
      displayName: username
    }).then(async (userCredential) => {
      // Profile updated!
      // update email, phone number, password
      // Signed in 
      const updateThis = doc(this.db, 'User', user.uid)
      await updateDoc(updateThis , {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber
      })  
        console.log(userCredential)
    }).catch((error) => {
      // An error occurred
      // ...
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
