<script lang="ts">
import { AccountType, Account, AccountDetail } from "../store/authState";
import { useUserState, randomId, EmployeeRole } from "../store/userState";
import { useAuthState } from "../store/authState";
import { Employee } from "../store/userState";
import { VIPUser } from "../store/userState";
import { Pet } from "../store/petState";
import { Timestamp } from "@firebase/firestore";
import Swal from "sweetalert2";
import { reload } from "@firebase/auth";
import router from "../routes/appRoutes";

export default {
  data: () => ({
    step: 1,
    accountData: {
      email: "",
      password: "",
      type: "",
      user: <AccountDetail>{
        name: "",
        citizenId: "",
        gender: "",
        address: "",
        phoneNumber: "",
        imgPic: "",
      },
    },
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "สร้างบัญชีใหม่";
        case 2:
          return "ให้เรารู้จักกับคุณมากขึ้น";
        default:
          return "สร้างบัญชีสำเร็จแล้ว";
      }
    },
  },

  mounted() {
    this.accountData = {
      email: "",
      password: "",
      type: "",
      user: <AccountDetail>{
        name: "",
        citizenId: "",
        gender: "",
        address: "",
        phoneNumber: "",
        imgPic: "",
      },
    };
  },

  methods: {
    async submitHandler() {
      const onLoaded = new Promise((r) => setTimeout(r, 1000));
      onLoaded.then(() => {
        let userData = <VIPUser | Employee>{};
        if (this.accountData.type === "User") {
          userData = <VIPUser>{
            ...this.accountData.user,
            userId: "",
            memberId: randomId(13),
            petsOwning: <Pet[]>[],
            petsRequired: <Pet[]>[],
            email: this.accountData.email,
            status: "vip",
            subscriptionSince: Timestamp.now(),
            startDate: Timestamp.now(),
            endDate: Timestamp.now(),
            creditEarned: 0,
          };
        } else {
          userData = <Employee>{
            ...this.accountData.user,
            userId: "",
            employeeId: randomId(13),
            email: this.accountData.email,
            role: <EmployeeRole>{
              type: "Admin",
              task: [],
            },
            startDate: Timestamp.now(),
            endDate: Timestamp.now(),
            creditEarned: 0,
          };
        }
        useAuthState()
          .onSignupWithUserDetail(
            this.accountData.email,
            this.accountData.password,
            <AccountType>this.accountData.type,
            userData
          )
          .then(() => {
            //- reset
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              html: `<p>คุณได้สมัครสมาชิกในสถานะ: ${this.accountData.type} เป็นที่เรียบร้อย</p> <p>ระบบกำลังจะ redirect ไปยังหน้าหลักได้โปรดรอ</p>`,
            });
            this.accountData = {
              email: "",
              password: "",
              type: "",
              user: <AccountDetail>{
                name: "",
                citizenId: "",
                gender: "",
                address: "",
                phoneNumber: "",
                imgPic: "",
              },
            };
            console.log(userData, this.accountData);
          });
      });
    },
  },
};
</script>
<template>
  <v-card class="mx-auto" min-width300="" width="500">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span class="mr-3">{{ currentTitle }}</span>
      <v-avatar color="primary" size="24" v-text="step"></v-avatar>
    </v-card-title>

    <FormKit
      messages-class="text-center mb-3"
      type="form"
      id="registerAccount"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <FormKit
              v-model="accountData.email"
              label="Email"
              type="email"
              placeholder="โปรดกรอกอีเมล์ที่ต้องการสมัคร"
              input-class="w-full"
              validation="required|email"
              value=""
            />
            <FormKit
              v-model="accountData.password"
              label="Password"
              type="password"
              placeholder="โปรดกรอกรหัสผ่านที่ต้องการสมัคร"
              input-class="w-full"
              validation="required|length:6"
              value=""
            />
            <FormKit
              v-model="accountData.type"
              type="select"
              label="Login as"
              name="type"
              placeholder="เลือกสถานะที่ต้องการเข้าสมัคร"
              validation="required"
              :options="['User', 'Employee']"
            />
            <span class="text-caption text-grey-darken-1"> </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <FormKit
              v-model="accountData.user.name"
              label="Name"
              type="text"
              input-class="w-full"
              placeholder="กรอกชื่อของคุณ"
              validation="required|alpha-spaces|length:10"
              value=""
            />
            <FormKit
              v-model="accountData.user.citizenId"
              label="Citizen ID"
              type="text"
              input-class="w-full"
              placeholder="เลขประบัตรประชาชน 10 หลัก"
              validation="required|number|length:13,13"
              value=""
            />
            <FormKit
              v-model="accountData.user.phoneNumber"
              type="text"
              label="Phone Number"
              placeholder="เบอร์โทรศัทพ์ 13 หลัก"
              validation="required|number|length:10,10"
            />
            <FormKit
              v-model="accountData.user.address"
              type="text"
              label="Address"
              placeholder="โปรดกรอกที่อยู่"
              validation="required|length:5"
            />
            <FormKit
              v-model="accountData.user.imgPic"
              type="text"
              label="Image Picture URL"
              placeholder="โปรดใส่รูปภาพ URL  "
              validation="required|url"
            />
            <FormKit
              v-model="accountData.user.gender"
              type="select"
              label="Gender"
              placeholder="เลือกเพศของตุณ"
              validation="required"
              :options="['male', 'female']"
            />
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          v-if="step === 1"
          variant="flat"
          color="info"
          @click="() => $router.push('/sign-in')"
        >
          กลับสู่หน้าล็อกอิน
        </v-btn>
        <v-btn v-if="step > 1" variant="text" @click="step--"> ย้อนกลับ </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 2" color="primary" variant="flat" @click="step++">
          ไปต่อ
        </v-btn>
        <FormKit
          v-if="step == 2"
          input-class="text-xs bg-accent that-font"
          message-class="text-center"
          type="submit"
          label="สมัคร"
        />
      </v-card-actions>
    </FormKit>
  </v-card>
</template>
<style scoped></style>
