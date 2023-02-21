<script lang="ts">
import { PropType } from "vue";
import { usePetState, Pet } from "../store/petState";
import PetFilterDialog from "../components/PetFilterDialog.vue";
import { useUserState } from "../store/userState";

export default {
  components: { PetFilterDialog },
  props: {
    pets: {
      type: Array as PropType<Pet[]>,
      required: true,
    },
  },
  data() {
    return {
      onRole: useUserState().$state.roleToggler,
    };
  },
};
</script>
<template>
  <div class="ml-10 flex justify-between mr-10">
    <div>
      <v-btn
        v-if="onRole === 'admin'"
        class=""
        color="primary"
        prepend-icon="mdi-plus"
        >เพื่ม</v-btn
      >
    </div>
    <PetFilterDialog
      :filter="{ value: { breeds: pets.map((p) => p.species.breed) } }"
    ></PetFilterDialog>
  </div>
  <v-expansion-panels variant="popout" class="pa-4">
    <v-expansion-panel v-for="(pet, i) in pets" hide-actions>
      <v-expansion-panel-title>
        <v-row align="center" class="spacer" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-avatar size="42">
              <v-img
                :lazy-src="pet.imgPic"
                cover
                size="42"
                :src="pet.imgPic"
              ></v-img>
            </v-avatar>
          </v-col>

          <v-col class="text-no-wrap text-start mx-auto" cols="5" sm="3">
            <strong v-html="pet.name"></strong>
            <div class="flex text-caption mt-2">
              {{ pet.species.breed }}
            </div>
          </v-col>
          <v-col></v-col>
          <v-col class="text-end mr-3">
            <v-chip color="green" class="" label small> NEWS </v-chip>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-card-text>
          <div class="">
            <div class="grid grid-cols-1 md:grid-cols-4 max-h-full">
              <div class="place-self-center col-span-1">
                <div class="avatar">
                  <div class="w-28 h-full mask mask-squircle">
                    <v-img
                      cover
                      sizes="28"
                      :lazy-src="pet.imgPic"
                      :src="pet.imgPic"
                    ></v-img>
                  </div>
                </div>
              </div>
              <div class="col-span-3">
                <div
                  class="grid grid-cols-1 md:grid-cols-3 text-xs gap-2 gap-y-3"
                >
                  <div class="flex flex-col gap-2">
                    <h1 class="font-bold">
                      ลายละเอียด <br />
                      (Pet detail)
                    </h1>
                    <hr class="border-gray-800" />
                    <p class="text-gray-600">
                      ประเภทสัตว์: {{ pet.species.species }}
                    </p>

                    <p class="text-gray-600">
                      สายพันธ์: {{ pet.species.breed }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-2">
                    <h1 class="font-bold">
                      สุขภาพของสัตว์ <br />
                      (Pet Health)
                    </h1>
                    <hr class="border-gray-800" />
                    <div class="">
                      <p
                        class="text-gray-600"
                        :class="{
                          'text-warning':
                            pet.healthy.heathOrder === 'unhealthy',
                          'text-success': pet.healthy.heathOrder === 'healthy',
                        }"
                      >
                        ลำดับสุขภาพสัตว์: {{ pet.healthy.heathOrder }}
                      </p>
                    </div>
                    <div class="">
                      <p class="text-gray-600">
                        ตรวจครั้งล่าสุด:
                        {{ pet.healthy.lastChecked.toDateString() }}
                      </p>
                    </div>
                    <div v-if="pet.healthy.probDesc">
                      <p>ลายละเอียดการวินิจฉัย:</p>
                      <p class="text-gray-600">{{ pet.healthy.probDesc }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2">
                    <h1 class="font-bold">
                      ลายละเอียดการเช่ายืม <br />
                      (Rental Detail)
                    </h1>
                    <hr class="border-gray-800" />
                    <div class="">
                      <p class="text-gray-600">
                        ประเภทการเช่า: {{ pet.rentType }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="onRole === 'user'" class="flex justify-end">
              <v-btn class="" color="info" prepend-icon="mdi-gesture-tap"
                >เช่า</v-btn
              >
            </div>
            <div v-else class="flex justify-end gap-3">
              <v-btn
                class=""
                color="info"
                prepend-icon="mdi-circle-edit-outline"
                >แก้ไข</v-btn
              >
              <v-btn class="" color="error" prepend-icon="mdi-delete">ลบ</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style scoped></style>
