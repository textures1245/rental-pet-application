<script lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useUserState } from "../store/userState";
import UserInfo from "../features/UserInfo.vue";
import UserPetList from "../features/UserPetList.vue";
import { Ref } from "vue";

export type DrawerMenu = {
  prependIcon?: string;
  title: string;
  value?: DrawerOptionValue | string;
  link?: string;
};

type DrawerOptionValue = "none" | "userInfo" | "userPet";

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
        value: "userPet",
        link: "my-pet-list",
      },
      {
        prependIcon: "mdi-account",
        title: "ข้อมูลบัญชี",
        value: "userInfo",
        link: "account-info",
      },
    ];

    const mainDrawer = <DrawerMenu[]>[
      {
        prependIcon: "mdi-home-heart",
        title: "หน้าหลัก",
        value: "dashboard",
        link: "/dashboard",
      },
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
        toggleOptionDrawer: <Ref<"none" | "userInfo" | "userPet">>ref("none"),
      },
      drawer: true,
      rail: true,
    };
  },

  computed: {
    manualToggleUserDrawer() {
      return this.display.mdAndDown;
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
        @click="() => (userDrawer.toggleOptionDrawer = <DrawerOptionValue>menu.value)"
        :prepend-icon="menu.prependIcon"
        :title="menu.title"
        :value="menu.value || ''"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    :temporary="userDrawer.toggleOptionDrawer === 'none'"
    :permanent="userDrawer.toggleOptionDrawer !== 'none'"
    location="right"
    rounded
    width="300"
  >
    <template v-slot:append>
      <hr class="border-gray-700" />
      <v-btn
        variant="text"
        icon="mdi-chevron-right"
        @click.stop="userDrawer.toggleOptionDrawer = 'none'"
      ></v-btn>
    </template>
    <v-card variant="text" class="mx-auto" max-width="500">
      <UserInfo
        v-if="userDrawer.toggleOptionDrawer === 'userInfo'"
        :User="user"
      ></UserInfo>
      <UserPetList
        v-if="userDrawer.toggleOptionDrawer === 'userPet'"
      ></UserPetList>
    </v-card>
  </v-navigation-drawer>
</template>
