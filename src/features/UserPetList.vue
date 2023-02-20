<script lang="ts">
import { Pet, usePetState } from "../store/petState";

export default {
  props: ["UserPets"],
  data() {
    return {
      pets: usePetState().getPets,
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
            สัตว์เลี้ยงของฉัน
          </p>
          <p class="text-caption text-xs">
            ตอนนี้คุณมีสัตว์เลี้ยงอยู่ {{ pets.length }} ตัว ในขณะนี้
          </p>
        </div>
      </div>
    </v-list-subheader>
    <hr class="border-gray-200" />

    <!--- pet detail  -->
    <v-expansion-panels v-for="pet in pets">
      <v-expansion-panel>
        <v-expansion-panel-title class="h-20">
          <template v-slot="{ open }">
            <v-list-item :prepend-avatar="pet.imgPic" :title="pet.name">
              <template v-slot:subtitle>
                <span class="font-weight-bold text-caption capitalize">
                  <v-icon icon="mdi-account-circle-outline"> </v-icon>
                  {{ pet.gender }}
                </span>
              </template>
              <template v-slot:append>
                <div class="ml-10">
                  <v-tooltip location="top" content-props="">
                    <template v-slot:activator="{ props }">
                      <v-avatar
                        v-bind="props"
                        v-if="pet.deliveredStatus.onDelivering === true"
                        class="bg-base-200"
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
            <div class="" v-if="pet.timeLeft !== null">
              <p class="text-gray-600">เวลาคงเหลือ: {{ pet.timeLeft }} นาที</p>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>
<style lang=""></style>
