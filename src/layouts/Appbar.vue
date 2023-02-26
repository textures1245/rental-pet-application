<script lang="ts">
import { ref } from "vue";
import { useUserState } from "../store/userState";
import Swal from "sweetalert2";
import { useAuthState } from "../store/authState";
export default {
  props: [],
  setup() {
    return {
      onSwappedRoleAlert: () =>
        Swal.fire({
          icon: "success",
          title: `Actor ของคุณอยู่ในสถานะ ${
            useUserState().$state.roleToggler
          } ในตอนนี้`,
        }),
    };
  },
  data() {
    return {
      userState: useUserState(),
    };
  },
  emits: ["toggleUserDrawer"],
  methods: {
    onSwapRoleActor() {
      this.userState.roleToggler == "user"
        ? this.userState.setActorRole("admin")
        : this.userState.setActorRole("user");
      this.onSwappedRoleAlert();
    },

    async onLogout() {
      this.userState.clearUserStates();
      await useAuthState().onSignOut();
    },
  },
};
</script>
<template>
  <v-system-bar class="!bg-secondary-content">
    <div class="flex gap-2">
      <span class="font-semibold">{{
        userState.roleToggler === "user"
          ? 'ตอนนี้คุณอยู่ในสถานะ "ลูกค้า VIP"'
          : 'ตอนนี้คุณอยู่ในสถานะ "Admin'
      }}</span>
      <v-icon icon="mdi-paw"></v-icon>
    </div>
    <v-spacer></v-spacer>

    <span class="ms-2">3:13PM</span>
  </v-system-bar>
  <v-app-bar class="!bg-base-100">
    <template v-slot:prepend>
      <v-avatar sizes="32">
        <v-img
          sizes="32"
          src="https://img.freepik.com/free-vector/cute-dog-cute-cat-cartoon-illustration_138676-3219.jpg?w=826&t=st=1677001698~exp=1677002298~hmac=7e13f71990220d50070d41e58467ca306d2bc8cc4186628bb539241ca29df8e6"
        ></v-img>
      </v-avatar>
    </template>

    <v-app-bar-title class="font-[500]">Rental Pet</v-app-bar-title>

    <template v-slot:append>
      <!-- <p>สลับ Actor</p> -->
      <!-- <v-btn @click="() => onSwapRoleActor()" icon="mdi-account-convert">
      </v-btn> -->
      <p class="text-sm">ออกจากระบบ</p>
      <v-btn @click="() => onLogout()" icon="mdi-logout"> </v-btn>
    </template>
  </v-app-bar>
</template>
