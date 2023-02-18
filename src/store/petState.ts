import { defineStore } from "pinia";

class Deliver {
  constructor(public name: string, public tel: string, public imgSrc: string) {}
}

type PetSpecies = {
  species: "cat" | "dog";
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
          "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/02165956/Airedale-Terrier-standing-stacked-outdoors.jpg",
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
