import { Timestamp } from "firebase/firestore";
import { defineStore } from "pinia";

import { getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.config";

import { collection, addDoc, deleteDoc } from "firebase/firestore";
import {
  getCurrentUser,
  globalFirestoreOptions,
  useCollection,
  useCurrentUser,
} from "vuefire";

import { firestoreDefaultConverter } from "vuefire";
import { ref } from "vue";

import { doc, setDoc } from "firebase/firestore";

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

//- auth provider
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Deliver {
  constructor(public name: string, public tel: string, public imgSrc: string) {}
}

export type PetCategory = "cat" | "dog" | "bunny" | "bird" | null;

export type PetSpecies = {
  species: PetCategory;
  breed: string;
};

export type HealthyPet = {
  heathOrder: "healthy" | "unhealthy" | null;
  lastChecked: Timestamp;
  probDesc?: string;
};

export type Pet = {
  id: string;
  name: string;
  species: PetSpecies;
  gender: "male" | "female" | null;
  healthy: HealthyPet;
  imgPic: string;
  timeLeft: number | null;
  rentalTime: number;
  deliveredStatus: {
    onDelivering: boolean;
    deliver: Deliver | null;
  };
  rentType: "Indoor" | "Outdoor" | null;
};

export const usePetState = defineStore("petState", {
  state: () => ({
    pets: <Pet[]>[],
    firstInitials: ref(true),
  }),
  getters: {
    getPets: async (state) => state.pets,
  },
  actions: {
    async fetchPetsFromFirebase() {
      let fetchedPets: Pet[] = [];
      await useCollection<Pet[]>(collection(db, "Pets"), {
        wait: true,
      }).promise.value.then((petStates) => {
        fetchedPets = <Pet[]>petStates.map((petState: Pet | any) => {
          return { ...petState, id: petState.id };
        });
        this.pets = fetchedPets;
        console.log(this.pets);
      });
      return fetchedPets;
    },

    firstInitialsPetState() {
      if (this.$state.firstInitials) {
        this.fetchPetsFromFirebase().then(() => {
          console.log("Fetched");
          this.firstInitials = false;
        });
      }
    },

    async addPetAction(petData: Pet) {
      return addDoc(collection(db, "Pets"), petData)
        .then((doc) => {
          console.log(`Pet Action added successfully on Id: ` + doc.id);
          console.log(`Data: ${doc}`);
          this.pets.push({ ...petData, id: doc.id });
        })
        .catch((err) => {
          throw new Error("Error when saving user state", err);
        });
    },

    async editPetAction(petId: string, newPetData: Pet) {
      const petIndex = this.pets.findIndex((pet) => pet.id === petId);

      return setDoc(doc(db, "Pets", petId), newPetData).then(() => {
        this.pets[petIndex] = { ...newPetData, id: petId };
        console.log(`Edit state on docs Id ${petId}, index: ${petIndex}`);
      });
    },

    async deletePeteAction(petId: string) {
      return deleteDoc(doc(db, "Pets", petId)).then(() => {
        const petIndex = this.pets.findIndex((pet) => pet.id === petId);
        this.pets.splice(petIndex, 1);
        console.log("delete Item on ID: " + petId);
      });
    },
  },
});

// {
//   id: 0,
//   name: "Lily",
//   species: {
//     species: "cat",
//     breed: "Abyssinian",
//   },
//   gender: "female",
//   healthy: {
//     heathOrder: "healthy",
//     lastChecked: Timestamp.now(),
//   },
//   imgPic:
//     "https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg",
//   timeLeft: 58,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: false,
//     delivered: null,
//   },
//   rentType: "Outdoor",
// },
// {
//   id: 1,
//   name: "Pochita",
//   species: {
//     species: "dog",
//     breed: "Airedale Terrier",
//   },
//   gender: "male",
//   healthy: {
//     heathOrder: "unhealthy",
//     lastChecked: Timestamp.now(),
//     probDesc: "ขาถลอกทางด้านซ้ายบน",
//   },
//   imgPic:
//     "https://images.unsplash.com/photo-1546491764-67a5b8d5b3ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   timeLeft: null,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: true,
//     deliver: new Deliver(
//       "Mac Miller",
//       "032-2312-2132",
//       "https://lh6.googleusercontent.com/-UYKv4Oo4AL4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reOcBoiruxfuiRHs8VAoE-HvgnBDw/mo/photo.jpg?sz=256"
//     ),
//   },
//   rentType: "Indoor",
// },
// {
//   id: 2,
//   name: "Pochita",
//   species: {
//     species: "dog",
//     breed: "Airedale Terrier",
//   },
//   gender: "male",
//   healthy: {
//     heathOrder: "unhealthy",
//     lastChecked: Timestamp.now(),
//     probDesc: "ขาถลอกทางด้านซ้ายบน",
//   },
//   imgPic:
//     "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80",
//   timeLeft: 58,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: false,
//     deliver: null,
//   },
//   rentType: "Indoor",
// },
// {
//   id: 3,
//   name: "Swaeth",
//   species: {
//     species: "bunny",
//     breed: "Holland Lop",
//   },
//   gender: "male",
//   healthy: {
//     heathOrder: "healthy",
//     lastChecked: Timestamp.now(),
//   },
//   imgPic:
//     "https://cdn-fastly.petguide.com/media/2022/02/16/8257249/holland-lop.jpg?size=720x845&nocrop=1",
//   timeLeft: 58,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: false,
//     deliver: null,
//   },
//   rentType: "Indoor",
// },
// {
//   id: 4,
//   name: "Lovely",
//   species: {
//     species: "bunny",
//     breed: "Dutch",
//   },
//   gender: "female",
//   healthy: {
//     heathOrder: "healthy",
//     lastChecked: Timestamp.now(),
//   },
//   imgPic:
//     "https://homeandroost.co.uk/wp-content/uploads/2021/12/D188EFAF-137B-48AD-8E73-097BB23EC40D-1024x778-1.jpeg",
//   timeLeft: 58,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: false,
//     deliver: null,
//   },
//   rentType: "Indoor",
// },
// {
//   id: 5,
//   name: "Eakie",
//   species: {
//     species: "bird",
//     breed: "Alexandrine Parakeet",
//   },
//   gender: "female",
//   healthy: {
//     heathOrder: "healthy",
//     lastChecked: Timestamp.now(),
//   },
//   imgPic:
//     "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Alexandrine-Parakeet-100x100.jpg",
//   timeLeft: 58,
//   rentalTime: 90,
//   deliveredStatus: {
//     onDelivering: false,
//     deliver: null,
//   },
//   rentType: "Indoor",
// },
