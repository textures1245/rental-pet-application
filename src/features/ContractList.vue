<script lang="ts">
import { useContractStore } from "../store/contractState";
import LoadingProps from "../components/LoadingProps.vue";
import { ref } from "vue";
export default {
  components: { LoadingProps },
  setup() {
    return {
      loaded: ref(true),
      contracts: useContractStore().getContractList,
    };
  },
};
</script>
<template>
  <LoadingProps
    v-if="loaded"
    @loaded-async="() => (loaded = false)"
  ></LoadingProps>
  <v-list v-else lines="two">
    <v-list-subheader>
      <div class="flex gap-2 items-center my-4">
        <div class="">
          <v-icon color="blue" icon="mdi-file-document-edit" size="24"></v-icon>
        </div>
        <div class="">
          <p class="text-xs badge badge-sm badge-info text-white">
            {{ "รายการสัญญาที่ต้องการดำเนินการ" }}
          </p>
          <p class="text-caption text-xs">
            {{
              `ตอนนี้มีรายการอยู่  ${contracts.length} รายการที่ต้องการดำเนินการ`
            }}
          </p>
        </div>
      </div>
    </v-list-subheader>
    <v-expansion-panels v-for="state in contracts">
      <v-expansion-panel>
        <v-expansion-panel-title class="h-20">
          <template v-slot="{ open }">
            <v-list-item>
              <template v-slot:prepend>
                <div class="flex gap-2">
                  <v-avatar size="32">
                    <v-img :src="state.user.imgPic" cover></v-img>
                  </v-avatar>
                  <div class="">
                    <p class="text-sm">{{ state.user.name }}</p>
                    <span class="text-caption capitalize">
                      <!-- <v-icon icon="mdi-required"> </v-icon> -->
                      ต้องการที่จะขอทำสัญญา
                    </span>
                  </div>
                </div>
                <v-spacer></v-spacer>
              </template>
              <template v-slot:append>
                <div
                  class="ml-10 flex flex-col gap-1 items-center justify-center"
                >
                  <v-btn
                    size="x-small"
                    color="success"
                    icon="mdi-check"
                  ></v-btn>
                  <p class="text-xs badge badge-sm badge-success text-white">
                    ยอมรับ
                  </p>
                </div>
              </template>
            </v-list-item>
          </template>
        </v-expansion-panel-title>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>
<style lang=""></style>
