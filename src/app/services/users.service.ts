import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, updatePassword, signOut } from "firebase/auth";
import * as firebase from '@angular/fire'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { async } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  db = getFirestore();
  router: any;

  constructor(private firestore: Firestore,
    private navCntrl: NavController) { }

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

  updateUserProfile(firstName, lastName, email, password, phoneNumber) {
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
      }).then(() => {
        //update email 
        if (email.length != 0) {
          updateEmail(auth.currentUser, email).then((res) => {
            console.log("Updated Email")

            if (password.length != 0) {
              updatePassword(user, password).then((res) => {
                this.navCntrl.navigateForward('tabs/profile');
              }).catch((error) => {
                // An error ocurred
                console.log(error)
              });
            }
          }).catch((error) => {
            // An error occurred
            console.log(error)
          });
        }
      })
    }).catch((error) => {
      // An error occurred
      console.log(error)
    });
  }

  signoutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.navCntrl.navigateForward('/login-or-register');
      console.log("User has successfully logged out");
    }).catch((error) => {
      console.log(error);
    });
  }

}
