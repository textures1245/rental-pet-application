<script lang="ts">
export default {
  props: [],
  setup() {
    return {};
  },
  emits: ["toggleUserDrawer"],
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
      <v-btn
        @click="$emit('toggleUserDrawer')"
        icon="mdi-account-badge-outline"
      ></v-btn>
    </template>
  </v-app-bar>
</template>
