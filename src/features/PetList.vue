<script lang="ts">
import BackgroundOverlay from "../components/BackgroundOverlay.vue";
import { PetCategory, usePetState } from "../store/petState";
import PetListProps from "../components/PetListProps.vue";
import LoadingProps from "../components/LoadingProps.vue";
import { ref } from "vue";

type PetCardCategory = {
  species: PetCategory;
  imgPreview: string;
  nameCard: string;
  type: "indoor" | "outdoor";
};

export default {
  components: { BackgroundOverlay, PetListProps, LoadingProps },

  setup() {
    const petCardSlides: PetCardCategory[] = [
      {
        species: "dog",
        imgPreview:
          "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        nameCard: "สุนัข",
        type: "outdoor",
      },
      {
        species: "cat",
        imgPreview:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
        nameCard: "แมว",
        type: "indoor",
      },
      {
        species: "bunny",
        imgPreview:
          "https://images.unsplash.com/photo-1629898453289-6d3656b54b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=978&q=80",
        nameCard: "กระต่าย",
        type: "indoor",
      },
      {
        species: "bird",
        imgPreview:
          "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        nameCard: "นก",
        type: "indoor",
      },
    ];

    const category = ["สุนัข", "แมว", "กระต่าย", "นก"];
    const modelCategory = ["dog", "cat", "bunny", "bird"];
    return { petCardSlides, category, modelCategory, onLoaded: ref(true) };
  },
  mounted() {
    this.model = null;
  },
  data: () => ({
    model: null,
    petStates: usePetState().pets,
  }),
};
</script>
<template>
  <BackgroundOverlay
    type="color"
    color-class="bg-secondary-focus"
  ></BackgroundOverlay>
  <v-container>
    <div id="heading" class="flex justify-center my-2 mb-4">
      <article class="prose">
        <h1 class="text-secondary-content">เลือกสัตว์เลี้ยงในอุดมคติของคุณ</h1>
      </article>
    </div>
    <v-sheet class="mx-auto" max-width="800" rounded>
      <v-slide-group
        v-model="model"
        class="pa-4"
        center-active
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item
          v-for="card in petCardSlides"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-img
            :class="[
              'ma-4 rounded-md  bg-base-300 cursor-pointer',
              { 'w-[350px] h-[250px] shadow-lg': isSelected },
              'hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500',
            ]"
            height="200"
            width="300"
            cover
            :src="isSelected && model !== null ? card.imgPreview : ''"
            @click="toggle"
          >
            <div class="d-flex fill-height align-center justify-center">
              <!-- <v-scale-transition>
                <v-icon
                  v-if="isSelected"
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
                ></v-icon>
              </v-scale-transition> -->
              <h1 v-if="!isSelected" class="text-4xl">{{ card.nameCard }}</h1>
            </div>
          </v-img>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" height="500" class="!overflow-y-auto">
          <div class="flex flex-col gap-3 mt-5">
            <h1 class="text-3xl self-center">
              {{ category[model] }}
            </h1>
            <PetListProps
              :pets="
                petStates.filter(
                  (p) => p.species.species === modelCategory[model || 0]
                )
              "
            ></PetListProps>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-container>
</template>
<style scoped></style>
