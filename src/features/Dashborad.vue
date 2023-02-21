<script lang="ts">
import { useDisplay } from "vuetify";
import { usePathStore, DrawerMenu } from "../store/pathState";

export type CardLists = {
  title: string;
  subtitle: string;
  detail: string;
  path: DrawerMenu;
  imgSrc: string;
  title2?: string;
};

export default {
  data() {
    return {
      display: useDisplay(),
    };
  },
  computed: {
    autoHeight() {
      if (this.display.smAndDown) {
        return 500;
      } else {
        return 350;
      }
    },
  },
};
</script>
<script lang="ts" setup>
import Card, { CardType } from "../components/Card.vue";
import BackgroundOverlay from "../components/BackgroundOverlay.vue";
const cardContext = {
  hero: <CardType>{
    title: "ยินดีต้อนรับกลับบ้านฮับเจ้านาย ",
    subTitle:
      "ยินดีต้อนรับกลับสู่ร้านอันแสนน่ารักของเรา, เพลิดเพลินไปกับความรักของสัตว์เลี้ยงตามเงื่อนไขของคุณ ",
    imgSrc:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
};

const cards: CardLists[] = [
  {
    title: "เลือกสัตว์เลี้ยงในอุดมคติของคุณ",
    title2: "ค้นหาคู่แท้ของคุณด้วยสัตว์เลี้ยงให้เช่า",
    subtitle: `ค้นหารายชื่อสัตว์เลี้ยงมากมายของเราและค้นพบเพื่อนใหม่ที่ดีที่สุดของคุณ`,
    detail:
      "ส่วนนี้แสดงรายการสัตว์เลี้ยงที่มีให้เช่าอย่างครบถ้วน รวมถึงสุนัข แมว นก ปลา และสัตว์ขนาดเล็กอื่นๆ เนื้อหาสามารถอธิบายถึงสายพันธุ์และขนาดที่แตกต่างกันของสัตว์เลี้ยงแต่ละชนิด ตลอดจนนิสัยใจคอ ความเข้ากันได้กับไลฟ์สไตล์และความชอบที่แตกต่างกัน คำบรรยายสามารถเน้นย้ำถึงขั้นตอนการเรียกดูรายชื่อสัตว์เลี้ยงและการค้นหาคู่ที่สมบูรณ์แบบ โดยเน้นถึงความตื่นเต้นและความคาดหวังของการค้นพบเพื่อนที่ดีที่สุดคนใหม่",
    path: usePathStore().getAppUserPaths[1],
    imgSrc:
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "วางแผนการเช่าสัตว์เลี้ยงของคุณด้วยความมั่นใจ",
    title2: "ตรวจสอบตารางเวลาของคุณก่อนเช่า",
    subtitle: `หลีกเลี่ยงวันที่ทับซ้อนกันและเพลิดเพลินไปกับประสบการณ์การเช่าที่ไร้กังวล`,
    detail:
      "ส่วนนี้จะให้คำแนะนำในการตรวจสอบตารางเวลาของคุณก่อนที่จะเช่าสัตว์เลี้ยง เพื่อให้แน่ใจว่าคุณมีเวลาและความพร้อมเพียงพอสำหรับการดูแลสัตว์อย่างเหมาะสม เนื้อหาสามารถเน้นความสำคัญของการวางแผนล่วงหน้าและการมีความรับผิดชอบ ตลอดจนให้คำแนะนำเกี่ยวกับวิธีการจัดการเวลาและกำหนดการของคุณในช่วงระยะเวลาการเช่า คำบรรยายสามารถเน้นถึงประโยชน์ของการหลีกเลี่ยงวันที่ทับซ้อนกันและเพลิดเพลินไปกับประสบการณ์การเช่าที่ปราศจากความเครียด",
    path: usePathStore().getAppUserPaths[2],
    imgSrc:
      "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  },
  {
    title: "เช่าด้วยความอุ่นใจ",
    title2: "ด้วยการทำสัญญาสัตว์เลี้ยง, เราจะปกป้องประสบการณ์การเช่าของคุณ",
    subtitle: `ทำความเข้าใจข้อกำหนดและเงื่อนไขของข้อตกลงการเช่าพื้นที่กลางแจ้งของเรา`,
    detail:
      "ข้อกำหนดและเงื่อนไขของสัญญาเช่าสัตว์เลี้ยง ซึ่งออกแบบมาเพื่อปกป้องทั้งลูกค้าและสัตว์เลี้ยงให้เช่าจากความเสี่ยงหรือปัญหาที่อาจเกิดขึ้น เนื้อหาสามารถอธิบายข้อและข้อกำหนดต่างๆ ของข้อตกลง เช่น ความรับผิดชอบของลูกค้า ความรับผิดของบริษัทให้เช่า และการดูแลและปฏิบัติต่อสัตว์เลี้ยงอย่างเหมาะสม คำบรรยายสามารถเน้นย้ำถึงความสำคัญของการทำความเข้าใจข้อกำหนดและเงื่อนไขของสัญญาเพื่อให้แน่ใจว่าประสบการณ์การเช่าจะราบรื่นและไม่ยุ่งยาก",
    path: usePathStore().getAppUserPaths[2],
    imgSrc:
      "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];
</script>

<template>
  <div class="grid grid-cols-2">
    <v-img
      cover
      class="max-h-[45vh]"
      sizes="360"
      src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=694&q=80"
    ></v-img>

    <v-card variant="text" max-width="360" class="mx-auto flex items-center">
      <template v-slot:text>
        <div class="">
          <article class="prose prose-blockquote:text-base">
            <h1 class="">{{ cardContext.hero.title }}</h1>
            <blockquote>{{ cardContext.hero.subTitle }}</blockquote>
          </article>
        </div>
      </template>
    </v-card>
  </div>
  <!-- <BackgroundOverlay type="color" color-class="bg-base-200"></BackgroundOverlay> -->
  <v-container>
    <article class="prose">
      <h1></h1>
    </article>
    <div class="w-full grid !grid-cols-1 z-10">
      <v-carousel
        :cycle="false"
        :height="autoHeight"
        hide-delimiters
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item v-for="(card, i) in cards">
          <Card
            :help-detail="card.detail"
            :path="{ link: card.path.path, name: card.path.name }"
            :title2="card.title2"
            :button-text="'คลิกที่นี้'"
            :img-src="card.imgSrc"
            :title="card.title"
            :sub-title="card.subtitle"
          ></Card>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>
<style lang=""></style>
