import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateEmail, updatePassword, signOut, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { async } from '@angular/core/testing';
import {  NavController, NavParams, ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  db = getFirestore();
  auth = getAuth();

  constructor(private firestore: Firestore,
    private navCntrl: NavController,
    private location: Location,
    private router: Router,
    private toastCtrl: ToastController,) { }

  getUserInformation() {
    const usersRef = collection(this.firestore, 'User');
    return collectionData(usersRef);
  }

  loginUser(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user.uid;
        // Signed in 
        // console.log(user);            
        if (user != null) {
          const userData = await getDoc(doc(this.db, 'User', user));
          // console.log(userData.data());
          const userRole = userData.data();
          // console.log(userRole.role)
          if (userRole.role == 'User') {
            this.navCntrl.navigateForward('tabs/stalls');
          } else {
            this.navCntrl.navigateForward('vendor-tabs/home');
          }
        } else {
          console.log("Try Again!")
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        if(error.code === "auth/user-not-found") {
          //alert
          this.toastCtrl.create({
            message: 'User does not exist',
            duration: 2000,
            position: 'bottom'
          }).then(alert=> alert.present());
        }

        if(error.code =="auth/wrong-password") {
          // ToastController.name 
          this.toastCtrl.create({
           message: 'Password is invalid',
           duration: 2000,
           position: 'bottom'
         }).then(alert=> alert.present());
         }
      });
     
  }

  registerUser(firstName, lastName, email, password, reEnterPassword, phoneNumber, role) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if (userCredential.user.uid != null) {
          const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            role: role
          }
          const newUser = doc(this.db, "User", userCredential.user.uid);
          // Manually set Doc ID
          await setDoc(newUser, data);

          const username = `${firstName}${lastName}`
          console.log(username)
          updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            sendEmailVerification(auth.currentUser)
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

  async singtelStaffRegister(staffName, staffId) {
    const auth = getAuth(); //get current user
    const user = auth.currentUser; // user is this user
    if (user != null) {
      const data = {
        staffName: staffName,
        staffId: staffId
      }
      const putData = doc(this.db, 'User', user.uid)
      await updateDoc(putData, data).then(() => {
        console.log("Successfully added staffs details!");
        this.navCntrl.navigateForward('tabs/stalls');
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  updateUserProfile(firstName, lastName, phoneNumber) {
    const auth = getAuth();
    const user = auth.currentUser;
    const username = `${firstName}${lastName}`
    updateProfile(auth.currentUser, {
      displayName: username
    }).then(async () => {
      // update user Document
      const updateThis = doc(this.db, 'User', user.uid)
      await updateDoc(updateThis, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      })
      this.location.back();
    }).catch((error) => {
      // An error occurred
      console.log(error)
    });
  }

  updateUserEmail(email) {
    const auth = getAuth();
    const user = auth.currentUser;
    updateEmail(user, email).then(() => {
      console.log("Email updated successfully!")
      this.location.back();
    }).catch((error) => {
      // An error occurred
      console.log(error)
    });
  }

  updateUserPassword(password) {
    const auth = getAuth();
    const user = auth.currentUser;

    updatePassword(user, password).then(() => {
      console.log("Password updated successfully!")
      this.location.back();
    }).catch((error) => {
      // An error ocurred
      console.log(error)
    });
  }


  signoutUser() {
    const auth = getAuth();
    signOut(auth).then((res) => {
      this.navCntrl.navigateForward('/login-or-register');
      console.log("User has successfully logged out");
    }).catch((error) => {
      console.log(error);
    });
  }

  passwordReset(email) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Reset password email has been sent!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error)
    });
  }

}
