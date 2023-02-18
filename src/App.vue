<script lang="ts">
export default {
  data() {
    return {
      openMenuDrawer: ref(true),
      theme: ["fantasy", "forest"],
    };
  },
  watch: {
    openMenuDrawer(val) {
      if (val) {
        console.log(val);
      }
    },
  },
  emits: ["toggleUserDrawer"],
};
</script>
<script setup lang="ts">
import Drawer from "./layouts/Drawer.vue";
import AppBar from "./layouts/Appbar.vue";
import Card from "./components/Card.vue";
import Dashboard from "./features/Dashborad.vue";
import { ref } from "vue";
</script>

<template>
  <v-app class="overflow-y-auto thai-font eng-font">
    <v-layout :data-theme="theme[0]">
      <AppBar
        @toggle-user-drawer="() => (openMenuDrawer = !openMenuDrawer)"
      ></AppBar>
      <Drawer :set-menu-drawer="openMenuDrawer"></Drawer>
      <v-main class="h-full">
        <v-container>
          <Dashboard></Dashboard>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
