<script lang="ts">
import { ref } from "vue";
import FormContractor from "../components/FormContractor.vue";

export default {
  components: { FormContractor },
  setup() {
    const cardDetail = {
      title: "พาสัตว์เลี้ยงตัวน้อยของคุณ โลดแลนได้ในทุกที่",
      subtitle:
        "สนุกไปกับกิจกรรมกลางแจ้งกับสัตว์เลี้ยงให้เช่าของคุณ ด้วยการปกป้องสัตว์เลี้ยงและเพลิดเพลินไปกับประสบการณ์ระหว่างคุณและสัตว์เลี้ยงที่คุณรักได้ทุก ๆ สถานที่ ด้วยความมั่นใจ ปลอดภัย และการรับประกันจากพวกเรา",
      helpDetails: [
        {
          bullet: "การดูแลสัตว์เลี้ยง",
          text: "ข้อตกลงการเช่าของเรามีคำแนะนำในการดูแลสัตว์เลี้ยงของคุณระหว่างการเช่ากลางแจ้งเพื่อให้แน่ใจว่าจะได้รับประสบการณ์ที่ปลอดภัยและสนุกสนาน",
        },
        {
          bullet: "การรับประกัน",
          text: "ข้อตกลงการเช่าของเราระบุความรับผิดของทั้งลูกค้าและบริษัทให้เช่า และให้คำแนะนำในการลดความเสี่ยงระหว่างกิจกรรมกลางแจ้ง",
        },
        {
          bullet: "การคืนเงิน",
          text: "ข้อตกลงการเช่าของเราอธิบายนโยบายการคืนเงินและการยกเลิกเพื่อให้มั่นใจว่าจะได้รับประสบการณ์การเช่าที่ปราศจากความเครียด แม้ว่าแผนจะมีการเปลี่ยนแปลงก็ตาม",
        },
      ],
    };

    return { cardDetail };
  },
  data() {
    return {
      helpToggler: ref(false),
    };
  },
};
</script>
<template>
  <v-container>
    <div
      class="card max-h-full w-11/12 xl:w-9/12 mx-auto bg-base-100 shadow-xl image-full"
    >
      <figure>
        <img
          src="https://images.unsplash.com/photo-1545529468-42764ef8c85f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
          alt="Shoes"
        />
      </figure>
      <div v-if="!helpToggler" class="card-body grid grid-cols-3">
        <article
          class="transition-opacity place-self-start xl:place-self-center prose md:prose-sm lg:prose-base text-white col-span-2"
        >
          <h1 class="text-white">
            {{ cardDetail.title }}
            <v-avatar density="comfortable">
              <v-btn
                @click="helpToggler = true"
                icon="mdi-help"
                color=""
              ></v-btn>
            </v-avatar>
          </h1>
          <p class="indent-10 lead text-white">
            {{ cardDetail.subtitle }}
          </p>
        </article>
        <div class="card-actions justify-end place-self-end items-center">
          <FormContractor></FormContractor>
        </div>
      </div>
      <div v-else class="card-body flex justify-center items-center">
        <v-btn
          @click="helpToggler = false"
          icon="mdi-close"
          border="none"
          variant="outlined"
          class="absolute top-2 right-4"
        ></v-btn>
        <h1 class="text-white text-3xl">สิ่งที่คุณจะไดรับเมื่อเซ็นสัญญา</h1>
        <article
          class="grid place-content-center md:grid-cols-3 prose md:prose-sm lg:prose-base text-white"
        >
          <div class="text-white" v-for="detail in cardDetail.helpDetails">
            <ul class="text-center list-none">
              {{
                detail.bullet
              }}
              <hr class="border-white" />
              <li class="">{{ detail.text }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
@keyframes appeared {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
</style>
