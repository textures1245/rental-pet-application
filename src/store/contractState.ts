import { defineStore } from "pinia";
import { User, VIPUser } from "./userState";
import { useUserState } from "./userState";

export type ContractList = {
  user: User | VIPUser;
  contractDetail: ContractDetail;
};

export type ContractDetail = {};

export const useContractStore = defineStore("contractState", {
  state: () => ({
    contractList: <ContractList[]>[
      {
        user: useUserState().$state.users[0],
        contractDetail: {},
      },
    ],
  }),
  actions: {},
  getters: {
    getContractList: (state) => state.contractList,
  },
});
