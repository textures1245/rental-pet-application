import { defineStore } from "pinia";
import { Pet, usePetState } from "./petState";
import { Ref, ref } from "vue";

type EmployeeRole = Admin;

type Admin = {
  type: "Admin";
  task: string[];
};

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
  petsOwning: Pet[];
  petsRequired: Pet[];
};

export type Employee = {
  id: number;
  adminId: string;
  name: string;
  gender: "male" | "female";
  citizenID: string;
  phoneNumber: string;
  email: string;
  imgPic: string;
  role: EmployeeRole;
  startDate: Date;
  endDate: Date;
  hiredSince: Date;
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
          petsOwning: usePetState().getPets.slice(0, 2),
          petsRequired: usePetState().getPets.slice(2, 4),
        },
      ],
      employees: <Employee[]>[
        {
          id: 0,
          adminId: randomId(10),
          name: "Bomm Lengend",
          gender: "male",
          citizenID: randomId(10),
          email: "boomlnwza007@gmail.com",
          phoneNumber: "1312312",
          imgPic: "https://randomuser.me/api/portraits/men/85.jpg",
          role: { task: [""], type: "Admin" } as Admin,
          startDate: new Date("2022-9-12"),
          endDate: new Date("2024-6-9"),
        },
      ],
      roleToggler: <Ref<"user" | "admin">>ref("user"),
    };
  },
  getters: {},
  actions: {
    getUserRoleByID(id: number): User | VIPUser | Employee {
      let getUserState: VIPUser | User | Employee = {} as any;
      if (this.$state.roleToggler === "user") {
        getUserState = <VIPUser | User>(
          this.$state.users.find((user) => user.id === id)
        );
      } else {
        getUserState = <Employee>this.$state.employees.find((e) => e.id === id);
      }

      if (getUserState) {
        return getUserState;
      } else {
        throw new Error("User state not found");
      }
    },
    setActorRole(role: "user" | "admin"): void {
      this.$state.roleToggler = role;
    },
  },
});
