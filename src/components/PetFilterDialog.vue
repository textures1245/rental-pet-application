<script lang="ts">
export default {
  data: () => ({
    dialog: false,
    tags: [
      "Work",
      "Home Improvement",
      "Vacation",
      "Food",
      "Drawers",
      "Shopping",
      "Art",
      "Tech",
      "Creative Writing",
    ],
  }),
};
</script>
<template>
  <v-avatar color="secondary">
    <v-icon icon="mdi-filter" color="white" rounded @click="dialog = true">
    </v-icon>
  </v-avatar>
  <v-dialog v-model="dialog">
    <v-row justify="center">
      <v-col cols="12" sm="7" md="6" lg="5">
        <v-sheet elevation="10" rounded="xl">
          <v-sheet class="pa-3 bg-secondary text-right" rounded="t-xl">
            <v-btn icon>
              <v-icon>mdi-content-save-cog-outline</v-icon>
            </v-btn>

            <v-btn class="ms-2" icon @click="dialog = false">
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </v-sheet>

          <div class="pa-4">
            <v-chip-group selected-class="text-primary" column>
              <v-chip v-for="tag in tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<style scoped></style>
