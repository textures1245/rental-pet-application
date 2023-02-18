<script lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useUserState } from "../store/userState";
import UserInfo from "../features/UserInfo.vue";
import UserPetList from "../features/UserPetList.vue";

export type DrawerMenu = {
  prependIcon?: string;
  title: string;
  value?: string;
  link?: string;
};

export default {
  components: { UserInfo, UserPetList },
  props: {
    setMenuDrawer: Boolean,
  },
  setup() {
    const userMenu = <DrawerMenu[]>[
      {
        prependIcon: "mdi-dog",
        title: "สัตว์เลื้ยงของฉัน",
        value: "myPet",
        link: "my-pet-list",
      },
      {
        prependIcon: "mdi-account",
        title: "ข้อมูลบัญชี",
        value: "accountInfo",
        link: "account-info",
      },
    ];

    const mainDrawer = <DrawerMenu[]>[
      {
        prependIcon: "mdi-dog-side",
        title: "รายการสัตว์",
        value: "petList",
        link: "/rental",
      },
      {
        prependIcon: "mdi-calendar-clock",
        title: "เช็คตารางการเช่าสัตว์วันนี้",
        value: "checkSchedule",
        link: "/pet-schedule-dashboard",
      },
      {
        prependIcon: "mdi-file-sign",
        title: "ทำสัญญาการเช่า",
        value: "petContraction",
        link: "/contraction",
      },
    ];
    return { userMenu, mainDrawer };
  },
  data() {
    return {
      user: useUserState().getUserByID(0),
      display: useDisplay(),
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

  computed: {
    manualToggleUserDrawer() {
      return this.display.mdAndDown;
    },
    manualToggleUserSideDrawer() {
      return this.display.mdAndDown ? false : true;
    },
  },
};
</script>
<template>
  <!--- Left -->
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent expand-on-hover>
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="menu in mainDrawer"
        :prepend-icon="menu.prependIcon"
        :title="menu.title"
        :value="menu.value || ''"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!--- Right -->
  <v-navigation-drawer
    location="right"
    elevation="6"
    permanent
    :rail="manualToggleUserDrawer"
  >
    <v-list>
      <v-list-item title="Sandra Adams" subtitle="sandra_a88@gmailcom">
        <template v-slot:prepend>
          <div class="indicator mr-4">
            <span class="indicator-item indicator-bottom">
              <v-icon
                color="primary"
                icon="mdi-check-decagram"
                size="18"
              ></v-icon>
            </span>
            <v-avatar>
              <v-img :src="user.imgPic" width="32"></v-img>
            </v-avatar>
          </div>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="menu of userMenu"
        @click="() => (userDrawer.toggleOptionDrawer = false)"
        :prepend-icon="menu.prependIcon"
        :title="menu.title"
        :value="menu.value || ''"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    :temporary="userDrawer.toggleOptionDrawer"
    :permanent="!userDrawer.toggleOptionDrawer && manualToggleUserSideDrawer"
    location="right"
    rounded
    width="300"
  >
    <template v-slot:append>
      <hr class="border-gray-700" />
      <v-btn
        variant="text"
        icon="mdi-chevron-right"
        @click.stop="userDrawer.toggleOptionDrawer = true"
      ></v-btn>
    </template>
    <v-card variant="text" class="mx-auto" max-width="500">
      <!-- <UserInfo :User="user"></UserInfo> -->
      <UserPetList></UserPetList>
    </v-card>
  </v-navigation-drawer>
</template>
