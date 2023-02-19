<script lang="ts">
export default {
  data() {
    return {
      theme: ["fantasy", "forest"],
    };
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
    <v-layout :data-theme="theme[0]">
      <AppBar></AppBar>
      <Drawer></Drawer>
      <v-main class="h-full">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
