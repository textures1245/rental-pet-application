<script lang="ts">
export type CardType = {
  title: string;
  imgSrc: string;
  helpDetail?: string;
  title2?: String;
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
    helpDetail: String,
    colorText: String,
    imgSrc: String,
    axis: String,
    width: String,
    height: String,
    title: String,
    title2: String,
    subTitle: String,
    subTitleArr: Array,
  },
};
</script>
<template>
  <div
    :class="`w-[${width}] !h-[${height}] `"
    class="h-full card lg:card-side shadow-xl glass"
  >
    <figure class="object-cover w-full lg:w-6/12">
      <v-img :lazy-src="imgSrc" cover :src="imgSrc" alt="Movie"></v-img>
    </figure>
    <div :class="colorText" class="card-body lg:w-6/12 thai-p">
      <article class="prose prose-sm lg:prose">
        <h2>
          {{ title }}
          <v-tooltip location="top" class="break-words mx-auto">
            <template v-slot:activator="{ props }">
              <v-icon
                size="16"
                icon="mdi-help-circle-outline"
                v-bind="props"
              ></v-icon>
            </template>
            <p>{{ helpDetail }}</p>
          </v-tooltip>
        </h2>
        <blockquote class="lead">
          {{ title2 }}
        </blockquote>
      </article>
      <p v-if="subTitle" class="text-base indent-10 break-words">
        {{ subTitle.length > 200 ? subTitle.slice(0, 200) + "..." : subTitle }}
      </p>
      <ul class="list-disc list-inside" v-if="subTitleArr">
        <li v-for="t in (subTitleArr as string[])">{{ t }}</li>
      </ul>
      <div class="card-actions h-full !items-end justify-end">
        <router-link v-if="path?.link" :to="path?.link" rel="">
          <button class="btn btn-primary">
            {{ buttonText || "เรียนรู้เพิ่มเดิม" }}
          </button>
        </router-link>
        <button v-else class="btn btn-primary">
          {{ buttonText || "เรียนรู้เพิ่มเดิม" }}
        </button>
      </div>
    </div>
  </div>
</template>
