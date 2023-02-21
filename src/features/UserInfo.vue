<script lang="ts">
import { useUserState, VIPUser, User, Employee } from "../store/userState";
import LoadingProps from "../components/LoadingProps.vue";
import { PropType } from "vue";
export default {
  components: { LoadingProps },
  props: {
    User: Object as PropType<VIPUser | User | Employee | any>,
  },
  data() {
    return {
      onLoading: true,
    };
  },
};
</script>
<template>
  <LoadingProps
    v-if="onLoading"
    @loadedAsync="() => (onLoading = false)"
  ></LoadingProps>
  <v-list v-else lines="two">
    <v-list-subheader>
      <div
        v-if="(User as VIPUser).status === 'vip' || (User as Employee)"
        class=""
      >
        <div
          v-if="(User as VIPUser).status === 'vip'"
          class="flex gap-2 items-center"
        >
          <div class="mx-2">
            <v-icon
              color="primary"
              icon="mdi-check-decagram"
              size="24"
            ></v-icon>
          </div>
          <div class="">
            <p class="text-xs badge badge-sm badge-primary text-white">
              {{ "บัญชีของคุณอยู่ใน Tier VIP Membership" }}
            </p>
            <p class="text-caption text-xs">
              ตั้งแต่ {{ (User as VIPUser).subscriptionSince.toDateString() }}
            </p>
          </div>
        </div>
        <div v-else class="flex gap-2 items-center">
          <div class="mx-2">
            <v-icon
              color="primary"
              icon="mdi-badge-account-horizontal"
              size="24"
            ></v-icon>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xs badge badge-sm badge-primary text-white">
              คุณมีงานที่ต้องทำอยู่ 3 อย่างในขณะนี้
            </p>
            <div class="">
              <v-chip class="text-caption" size="small" color="primary">
                {{ (User as Employee).role.type }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </v-list-subheader>

    <v-list-item :prepend-avatar="User!.imgPic" :title="User!.name">
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption capitalize">
          <v-icon icon="mdi-account-circle-outline"> </v-icon>
          {{ User!.gender }}
        </span>
      </template>
    </v-list-item>

    <hr class="border-gray-200" />
    <v-divider inset></v-divider>

    <v-list-item
      :title="(User as VIPUser | User).memberId || (User as Employee).employeeId"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="28" icon="mdi-id-card"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption"
          >รหัสไอดีสมาชิก (Member ID)</span
        >
      </template>
    </v-list-item>

    <v-list-item :title="User!.citizenId">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="28" icon="mdi-card-account-details-outline"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption"
          >รหัสประชาชน (Citizen ID)</span
        >
      </template>
    </v-list-item>

    <v-list-item :title="User!.address">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="28" icon="mdi-map-marker-outline"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption">ที่อยู่ (Address)</span>
      </template>
    </v-list-item>

    <v-list-item :title="User!.phoneNumber">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="28" icon="mdi-phone-outline"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption"
          >เบอร์โทรศัพท์ (Phone Number)</span
        >
      </template>
    </v-list-item>

    <v-list-item :title="User!.email">
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="28" icon="mdi-email-outline"></v-icon>
        </v-avatar>
      </template>
      <template v-slot:subtitle>
        <span class="font-weight-bold text-caption">อีเมล์ (Email)</span>
      </template>
    </v-list-item>

    <div
      v-if="(User as VIPUser).status === 'vip' || (User as Employee).role.type === 'Admin'"
    >
      <v-list-item
        :title="(User as VIPUser | Employee).startDate.toDateString()"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon size="28" icon="mdi-ray-start"></v-icon>
          </v-avatar>
        </template>
        <template v-slot:subtitle>
          <span class="font-weight-bold text-caption">{{
            "วันที่เริ่มทำการ Subscription (Subscription Start Date)"
          }}</span>
        </template>
      </v-list-item>
      <v-list-item :title="(User as VIPUser | Employee).endDate.toDateString()">
        <template v-slot:prepend>
          <v-avatar>
            <v-icon size="28" icon="mdi-ray-end"></v-icon>
          </v-avatar>
        </template>
        <template v-slot:subtitle>
          <span class="font-weight-bold text-caption"
            >วันที่หมดอายุการ Subscription (Subscription End Date)</span
          >
        </template>
      </v-list-item>
    </div>

    <v-divider inset></v-divider>
  </v-list>
</template>
<style scoped></style>
