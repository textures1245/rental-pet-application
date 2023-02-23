import { defineStore } from "pinia";
import { Pet, usePetState } from "./petState";
import { Ref, ref } from "vue";
import router from "../routes/appRoutes";

type EmployeeRole = Admin;

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
  startDate: Date;
  endDate: Date;
};

type VIPState = {
  subscriptionSince: Date;
  startDate: Date;
  endDate: Date;
  creditEarned?: number;
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
          userId: "0",
          memberId: randomId(10),
          citizenId: randomId(10),
          name: "Sandra Adams",
          gender: "female",
          address: "San Andreas Local Street 27/4, New York, NY",
          email: "sandra_a88@gmailcom",
          imgPic: "https://randomuser.me/api/portraits/women/85.jpg",
          phoneNumber: "0654209589",
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
          userId: "0",
          employeeId: randomId(10),
          name: "Cjxhdudbdh Djdheudndj",
          gender: "male",
          citizenId: randomId(10),
          address: "Vaneeva Ul., bld. 26, appt. 7",
          email: "natchanuu5661@gmail.com",
          phoneNumber: "0651281492",
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
    getUserRoleByID(userId: string): User | VIPUser | Employee {
      let getUserState: VIPUser | User | Employee = {} as any;
      if (this.$state.roleToggler === "user") {
        getUserState = <VIPUser | User>(
          this.$state.users.find((user) => user.userId === userId)
        );
      } else {
        getUserState = <Employee>(
          this.$state.employees.find((e) => e.userId === userId)
        );
      }

      if (getUserState) {
        return getUserState;
      } else {
        throw new Error("User state not found");
      }
    },

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
  },
});
