<script lang="ts">
import { ref, nextTick, watch } from "vue";
import { useUserState } from "./store/userState";
import { useAuthState } from "./store/authState";
import { usePetState } from "./store/petState";
import { getCurrentUser } from "vuefire";
import AppBar from "./layouts/Appbar.vue";
import Drawer from "./layouts/Drawer.vue";
import Swal from "sweetalert2";

export default {
  components: { AppBar, Drawer },
  setup() {
    const isAuth = ref(false);

    watch(
      () => useAuthState().currAccount,
      (newVal) => {
        console.log("asds");
        reRenderComponent();
      }
    );

    const loadedUserThenActive = ref(false);

    async function reRenderComponent() {
      await getCurrentUser().then((user) => {
        isAuth.value = user ? true : false;
        loadedUserThenActive.value = false;
        nextTick().then(() => {
          loadedUserThenActive.value = true;
        });
      });
    }

    return { reRenderComponent, loadedUserThenActive, isAuth };
  },
  data() {
    return {
      textMock: `<div class="prose prose-sm thai-font">
    <h3>Rental Pet Application - App เกี่ยวกับการเช่าสัตว์</h3>
    <p>สถาณะของ Account</p>
    <ul>
      <li>
        User -> สามารถสมัคร ดู และเช่าสัตว์เลี้ยงได้
        โดยต้องส่งการดำเนินการเช่าให้ พนักงาน (Employee) ก่อนถึงจะสามารถเช่าได้
      </li>
      <li>
        Employee -> สามารถสมัครและมีสิทธ์พิเศษในการ เพิ่ม, ดู, แก้ไข, ลบ (CRUD)
        สัตว์เลี้ยงได้ รวมถึงยินยันการดำเนินการเช่าที่ถูกส่งมาจาก User ได้
        เมื่อยืนยันเสร็จ คำขอการยืนยันเช่าจะเสร็จสิ้นแล้วสัตว์เลี้ยงจะถูกโชว์บน
        รายการสัตว์เลี้ยงของฉัน ในส่วนของลูกค้า
      </li>
    </ul>

    <p>Features อื่น ๆ</p>
    <ul>
      <li>
        Guard route - ทุก Route ถูกป้องกันด้วยการ Authenticated ถ้า client
        ยังไม่ได้ auth จะไม่สมารถใช้ feature หลักของ App ได้
      </li>
      <li>
        Auto Authenticated - ในกรณีที่ Client ยังไม่ได้ออกจากระบบ เมื่อ Restart
        Web จะทำการ Auto Auth โดยทันที จนกว่าจะออกจากระบบ
      </li>
    </ul>
    <a
      >***ในกรณีที่เกิดปัญหาอะไรรบกวนช่วย restart app ด้วยครับ (transaction ของ
      API อาจมีปัญหา)***</a
    >
  </div>`,
      onLoaded: ref(true),
      theme: ["fantasy", "forest"],
    };
  },
  async created() {
    const Authenticate = await getCurrentUser();
    if (!Authenticate) {
      Swal.fire({
        icon: "info",
        title: "ยินดีต้อนรับสู Rental Pet Application",
        html: this.textMock,
        footer:
          '<a class="text-primary">ทำโดย นายไตรภาค สิทธิแก้ว 6404101318</a>',
      });
      this.reRenderComponent();
      this.onLoaded = false;
      console.log("Authentication Failed");
      this.$router.push("/sign-in");
    } else {
      await useAuthState()
        .loadedCurrentUser()
        .then(async () => {
          usePetState().firstInitialsPetState();
          console.log("asds");
          this.reRenderComponent();
          console.log(Authenticate);
        });
    }
  },
  methods: {},
};
</script>

<template>
  <v-app class="overflow-y-auto thai-font eng-font">
    <v-layout :data-theme="theme[0]">
      <AppBar v-if="isAuth && loadedUserThenActive"></AppBar>
      <Drawer v-if="isAuth && loadedUserThenActive"></Drawer>
      <v-main
        class="h-full w-full"
        :class="!isAuth ? 'flex justify-center items-center' : ''"
      >
        <div>
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Suspense>
                <KeepAlive>
                  <component :is="Component"></component>
                </KeepAlive>
              </Suspense>
            </template>
            <template v-else>
              <div>Loading...</div>
            </template>
          </RouterView>
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
