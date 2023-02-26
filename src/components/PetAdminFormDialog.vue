<script lang="ts">
import { PropType } from "vue";
import { useUserState } from "../store/userState";
import { Pet, PetCategory, HealthyPet, PetSpecies } from "../store/petState";
import { usePetState } from "../store/petState";
import { Timestamp } from "@firebase/firestore";
import Swal from "sweetalert2";

export default {
  props: {
    btnAction: {
      type: String as PropType<"ADD" | "EDIT">,
      required: true,
    },
    color: {
      type: String,
      default: "primary",
    },
    preparedIcon: String,
    btnText: {
      type: String,
      required: true,
    },
    itemPropId: String,
  },
  data() {
    return {
      user: useUserState().$state.employees[0],
      dialog: false,
      hasSaved: false,
      isEditing: false,

      petData: <Pet>{
        id: "0",
        name: "",
        species: {
          species: <PetCategory>null,
          breed: "",
        },
        gender: null,
        healthy: <HealthyPet>{
          heathOrder: null,
          lastChecked: <any>"",
          probDesc: "",
        },
        imgPic: "",
        timeLeft: null,
        rentalTime: 0,
        deliveredStatus: {
          onDelivering: false,
          deliver: null,
        },
        rentType: null,
      },
      petSpeciesOpt: ["cat", "dog", "bunny", "bird"],
    };
  },
  methods: {
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
    async submitHandler() {
      const onLoaded = new Promise((r) => setTimeout(r, 1000));
      onLoaded.then(() => {
        let newPetData = {} as Pet;
        if (this.btnAction === "ADD") {
          const timestampDate = Timestamp.fromDate(
            new Date(this.petData.healthy.lastChecked as any)
          );
          newPetData = <Pet>{
            ...this.petData,
            healthy: {
              heathOrder: this.petData.healthy.heathOrder,
              lastChecked: timestampDate,
              probDesc: this.petData.healthy.probDesc || "",
            },
          };
        } else {
          newPetData = <Pet>{
            ...this.petData,
            healthy: {
              heathOrder: this.petData.healthy.heathOrder,
              lastChecked: this.petData.healthy.lastChecked,
              probDesc: this.petData.healthy.probDesc || "",
            },
          };
        }

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        if (this.btnAction === "ADD") {
          usePetState().addPetAction(newPetData);
          this.dialog = false;
          Toast.fire({
            icon: "success",
            title: `สัตว์เลี้ยงชื่อ ${newPetData.name} ถูกทำการเพิ่มเป็นที่เรียบร้อย`,
          });
        } else {
          usePetState().editPetAction(this.itemPropId!, newPetData);
          this.dialog = false;
          Toast.fire({
            icon: "success",
            title: `สัตว์เลี้ยงชื่อ ${newPetData.name} ถูกอัปเดตเป็นที่เรียบร้อย`,
          });
        }
      });
    },

    loadedEditPet() {
      this.petData = usePetState().$state.pets.find(
        (p) => p.id === this.itemPropId
      )!;
      console.log("tiggers", this.petData);
    },
  },
};
</script>
<template>
  <v-btn
    :prepend-icon="preparedIcon"
    @click="[(dialog = true), btnAction === 'EDIT' ? loadedEditPet() : '']"
    :color="color"
    >{{ btnText }}</v-btn
  >
  <v-dialog v-model="dialog" width="auto">
    <v-card width="650" max-width="650">
      <v-toolbar flat color="purple">
        <v-btn icon="mdi-account"></v-btn>

        <v-toolbar-title class="font-weight-light thai-font">
          {{ btnAction === "ADD" ? "เพิ่มสัตว์เลี้ยง" : "แก้ไข้สัตว์เลี้ยง" }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-fade-transition leave-absolute>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-fade-transition>
        </v-btn>
      </v-toolbar>

      <FormKit
        messages-class="text-center mb-3"
        type="form"
        id="registration-example"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
        #default="{ value }"
      >
        <v-card-text>
          <v-autocomplete
            :readonly="true"
            v-model="user"
            color="white"
            label="ชื่อพนักงานคนดำเนินการ"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip :prepend-avatar="user.imgPic" :text="user.name"></v-chip>
            </template>
          </v-autocomplete>

          <v-row>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.name"
                label="(ชื่อสัตว์เลี้ยง) Pet Name"
                type="text"
                input-class="w-full"
                placeholder="กรอกชื่อสัตว์เลี้ยง"
                validation="required|alpha-spaces|length:3"
                :value="petData.name"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.species.species"
                :options="petSpeciesOpt"
                label="(ประเภทสัตว์เลี้ยง) Pet Category"
                type="select"
                :value="petData.species.species"
                input-class="w-full"
                placeholder="โปรดเลือกประเภทสัตว์เลี้ยง"
                validation="required"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.species.breed"
                label="(สายพันธู์) Pet Species"
                type="text"
                :value="petData.species.breed"
                input-class="w-full"
                placeholder="โปรดกรอกสายพันธู์ที่เลือก"
                validation="required|alpha-spaces|length:3"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                :value="petData.gender"
                v-model="petData.gender"
                :options="['male', 'female']"
                label="(เพศของสัตว์เลี้ยง) Pet Gender"
                type="select"
                input-class="w-full"
                placeholder="โปรดเลือกเพศของสัตว์เลี้ยง"
                validation="required"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.rentType"
                :options="['Outdoor', 'Indoor']"
                label="(ประเภทของการเช่า) Pet Rented Type"
                type="select"
                :value="petData.rentType"
                input-class="w-full"
                placeholder="โปรดเลือกประเภทเช่า"
                validation="required"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.imgPic"
                :value="petData.imgPic"
                label="(รูปภาพสัตว์เลี้ยง) Pet Picture"
                type="text"
                input-class="w-full"
                placeholder="โปรดกรอกรูปภาพแบบ URLs"
                validation="required|url"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.rentalTime"
                label="(ระยะเวลาการเช่าต่อนาที ) Pet Rental Time (mins)"
                type="text"
                :value="petData.rentalTime"
                input-class="w-full"
                placeholder="โปรดกรอกระยะเวลาการเช่าต่อนาที ต้องมากกว่า 30 นาทีขึ้นไป"
                validation="required|number|min:30"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-model="petData.healthy.heathOrder"
                label="(สุขภาพของสัตว์เลี้ยง ) Pet Health Order"
                type="select"
                :value="petData.healthy.heathOrder"
                :options="['healthy', 'unhealthy']"
                input-class="w-full"
                placeholder="โปรดเลือกสุขภาพของสัตว์เลี้ยง"
                validation="required"
              ></FormKit>
            </v-col>
            <v-col cols="12" sm="6">
              <FormKit
                v-if="btnAction === 'ADD'"
                v-model="petData.healthy.lastChecked"
                :value="petData.healthy.lastChecked"
                type="date"
                label="(เช็คล่าสุดเมื่อ) Last Health Date Checked"
              />
            </v-col>
            <v-col cols="12" class="flex justify-center w-full">
              <FormKit
                textarea-class="min-w-full"
                v-model="petData.healthy.probDesc"
                :value="petData.healthy.probDesc"
                type="textarea"
                label="ลายละเอียดของสุขภาพสัตว์ (Pet Health Detail)"
                placeholder="โปรดกรอกสุขภาพที่พบของสัตว์เลี้ยง (สามารถเว้นได้)"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="float-right">
          <FormKit
            input-class="text-xs bg-info that-font"
            message-class="text-center"
            type="submit"
            label="ยืนยัน"
          />
        </v-card-actions>
      </FormKit>

      <v-snackbar
        v-model="hasSaved"
        :timeout="2000"
        attach
        position="absolute"
        location="bottom left"
      >
        แบบฟอร์มของคุณถูกยืนให้เจ้าที่ดำเนินการเป็นที่เรียบร้อยแล้ว
      </v-snackbar>
      <v-card-actions>
        <v-btn color="primary" block
          >โปรดตรวจสอบความถูกต้องของข้อมูลก่อนยืนยัน</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped></style>
