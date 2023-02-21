<script lang="ts">
import { ref } from "vue";
import { useUserState } from "../store/userState";
import Swal from "sweetalert2";
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
      actorRole: ref(useUserState().$state.roleToggler),
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
  },
};
</script>
<template>
  <v-system-bar class="!bg-secondary-content">
    <div class="flex gap-2">
      <span class="font-semibold">Welcome back master!</span>
      <v-icon icon="mdi-paw"></v-icon>
    </div>
    <v-spacer></v-spacer>

    <span class="ms-2">3:13PM</span>
  </v-system-bar>
  <v-app-bar class="!bg-base-100">
    <template v-slot:prepend>
      <v-app-bar-nav-icon icon="mdi-menu-swap-outline"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title class="font-[500]">Rental Pet</v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="() => onSwapRoleActor()" icon="mdi-account-convert"> </v-btn>
    </template>
  </v-app-bar>
</template>
