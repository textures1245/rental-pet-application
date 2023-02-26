<script lang="ts">
import { PropType } from "vue";
import { usePetState, Pet } from "../store/petState";
import PetFilterDialog from "../components/PetFilterDialog.vue";
import { VIPUser, useUserState } from "../store/userState";
import PetAdminFormDialog from "./PetAdminFormDialog.vue";
import { Timestamp } from "@firebase/firestore";
import Swal from "sweetalert2";

export default {
  components: { PetFilterDialog, PetAdminFormDialog },
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
  methods: {
    reloadedPets() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "โหลดข้อมูลใหม่เศร็จสิ้น",
      });
      usePetState().fetchPetsFromFirebase();
    },
    async onDeletePet(petId: string) {
      Swal.fire({
        icon: "warning",
        title: "คุณแน่ใจว่าต้องการลบสัตว์เลี้ยงออก",
        showDenyButton: true,
        confirmButtonText: "ใช่",
        denyButtonText: `ไม่`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await usePetState().deletePeteAction(petId);
          Swal.fire(`ลบสัตว์เลี้ยงหมายเลข ${petId} เป็นที่เรียบร้อย`, "", "success");
        } else if (result.isDenied) {
          Swal.fire(`ยกเลิกการลบสัตว์เลี้ยงหมายเลข ${petId}`, "", "info");
        }
      });
    },

    onPushUserPetRequired(petData: Pet) {
      useUserState()
        .pushUserPetRequired(petData)
        .then(async () => {
          await Swal.fire({
            icon: "success",
            title: "ส่งการดำเนินการเช่าเรียบร้อย",
            text: `หมายเลขสัตว์ที่ทำการดำเนินการเช่า ${petData.id}`,
            footer:
              '<a href="" >ลองเข้าสู่ระบบด้วย "Employee" เพื่อดูผลลัพธ์รายการที่ต้องยืนยัน</a>',
          });
        });
    },
  },
};
</script>
<template>
  <div class="ml-10 flex justify-between mr-10">
    <div>
      <PetAdminFormDialog
        v-if="onRole === 'admin'"
        btn-text="เพิ่ม"
        btn-action="ADD"
        color="primary"
        prepared-icon="mdi-plus"
      ></PetAdminFormDialog>
    </div>
    <div class="flex gap-2">
      <v-btn
        @click="() => reloadedPets()"
        color="info"
        size="small"
        icon="mdi-reload"
      ></v-btn>
      <PetFilterDialog
        :filter="{ value: { breeds: pets.map((p) => p.species.breed) } }"
      ></PetFilterDialog>
    </div>
  </div>
  <v-expansion-panels variant="popout" class="pa-4">
    <v-expansion-panel v-for="(petData, i) in pets" hide-actions>
      <v-expansion-panel-title>
        <v-row align="center" class="spacer" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-avatar size="42">
              <v-img
                :lazy-src="petData.imgPic"
                cover
                size="42"
                :src="petData.imgPic"
              ></v-img>
            </v-avatar>
          </v-col>

          <v-col class="text-no-wrap text-start mx-auto" cols="5" sm="3">
            <strong v-html="petData.name"></strong>
            <div class="flex text-caption mt-2">
              {{ petData.species.breed }}
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
                      :lazy-src="petData.imgPic"
                      :src="petData.imgPic"
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
                      ประเภทสัตว์: {{ petData.species.species }}
                    </p>

                    <p class="text-gray-600">
                      สายพันธ์: {{ petData.species.breed }}
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
                            petData.healthy.heathOrder === 'unhealthy',
                          'text-success':
                            petData.healthy.heathOrder === 'healthy',
                        }"
                      >
                        ลำดับสุขภาพสัตว์: {{ petData.healthy.heathOrder }}
                      </p>
                    </div>
                    <div class="">
                      <p class="text-gray-600">
                        ตรวจครั้งล่าสุด:
                        {{ petData.healthy.lastChecked.toDate().toString() }}
                      </p>
                    </div>
                    <div v-if="petData.healthy.probDesc">
                      <p>ลายละเอียดการวินิจฉัย:</p>
                      <p class="text-gray-600">
                        {{ petData.healthy.probDesc }}
                      </p>
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
                        ประเภทการเช่า: {{ petData.rentType }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="onRole === 'user'" class="flex justify-end">
              <v-btn
                @click="() => onPushUserPetRequired(petData)"
                class=""
                color="info"
                prepend-icon="mdi-gesture-tap"
                >เช่า</v-btn
              >
            </div>
            <div v-else class="flex justify-end gap-3">
              <PetAdminFormDialog
                btn-text="แก้ไข"
                btn-action="EDIT"
                color="info"
                :item-prop-id="petData.id"
                prepared-icon="mdi-circle-edit-outline"
              ></PetAdminFormDialog>
              <v-btn
                class=""
                color="error"
                @click="onDeletePet(petData.id)"
                prepend-icon="mdi-delete"
                >ลบ</v-btn
              >
            </div>
          </div>
        </v-card-text>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style scoped></style>
