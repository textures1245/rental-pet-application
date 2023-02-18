import { defineStore } from "pinia";

export type User = {
  id: number;
  memberId: string;
  citizenId: string;
  name: string;
  gender: "male" | "female";
  address: string;
  phoneNumber: string;
  email: string;
  imgPic: string;
  status: "member" | "vip";
};

type VIPState = {
  subscriptionSince: Date;
  startDate: Date;
  endDate: Date;
  creditEarned: number;
};

export type VIPUser = User & VIPState;

const randomId = function (length = 6): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const useUserState = defineStore("userState", {
  state: () => {
    return {
      users: <VIPUser[] | User[]>[
        <VIPUser>{
          id: 0,
          memberId: randomId(10),
          citizenId: randomId(10),
          name: "Sandra Adams",
          gender: "female",
          address: "San Andreas Local Street 27/4, New York, NY",
          email: "sandra_a88@gmailcom",
          imgPic: "https://randomuser.me/api/portraits/women/85.jpg",
          phoneNumber: "1312312",
          status: "vip",
          subscriptionSince: new Date("2022-9-1"),
          startDate: new Date("2023-1-1"),
          endDate: new Date("2023-2-1"),
          creditEarned: 232,
        },
      ],
    };
  },
  getters: {},
  actions: {
    getUserByID(id: number): User | VIPUser {
      const user = this.$state.users.find((user) => user.id === id);
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    },
  },
});
