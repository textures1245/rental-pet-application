import { defineStore } from "pinia";

class Deliver {
  constructor(public name: string, public tel: string, public imgSrc: string) {}
}

export type PetCategory = "cat" | "dog" | "bunny" | "bird";

type PetSpecies = {
  species: PetCategory;
  breed: string;
};

type HealthyPet = {
  heathOrder: "healthy" | "unhealthy";
  lastChecked: Date;
  probDesc?: string;
};

export type Pet = {
  id: number;
  name: string;
  species: PetSpecies;
  gender: "male" | "female";
  healthy: HealthyPet;
  imgPic: string;
  timeLeft: number | null;
  rentalTime: number;
  deliveredStatus: {
    onDelivering: boolean;
    deliver: Deliver | null;
  };
  rentType: "Indoor" | "Outdoor";
};

export const usePetState = defineStore("petState", {
  state: () => ({
    pets: <Pet[]>[
      {
        id: 0,
        name: "Lily",
        species: {
          species: "cat",
          breed: "Abyssinian",
        },
        gender: "female",
        healthy: {
          heathOrder: "healthy",
          lastChecked: new Date("2022-12-15"),
        },
        imgPic:
          "https://upload.wikimedia.org/wikipedia/commons/9/9b/Gustav_chocolate.jpg",
        timeLeft: null,
        rentalTime: 60,
        deliveredStatus: {
          onDelivering: true,
          deliver: new Deliver(
            "Mac Miller",
            "032-2312-2132",
            "https://lh6.googleusercontent.com/-UYKv4Oo4AL4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reOcBoiruxfuiRHs8VAoE-HvgnBDw/mo/photo.jpg?sz=256"
          ),
        },
        rentType: "Outdoor",
      },
      {
        id: 1,
        name: "Pochita",
        species: {
          species: "dog",
          breed: "Airedale Terrier",
        },
        gender: "male",
        healthy: {
          heathOrder: "unhealthy",
          lastChecked: new Date("2023-1-15"),
          probDesc: "ขาถลอกทางด้านซ้ายบน",
        },
        imgPic:
          "https://images.unsplash.com/photo-1546491764-67a5b8d5b3ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        timeLeft: 58,
        rentalTime: 90,
        deliveredStatus: {
          onDelivering: false,
          deliver: null,
        },
        rentType: "Indoor",
      },
      {
        id: 2,
        name: "Pochita",
        species: {
          species: "dog",
          breed: "Airedale Terrier",
        },
        gender: "male",
        healthy: {
          heathOrder: "unhealthy",
          lastChecked: new Date("2023-1-15"),
          probDesc: "ขาถลอกทางด้านซ้ายบน",
        },
        imgPic:
          "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80",
        timeLeft: 58,
        rentalTime: 90,
        deliveredStatus: {
          onDelivering: false,
          deliver: null,
        },
        rentType: "Indoor",
      },
    ],
  }),
  getters: {
    getPets: (state) => state.pets,
  },
  actions: {},
});
