<script lang="ts">
import { ref, Ref } from "vue";
import { useDisplay } from "vuetify";
import { useUserState } from "../store/userState";
import {
  usePathStore,
  DrawerMenu,
  DrawerOptionValue,
} from "../store/pathState";
import UserInfo from "../features/UserInfo.vue";
import UserPetList from "../features/UserPetList.vue";
import ContractList from "../features/ContractList.vue";

export default {
  components: { UserInfo, UserPetList, ContractList },
  props: {
    setMenuDrawer: Boolean,
  },
  setup() {
    const userMenu: Ref<DrawerMenu[]> =
      useUserState().$state.roleToggler === "user"
        ? ref(usePathStore().getUserPaths)
        : ref(usePathStore().getEmployeePaths);

    const mainDrawer: Ref<DrawerMenu[]> =
      useUserState().$state.roleToggler === "user"
        ? ref(usePathStore().getAppUserPaths)
        : ref(usePathStore().getAppEmployeePaths);
    return { userMenu, mainDrawer };
  },
  data() {
    return {
      user: useUserState().getUserRoleByID(0),
      userState: useUserState(),
      display: useDisplay(),
      userDrawer: {
        toggleOptionDrawer: <Ref<DrawerOptionValue>>ref("none"),
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
      <router-link :to="menu.path" v-for="menu in mainDrawer">
        <v-list-item
          :active="$route.path === menu.path"
          :prepend-icon="menu.prependIcon"
          :title="menu.title"
          :value="menu.name || ''"
        ></v-list-item>
      </router-link>
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
      <v-list-item :title="user.name" :subtitle="user.email">
        <template v-slot:prepend>
          <div class="indicator mr-4">
            <span class="indicator-item indicator-bottom">
              <v-icon
                color="primary"
                :icon="
                  userState.roleToggler === 'user'
                    ? 'mdi-check-decagram'
                    : 'mdi-badge-account-horizontal'
                "
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
        @click="() => (userDrawer.toggleOptionDrawer = <DrawerOptionValue>menu.name)"
        :prepend-icon="menu.prependIcon"
        :title="menu.title"
        :value="menu.name || ''"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    :temporary="userDrawer.toggleOptionDrawer === 'none'"
    :permanent="userDrawer.toggleOptionDrawer !== 'none'"
    location="right"
    rounded
    width="320"
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
      <ContractList
        v-if="userDrawer.toggleOptionDrawer === 'contractList'"
      ></ContractList>
    </v-card>
  </v-navigation-drawer>
</template>
