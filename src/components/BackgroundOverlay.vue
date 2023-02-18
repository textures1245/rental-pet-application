<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    type: {
      type: String as PropType<"img" | "color">,
      required: true,
    },
    colorClass: String,
    src: String,
    height: String,
  },
};
</script>
<template>
  <div
    :class="colorClass + ' ' + height"
    class="absolute w-full h-[45vh] -z-10"
  >
    <v-img v-if="type === 'img'" :src="src"></v-img>
  </div>
</template>
<style lang=""></style>
