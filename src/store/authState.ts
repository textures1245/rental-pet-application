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
import { getCurrentUser, useCollection, useCurrentUser } from "vuefire";
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
      currAccount: <VIPUser | Employee>{},
      userCollection: useCollection<VIPUser>(collection(db, "User"), {
        wait: true,
      }).promise,
      employeeCollection: useCollection<Employee>(collection(db, "Employee"), {
        wait: true,
      }).promise,
      isAuth: ref(false),
    };
  },
  getters: {},
  actions: {
    async onSaveAccountUserState(
      uid: string,
      userData: VIPUser | Employee,
      type: AccountType
    ) {
      return addDoc(collection(db, type), userData)
        .then((doc) => {
          console.log(`${type} added successfully on Id: ` + doc.id);
          console.log(`Data: ${doc}`);
        })
        .catch((err) => {
          throw new Error("Error when saving user state", err);
        });
    },

    async onGetAccountUserState(uid: string, type: AccountType) {
      const userData = await useCollection<Employee | VIPUser>(
        collection(db, type),
        {
          wait: true,
        }
      ).promise.value.then((userDocs) => {
        return userDocs.find((user) => user.userId === uid);
      });
      if (userData) {
        return <VIPUser | Employee>userData;
      } else {
        throw new Error(`Could not find User with ID ${uid}`);
      }
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
              this.$state.currAccount = userData;
              useUserState().pushUser(userData, "User");
              this.$state.isAuth = true;
            });
          } else {
            let employeeData = <Employee>{ ...data, userId: userUID };
            this.onSaveAccountUserState(userUID, employeeData, type).then(
              () => {
                console.log("Signed up as Employee");
                this.$state.currAccount = employeeData;
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

    async onSignIn(email: string, pwd: string, type: AccountType) {
      const isAuth = signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
          // Signed in
          const userUID = userCredential.user.uid;
          this.onGetAccountUserState(userUID, type).then((docRes) => {
            const userData = docRes;
            this.$state.currAccount = userData;
            console.log(userData);
            type === "User"
              ? useUserState().pushUser(userData, "User")
              : useUserState().pushUser(userData, "Employee");
            this.$state.isAuth = true;
          });
          return true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.$state.isAuth = false;
          console.error("ERROR: CODE" + errorCode + ": " + errorMessage);
          return false;
        })!;
      return isAuth;
    },

    async onSignOut() {
      return signOut(auth)
        .then(() => {
          this.$state.isAuth = false;
          this.$state.currAccount = <Employee | VIPUser>{};
          router.push("/sign-in");
        })
        .catch((error) => {
          console.error("Something wrong, logout got rejected", error);
        });
    },

    async loadedCurrentUser() {
      const user = await getCurrentUser();
      if (user) {
        useCollection<VIPUser>(collection(db, "User"), {
          wait: true,
        }).promise.value.then((userDocs) => {
          let userData = userDocs.find((u) => u.userId === user.uid);
          if (userData) {
            this.$state.currAccount = userData;
            console.log(userData);
            return useUserState().pushUser(userData, "User");
          }
        });
        useCollection<Employee>(collection(db, "Employee"), {
          wait: true,
        }).promise.value.then((employeeDocs) => {
          let employeeData = employeeDocs.find((d) => d.userId === user.uid);
          if (employeeData) {
            this.$state.currAccount = employeeData;
            console.log(employeeData);
            return useUserState().pushUser(employeeData, "Employee");
          }
        });
      }
      return user;
    },
  },
});
