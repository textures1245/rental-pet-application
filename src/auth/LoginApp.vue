<script lang="ts">
import { AccountType, Account } from "../store/authState";
import { VIPUser } from "../store/userState";
export default {
  data: () => ({
    accountData: <Account>{
      email: "",
      password: "",
      type: <AccountType | null>null,
    },
  }),

  methods: {
    async submitHandler() {
      const onLoaded = new Promise((r) => setTimeout(r, 1000));
      onLoaded.then(() => {
        console.log(this.accountData);
      });
    },
  },
};
</script>
<template>
  <v-card class="mx-auto thai-font" max-width="600" width="500">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span class="mr-2">Sign-in to Rental Pet</span>
      <v-avatar color="primary" size="24">
        <v-icon icon="mdi-account" size="20"></v-icon>
      </v-avatar>
    </v-card-title>

    <FormKit
      messages-class="text-center mb-3"
      type="form"
      id="registration-example"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <v-window>
        <v-window-item>
          <v-card-text>
            <FormKit
              v-model="accountData.email"
              label="Username"
              type="email"
              input-class="w-full"
              validation="required|email"
              value=""
            />
            <FormKit
              v-model="accountData.password"
              label="Password"
              type="password"
              input-class="w-full"
              validation="required|length:6"
              value=""
            />
            <FormKit
              v-model="accountData.type"
              type="select"
              label="Login as"
              name="small_country"
              placeholder="เลือกสถานะที่ต้องการเข้าระบบ"
              validation="required"
              :options="['User', 'Employee']"
            />
            <span class="text-caption text-grey-darken-1">
              ยังไม่มีบัชชีใช่ไหม?
              <v-btn
                size="small"
                color="success"
                @click="() => $router.push('/sign-up')"
                >สมัครสมาชิก</v-btn
              >
            </span>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="mt-5">
          <FormKit
            message-class="text-center"
            type="submit"
            label="เข้าสู่ระบบ"
          />
        </div>
      </v-card-actions>
    </FormKit>
  </v-card>
</template>
<style scoped></style>
