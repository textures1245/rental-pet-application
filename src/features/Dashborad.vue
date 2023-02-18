<script lang="ts">
export default {
  data() {
    return {};
  },
};
</script>
<script lang="ts" setup>
import Card, { CardType } from "../components/Card.vue";
const cardContext = {
  hero: <CardType>{
    title: "ยินดีต้อนรับคุณ ",
    subTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid",
    imgSrc:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
};
</script>

<template>
  <!-- <Card
    :sub-title="cardContext.hero.subTitle"
    :title="cardContext.hero.title"
    :img-src="cardContext.hero.imgSrc"
  ></Card> -->
</template>
<style lang=""></style>
