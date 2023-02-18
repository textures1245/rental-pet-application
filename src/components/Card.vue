<script lang="ts">
export type CardType = {
  title: string;
  imgSrc: string;
  subTitle?: string;
  subTitleArr?: [];
  path?: object;
  buttonText?: string;
  colorText?: string;
  axis?: string;
  width?: string;
  height?: string;
};

export default {
  props: {
    path: Object,
    buttonText: String,
    colorText: String,
    imgSrc: String,
    axis: String,
    width: String,
    height: String,
    title: String,
    subTitle: String,
    subTitleArr: Array,
  },
};
</script>
<template>
  <div
    :class="`w-[${width}] !h-[${height}] `"
    class="h-full card md:card-side shadow-xl glass"
  >
    <figure class="object-cover w-full md:w-6/12">
      <v-img :lazy-src="imgSrc" cover :src="imgSrc" alt="Movie"></v-img>
    </figure>
    <div :class="colorText" class="card-body md:w-6/12 thai-p">
      <h2 class="card-title">{{ title }}</h2>
      <p v-if="subTitle" class="text-base indent-10 break-words">
        {{ subTitle.length > 200 ? subTitle.slice(0, 200) + "..." : subTitle }}
      </p>
      <ul class="list-disc list-inside" v-if="subTitleArr">
        <li v-for="t in (subTitleArr as string[])">{{ t }}</li>
      </ul>
      <div class="card-actions h-full !items-end justify-end">
        <NuxtLink v-if="path?.link" :to="path?.link" rel="">
          <button class="btn btn-primary">
            {{ buttonText || "เรียนรู้เพิ่มเดิม" }}
          </button>
        </NuxtLink>
        <button v-else class="btn btn-primary">
          {{ buttonText || "เรียนรู้เพิ่มเดิม" }}
        </button>
      </div>
    </div>
  </div>
</template>
