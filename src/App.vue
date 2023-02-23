<script lang="ts">
import { ref, nextTick, watch } from "vue";
import { useUserState } from "./store/userState";
import { useAuthState } from "./store/authState";

export default {
  data() {
    watch(useUserState().$state, (newVal) => {
      if (newVal) {
        this.reRenderComponent();
      }
    });

    return {
      isRenderCMP: ref(true),
      theme: ["fantasy", "forest"],
      isAuth: useAuthState().$state.isAuth,
    };
  },
  methods: {
    async reRenderComponent() {
      this.isRenderCMP = false;
      nextTick().then(() => {
        this.isRenderCMP = true;
      });
    },
  },
};
</script>
<script setup lang="ts">
import Drawer from "./layouts/Drawer.vue";
import AppBar from "./layouts/Appbar.vue";
import Dashboard from "./features/Dashborad.vue";
import BackgroundOverlay from "./components/BackgroundOverlay.vue";
</script>

<template>
  <v-app class="overflow-y-auto thai-font eng-font">
    <div
      v-if="!isAuth"
      class="bg-base-100 h-screen flex justify-center w-full items-center"
    >
      <router-view></router-view>
    </div>
    <v-layout v-else :data-theme="theme[0]">
      <AppBar></AppBar>
      <Drawer v-if="isRenderCMP"></Drawer>
      <v-main class="h-full w-full">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
