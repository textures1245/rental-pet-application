<script lang="ts">
import { toHandlers } from "vue";
import { User, VIPUser, useUserState } from "../store/userState";
import { Pet } from "../store/petState";

export default {
  props: ["pets"],
  data() {
    return {
      onRole: useUserState().$state.roleToggler,
      user: useUserState().$state.users[0],
      pets:
        useUserState().$state.roleToggler === "user"
          ? <Pet[]>useUserState().$state.users[0].petsOwning
          : <Pet[]>useUserState().$state.users[0].petsRequired,
    };
  },
};
</script>
<template>
  <v-list lines="two">
    <v-list-subheader>
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
    </v-list-subheader>
    <hr class="border-gray-200" />

    <!--- pet detail  -->
    <v-expansion-panels v-for="pet in pets as Pet[]">
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
                    {{ pet.name }}
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
                ตรวจครั้งล่าสุด: {{ pet.healthy.lastChecked.toDateString() }}
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
            <div class="" v-if="pet.timeLeft !== null && onRole === 'user'">
              <p class="text-gray-600">เวลาคงเหลือ: {{ pet.timeLeft }} นาที</p>
            </div>
            <v-btn v-if="onRole === 'admin'" size="small" color="primary" prepend-icon="mdi-check-bold">ยืนยันรายการ</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>
<style lang=""></style>
