<script lang="ts">
import { ref, toHandlers } from "vue";
import { User, VIPUser, useUserState } from "../store/userState";
import { Pet } from "../store/petState";
import LoadingProps from "../components/LoadingProps.vue";
import { useAuthState } from "../store/authState";
import Swal from "sweetalert2";

export default {
  components: { LoadingProps },
  props: ["pets"],
  data() {
    return {
      employeeMode: ref(false),
      onLoaded: ref(true),
      onRole: useUserState().$state.roleToggler,
      loadedUserCollection: <VIPUser[]>[],
      userSelectedName: {},
      user: <VIPUser>useUserState().$state.users[0] || null,

      //- todo: changes

      //- if account had "User" role active then loaded otherwise wait for client to select user
      pets:
        useUserState().$state.roleToggler === "user"
          ? ref(<Pet[]>useUserState().$state.users[0].petsOwning)
          : ref(<Pet[]>[]),
    };
  },

  watch: {
    userSelectedName(newUserName: string) {
      if (newUserName) {
        this.user = <VIPUser>(
          this.loadedUserCollection.find((user) => user.name == newUserName)
        );
        this.pets = this.user.petsRequired;
      }
    },
  },
  async mounted() {
    //- if use is empty then enter to employee mode
    if (!this.user) {
      this.onSelectUserMode();
    }
  },
  methods: {
    async onSelectUserMode() {
      useAuthState().userCollection.then((user) => {
        const loadedUsers: VIPUser[] = user.map((user) => user);
        this.loadedUserCollection = loadedUsers;
        this.employeeMode = true;
      });
    },

    onPushUserPetOwing(petData: Pet, acceptTo: VIPUser) {
      useUserState()
        .pushUserPetOwing(petData, acceptTo)
        .then((petIndexTarget) => {
          this.user.petsRequired.splice(petIndexTarget, 1);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: `ดำเนินการเช่าให้คุณ ${acceptTo.name}`,
          });
        });
    },
  },
};
</script>
<template>
  <LoadingProps
    v-if="onLoaded"
    @loaded-async="() => (onLoaded = false)"
  ></LoadingProps>
  <v-list v-else lines="two">
    <v-list-subheader v-if="user !== null">
      <div class="flex gap-2 items-center my-4">
        <div class="">
          <v-icon color="pink" icon="mdi-paw" size="24"></v-icon>
        </div>
        <div class="">
          <p class="text-xs badge badge-sm badge-accent text-white">
            {{
              onRole === "user"
                ? "สัตว์เลี้ยงของฉัน"
                : "รายการที่ต้องการดำเนินการ"
            }}
          </p>
          <p class="text-caption text-xs">
            {{
              onRole === "user"
                ? `ตอนนี้คุณมีสัตว์เลี้ยงอยู่  ${pets.length}  ตัว ในขณะนี้`
                : `ตอนนี้มีรายการอยู่  ${pets.length} รายการที่ต้องการดำเนินการ`
            }}
          </p>
        </div>
      </div>
      <hr class="border-gray-200 w-full" />
    </v-list-subheader>

    <div v-if="employeeMode">
      <v-list-subheader>
        <div class="flex gap-6 items-center my-4">
          <div class="">
            <v-icon color="pink" icon="mdi-account" size="24"></v-icon>
          </div>
          <div class="">
            <p>โปรดเลือกสมาชิกที่ต้องการดำการ</p>
          </div>
        </div>
      </v-list-subheader>
      <v-autocomplete
        v-model="userSelectedName"
        :items="loadedUserCollection"
        chips
        color="blue-grey-lighten-2"
        item-title="name"
        item-value="name"
        label="Select"
      >
        <template v-slot:chip="{ props, item }">
          <v-chip
            v-bind="props"
            :prepend-avatar="item.raw?.imgPic"
            :text="item.raw?.name"
          ></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
            class="cursor-pointer !z-10 bg-white"
            v-bind="props"
            :prepend-avatar="item?.raw?.imgPic"
            :title="item?.raw?.name"
          ></v-list-item>
        </template>
      </v-autocomplete>
    </div>

    <!--- pet detail  -->
    <v-expansion-panels v-if="user !== null" v-for="pet in pets as Pet[]">
      <v-expansion-panel>
        <v-expansion-panel-title class="h-20">
          <template v-slot="{ open }">
            <v-list-item
              v-if="onRole === 'user'"
              :prepend-avatar="pet.imgPic"
              :title="pet.name"
            >
              <template v-slot:subtitle>
                <span class="font-weight-bold text-caption capitalize">
                  <v-icon icon="mdi-account-circle-outline"> </v-icon>
                  {{ pet.gender }}
                </span>
              </template>
              <template v-slot:append>
                <div class="ml-5">
                  <v-tooltip location="top" content-props="">
                    <template v-slot:activator="{ props }">
                      <v-avatar
                        v-bind="props"
                        v-if="pet.deliveredStatus.onDelivering === true"
                        class="ml-5 bg-base-200"
                        size="20"
                      >
                        <v-icon icon="mdi-moped" size="16"></v-icon>
                      </v-avatar>
                    </template>

                    <div id="deliver_tooltip-card" class="flex items-center">
                      <div class="flex-shrink-0">
                        <v-avatar class="bg-base-200" size="32">
                          <v-img
                            :src="pet.deliveredStatus.deliver?.imgSrc"
                            size="34"
                          ></v-img>
                        </v-avatar>
                      </div>
                      <div class="ml-4">
                        <div class="font-weight-bold text-caption">
                          {{ pet.deliveredStatus.deliver?.name }}
                        </div>
                        <div class="text-xs">
                          {{ pet.deliveredStatus.deliver?.tel }}
                        </div>
                      </div>
                    </div>
                  </v-tooltip>
                  <div
                    v-if="pet.timeLeft !== null"
                    class="bg-base-200 badge gap-1 badge-sm badge-ghost text-[10px] text-gray-800"
                  >
                    <v-icon
                      icon="mdi-clock-time-eight-outline"
                      size="14"
                    ></v-icon>
                    {{ pet.timeLeft }}
                  </div>
                </div>
              </template>
            </v-list-item>

            <v-list-item v-else>
              <template v-slot:prepend>
                <div class="flex gap-2">
                  <v-avatar size="32">
                    <v-img :src="user.imgPic" cover></v-img>
                  </v-avatar>
                  <div class="">
                    <p class="text-sm">{{ user.name }}</p>
                    <span class="text-caption capitalize">
                      <!-- <v-icon icon="mdi-required"> </v-icon> -->
                      ต้องการที่จะขอเช่า
                    </span>
                  </div>
                </div>
                <v-spacer></v-spacer>
              </template>
              <template v-slot:append>
                <div
                  class="ml-10 flex flex-col gap-1 items-center justify-center"
                >
                  <v-avatar size="32">
                    <v-img :src="pet.imgPic" cover></v-img>
                  </v-avatar>
                  <p class="text-xs badge badge-xs badge-glass">
                    {{
                      pet.name.length > 6
                        ? pet.name.substring(0, 6) + ".."
                        : pet.name
                    }}
                  </p>
                </div>
              </template>
            </v-list-item>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="grid grid-cols-2 text-xs gap-2 gap-y-3">
            <div class="col-span-2">
              ลายละเอียด (Pet detail)
              <hr class="border-gray-800" />
            </div>
            <div class="">
              <p class="text-gray-600">
                ประเภทสัตว์: {{ pet.species.species }}
              </p>
            </div>
            <div class="">
              <p class="text-gray-600">สายพันธ์: {{ pet.species.breed }}</p>
            </div>
            <div class="col-span-2">
              สุขภาพของสัตว์ (Pet Health)
              <hr class="border-gray-800" />
            </div>
            <div class="">
              <p
                class="text-gray-600"
                :class="{
                  'text-warning': pet.healthy.heathOrder === 'unhealthy',
                  'text-success': pet.healthy.heathOrder === 'healthy',
                }"
              >
                ลำดับสุขภาพสัตว์: {{ pet.healthy.heathOrder }}
              </p>
            </div>
            <div class="">
              <p class="text-gray-600">
                ตรวจครั้งล่าสุด:
                {{ pet.healthy.lastChecked.toDate().toDateString() }}
              </p>
            </div>
            <div v-if="pet.healthy.probDesc" class="col-span-2">
              <p>ลายละเอียดการวินิจฉัย</p>
              <p class="text-gray-600">{{ pet.healthy.probDesc }}</p>
            </div>
            <div class="col-span-2">
              ลายละเอียดการเช่ายืม (Rental Detail)
              <hr class="border-gray-800" />
            </div>
            <div class="">
              <p class="text-gray-600">ประเภทการเช่า: {{ pet.rentType }}</p>
            </div>
            <p class="text-gray-600">
              เวลาการเช่า (นาที): {{ pet.rentalTime }}
            </p>
            <div class="" v-if="pet.timeLeft !== null && onRole === 'user'">
              <p class="text-gray-600">เวลาคงเหลือ: {{ pet.timeLeft }} นาที</p>
            </div>
            <div class=""></div>
            <v-btn
              v-if="onRole === 'admin'"
              class=""
              @click="() => onPushUserPetOwing(pet, user)"
              size="small"
              color="primary"
              prepend-icon="mdi-check-bold"
              >ยืนยันรายการ</v-btn
            >
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>
<style lang=""></style>
