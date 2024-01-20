<template>
  <div class="invitations-view">
    <v-container class="pt-12">
      <header class="w-100 d-flex justify-space-between align-center">
        <h1>Mis invitaciones</h1>
        <v-btn color="primary" variant="tonal" :prepend-icon="IconCirclePlus" @click="newInvitation">
          Nueva invitación
        </v-btn>
      </header>
  
      <v-row>
        <v-col cols="12">
          <!-- <v-card flat title="Nutrition">
            <template v-slot:text>
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                variant="outlined"
                hide-details
              ></v-text-field>
            </template>
  
            <v-data-table
              :items-per-page="5"
              :headers="headers"
              :items="desserts"
              :search="search"
            ></v-data-table>
          </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { IconCirclePlus } from "@tabler/icons-vue";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const newInvitation = () => {
  router.push({ name: "NewInvitation" });
};

const search = ref("");
const headers = reactive([
  {
    align: "start",
    key: "name",
    sortable: false,
    title: "Dessert (100g serving)",
  },
  { key: "calories", title: "Calories" },
  { key: "fat", title: "Fat (g)" },
  { key: "carbs", title: "Carbs (g)" },
  { key: "protein", title: "Protein (g)" },
  { key: "iron", title: "Iron (%)" },
]);

const desserts = reactive([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: 7,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: 0,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
]);
</script>

<style lang="scss" scoped>
.invitations-view {
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
}
</style>
