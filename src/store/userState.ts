import { defineStore } from "pinia";
import { Pet, usePetState } from "./petState";
import { Ref, ref } from "vue";
import router from "../routes/appRoutes";
import { useAuthState } from "./authState";
import {
  Timestamp,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  firestoreDefaultConverter,
  globalFirestoreOptions,
  useCollection,
} from "vuefire";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";
//- auth provider
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

globalFirestoreOptions.converter = {
  // the default converter just returns the data: (data) => data
  toFirestore: firestoreDefaultConverter.toFirestore,
  fromFirestore: (snapshot, options) => {
    const data = firestoreDefaultConverter.fromFirestore(snapshot, options);
    // if the document doesn't exist, return null
    if (!data) return null;
    // add anything custom to the returned object
    data.metadata = snapshot.metadata;
    return data;
  },
};

export type EmployeeRole = Admin;

type Admin = {
  type: "Admin";
  task: string[];
};

export type User = {
  userId: string;
  memberId: string;
  citizenId: string;
  name: string;
  gender: "male" | "female" | "none";
  address: string;
  phoneNumber: string;
  email: string;
  imgPic: string;
  status: "member" | "vip";
  petsOwning: Pet[];
  petsRequired: Pet[];
};

export type Employee = {
  userId: string;
  employeeId: string;
  name: string;
  gender: "male" | "female" | "none";
  citizenId: string;
  phoneNumber: string;
  address: string;
  email: string;
  imgPic: string;
  role: EmployeeRole;
  startDate: Timestamp;
  endDate: Timestamp;
};

type VIPState = {
  subscriptionSince: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  creditEarned?: number;
};

export type VIPUser = User & VIPState;

export const randomId = function (length = 6): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const useUserState = defineStore("userState", {
  state: () => {
    return {
      users: <VIPUser[] | User[]>[],
      employees: <Employee[]>[],
      petUserRequires: [],
      roleToggler: <Ref<"user" | "admin">>ref("user"),
    };
  },
  getters: {},
  actions: {
    // getUserRoleByID(userId: string): User | VIPUser | Employee {
    //   let getUserState: VIPUser | User | Employee = {} as any;
    //   if (this.$state.roleToggler === "user") {
    //     getUserState = <VIPUser | User>(
    //       this.$state.users.find((user) => user.userId === userId)
    //     );
    //   } else {
    //     getUserState = <Employee>(
    //       this.$state.employees.find((e) => e.userId === userId)
    //     );
    //   }

    //   if (getUserState) {
    //     return getUserState;
    //   } else {
    //     throw new Error("User state not found");
    //   }
    // },

    setActorRole(role: "user" | "admin"): void {
      this.$state.roleToggler = role;
      router.push("/dashboard");
    },

    pushUser(userData: VIPUser | Employee, pushOn: "User" | "Employee") {
      if (pushOn === "User") {
        let user = <VIPUser>userData;
        this.$state.users.push(user);
        this.setActorRole("user");
      } else {
        let employee = <Employee>userData;
        this.$state.employees.push(employee);
        this.setActorRole("admin");
      }
    },

    async pushUserPetRequired(petData: Pet) {
      return useCollection<VIPUser>(collection(db, "User"), {
        wait: true,
      }).promise.value.then((docs) => {
        const userWhoRequiredPet = docs.find(
          (user) => user.userId === useAuthState().currAccount.userId
        )!;
        userWhoRequiredPet.petsRequired.push(petData);
        setDoc(doc(db, "User", userWhoRequiredPet.id), userWhoRequiredPet).then(
          () => {
            console.log("You had sent pet required to employee now ");
            this.users[0].petsRequired.push(petData);
          }
        );
      });
    },

    clearUserStates() {
      (this.users = <VIPUser[] | User[]>[]), (this.employees = <Employee[]>[]);
    },

    async pushUserPetOwing(petData: Pet, sendToUser: VIPUser) {
      return useCollection<VIPUser>(collection(db, "User"), {
        wait: true,
      }).promise.value.then((docs) => {
        const userWhoRequiredPet = docs.find(
          (user) => user.userId === sendToUser.userId
        )!;
        let petTargetIndex = userWhoRequiredPet.petsRequired.findIndex(
          (pet) => pet.id === petData.id
        );
        userWhoRequiredPet.petsOwning.push(petData);
        userWhoRequiredPet.petsRequired.splice(petTargetIndex, 1);
        console.log(userWhoRequiredPet);
        setDoc(doc(db, "User", userWhoRequiredPet.id), userWhoRequiredPet).then(
          () => {
            console.log(
              `You had accept pet requested from member: name${sendToUser.name} Id: ${sendToUser.userId}}`
            );
          }
        );
        //- return to pet index to update array to another component (UserPetListComponent)
        return petTargetIndex;
      });
    },
  },
});

// <VIPUser>{
//     userId: "0",
//     memberId: randomId(10),
//     citizenId: randomId(10),
//     name: "Sandra Adams",
//     gender: "female",
//     address: "San Andreas Local Street 27/4, New York, NY",
//     email: "sandra_a88@gmailcom",
//     imgPic:
//       "https://media.istockphoto.com/id/1332100919/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B8%94%E0%B9%8D%E0%B8%B2-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5.jpg?s=612x612&w=0&k=20&c=q_eavB1Cp5Y3PUwaiNhurebHOjp1UgnqqNdmc1zYWTQ=",
//     phoneNumber: "0654209589",
//     status: "vip",
//     subscriptionSince: Timestamp.now(),
//     startDate: Timestamp.now(),
//     endDate: Timestamp.now(),
//     creditEarned: 232,
//     petsOwning: [],
//     petsRequired: [],
//   },
//   {
//     userId: "0",
//     employeeId: randomId(10),
//     name: "Cjxhdudbdh Djdheudndj",
//     gender: "male",
//     citizenId: randomId(10),
//     address: "Vaneeva Ul., bld. 26, appt. 7",
//     email: "natchanuu5661@gmail.com",
//     phoneNumber: "0651281492",
//     imgPic:
//       "https://media.istockphoto.com/id/1332100919/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%8A%E0%B8%B2%E0%B8%A2-%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B8%94%E0%B9%8D%E0%B8%B2-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5.jpg?s=612x612&w=0&k=20&c=q_eavB1Cp5Y3PUwaiNhurebHOjp1UgnqqNdmc1zYWTQ=",
//     role: { task: [""], type: "Admin" } as Admin,
//     startDate: Timestamp.now(),
//     endDate: Timestamp.now(),
//   },
