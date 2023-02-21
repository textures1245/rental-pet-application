import { defineStore } from "pinia";

export type DrawerOptionValue =
  | "none"
  | "userInfo"
  | "userPet"
  | "contractList";

export type DrawerMenu = {
  prependIcon?: string;
  title: string;
  name: DrawerOptionValue | string;
  path: string;
};

export const usePathStore = defineStore("pathState", {
  state: () => ({
    userPaths: <DrawerMenu[]>[
      {
        prependIcon: "mdi-dog",
        title: "สัตว์เลื้ยงของฉัน",
        name: "userPet",
        path: "/my-pet-list",
      },
      {
        prependIcon: "mdi-account",
        title: "ข้อมูลบัญชี",
        name: "userInfo",
        path: "/account-info",
      },
    ],
    employeePaths: <DrawerMenu[]>[
      {
        prependIcon: "mdi-dog",
        title: "รายการยืนยันการเช่า",
        name: "userPet",
        path: "/my-pet-list",
      },
      {
        prependIcon: "mdi-account",
        title: "ข้อมูลบัญชี",
        name: "userInfo",
        path: "/account-info",
      },
      {
        prependIcon: "mdi-draw-pen",
        title: "รายการสัญญาการเช่า",
        name: "contractList",
        path: "/contract-list",
      },
    ],
    appUserPaths: <DrawerMenu[]>[
      {
        prependIcon: "mdi-home-heart",
        title: "หน้าหลัก",
        name: "dashboard",
        path: "/dashboard",
      },
      {
        prependIcon: "mdi-dog-side",
        title: "รายการสัตว์",
        name: "petList",
        path: "/pet-list",
      },
      {
        prependIcon: "mdi-file-sign",
        title: "ทำสัญญาการเช่า",
        name: "petContraction",
        path: "/contractor",
      },
    ],
    appEmployeePaths: <DrawerMenu[]>[
      {
        prependIcon: "mdi-home-heart",
        title: "หน้าหลัก",
        name: "dashboard",
        path: "/dashboard",
      },
      {
        prependIcon: "mdi-dog-side",
        title: "รายการสัตว์",
        name: "petList",
        path: "/pet-list",
      },
      {
        prependIcon: "mdi-calendar-clock",
        title: "เช็คตารางการเช่าสัตว์วันนี้",
        name: "checkSchedule",
        path: "/pet-schedule-checker",
      },
    ],
  }),
  getters: {
    getUserPaths: (state) => state.userPaths,
    getEmployeePaths: (state) => state.employeePaths,
    getAppUserPaths: (state) => state.appUserPaths,
    getAppEmployeePaths: (state) => state.appEmployeePaths,
  },
  actions: {},
});
