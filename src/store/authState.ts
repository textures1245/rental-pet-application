import { defineStore } from "pinia";
import { Employee, User, VIPUser, useUserState } from "./userState";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";

import { collection, addDoc } from "firebase/firestore";
import router from "../routes/appRoutes";

//- auth provider
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export type Account = {
  id: string;
  email: string;
  password: string;
  accountDetail: AccountDetail;
  type: AccountType;
};

export type AccountDetail = {
  name: string;
  citizenId: string;
  memberId: string;
  gender: string;
  address: string;
  phoneNumber: string;
  imgPic: string;
};

export type AccountType = "User" | "Employee";

export const useAuthState = defineStore("authState", {
  state: () => {
    return {
      currAccount: <Account>{},
      isAuth: ref(false),
    };
  },
  getters: {},
  actions: {
    onSaveAccountUserState(
      uid: string,
      userData: VIPUser | Employee,
      type: AccountType
    ): Promise<any> {
      return new Promise((resolve, reject) => {
        resolve(() => {
          addDoc(collection(db, type), userData).then((doc) => {
            console.log(`${type} added successfully on Id: ` + doc.id);
          });
        });
        reject((err: any) => {
          throw new Error("Error when saving user state", err);
        });
      });
    },

    async onGetAccountUserState(uid: string, type: AccountType) {
      const querySnapshot = await getDocs(collection(db, type));
      console.log(querySnapshot.docs.find((user) => user.data().uid === uid));
      return querySnapshot.docs.find((user) => user.data().uid === uid);
    },

    async onSignupWithUserDetail(
      email: string,
      password: string,
      type: AccountType,
      data: VIPUser | Employee
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //- if user credentials are signed up, push userData on userState then redirect to /dashboard
          const userUID = userCredential.user.uid;
          if (type === "User") {
            let userData = <VIPUser>{ ...data, userId: userUID };
            this.onSaveAccountUserState(userUID, userData, type).then(() => {
              console.log("Signed up as VIP USER");
              useUserState().pushUser(userData, "User");
              this.$state.isAuth = true;
            });
          } else {
            let employeeData = <Employee>{ ...data, userId: userUID };
            this.onSaveAccountUserState(userUID, employeeData, type).then(
              () => {
                console.log("Signed up as Employee");
                useUserState().pushUser(employeeData, "Employee");
                this.$state.isAuth = true;
              }
            );
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$state.isAuth = false;
          console.error("ERROR: CODE" + errorCode + ": " + errorMessage);
        });
    },

    onSignIn(email: string, pwd: string, type: AccountType) {
      signInWithEmailAndPassword(auth, email, pwd)
        .then(async (userCredential) => {
          // Signed in
          const userUID = userCredential.user.uid;
          const docRes = await this.onGetAccountUserState(userUID, type);
          if (docRes) {
            const userData = <VIPUser | Employee>docRes.data();
            type === "User"
              ? useUserState().pushUser(userData, "User")
              : useUserState().pushUser(userData, "Employee");
            this.$state.isAuth = true;
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$state.isAuth = false;
          console.error("ERROR: CODE" + errorCode + ": " + errorMessage);
        });
    },

    async onSignOut() {
      signOut(auth)
        .then(() => {
          this.$state.isAuth = false;
          router.push("/sign-in");
        })
        .catch((error) => {
          console.error("Something wrong, logout got rejected", error);
        });
    },
  },
});
