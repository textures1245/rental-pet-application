<script lang="ts">
import { ref } from "vue";

export default {
  props: [],
  data() {
    return {
      userDrawer: {
        toggleOptionDrawer: ref(true),
      },
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      rail: true,
    };
  },
};
</script>
<template>
  <!--- Left -->
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent expand-on-hover>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home-city"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="My Account"
        value="account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="Users"
        value="users"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!--- Right -->
  <v-navigation-drawer location="right" elevation="6" >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
        ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        @click="
          () => (userDrawer.toggleOptionDrawer = !userDrawer.toggleOptionDrawer)
        "
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    location="right"
    :temporary="userDrawer.toggleOptionDrawer"
    rounded
  >
    <v-list>
      <v-list-item title="Home" value="home"></v-list-item>

      <v-list-item title="Contacts" value="contacts"></v-list-item>

      <v-list-item title="Settings" value="settings"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
