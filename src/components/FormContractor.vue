<script lang="ts">
import { useUserState } from "../store/userState";

export default {
  data() {
    return {
      user: useUserState().getUserByID(0),
      dialog: false,
      hasSaved: false,
      isEditing: false,
    };
  },
  methods: {
    customFilter(item: any, queryText: any, itemText: any) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },
};
</script>
<template>
  <v-btn
    prepend-icon="mdi-draw"
    size="large"
    @click="dialog = true"
    color="success"
    >ทำสัญญา</v-btn
  >
  <v-dialog v-model="dialog" width="auto">
    <v-card width="650" max-width="650">
      <v-toolbar flat color="purple">
        <v-btn icon="mdi-account"></v-btn>

        <v-toolbar-title class="font-weight-light thai-font">
          ฟอร์มสัญญาการคุ้มครองสัตว์
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-fade-transition leave-absolute>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-fade-transition>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-autocomplete
          :readonly="true"
          v-model="user"
          color="white"
          label="ชื่อลูกค้า"
        >
          <template v-slot:chip="{ props, item }">
            <v-chip :prepend-avatar="user.imgPic" :text="user.name"></v-chip>
          </template>
        </v-autocomplete>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :text="user.address"
              readonly
              variant="solo"
              :model-value="user.address"
              label="ที่อยู่ (Address)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :text="user.citizenId"
              readonly
              variant="solo"
              :model-value="user.citizenId"
              label="รหัสประชาชน (Citizen ID)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :text="user.phoneNumber"
              readonly
              variant="solo"
              :model-value="user.phoneNumber"
              label="เบอร์โทรศัพท์ (Phone Number)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :text="user.email"
              readonly
              variant="solo"
              :model-value="user.email"
              label="อีเมล์ (Email)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-expansion-panels>
          <v-expansion-panel
            title="กฏและเงื่อนไข"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="">
        <v-checkbox
            color="primary"
          v-model="isEditing"
          label="ฉันเข้าใจและยินยอมกฏที่ตั้งไว้แล้ว"
        ></v-checkbox>

        <v-btn :disabled="!isEditing" @click="save"> Save </v-btn>
      </v-card-actions>

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
<style lang=""></style>
