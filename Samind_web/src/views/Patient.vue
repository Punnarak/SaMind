<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> PATIENTS LIST </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          class="mt-2"
          density="comfortable"
          rounded="xl"
          variant="outlined"
          placeholder="Search Patient"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      rounded="xl"
      v-model:page="page"
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      style="border-radius: 10px"
    >
      <template v-slot:item.calories="{ item }">
        <v-chip :color="getColor(item.columns.calories)">
          {{ item.columns.calories }}
        </v-chip>
      </template>

      <template v-slot:bottom>
        <v-row class="pt-2 px-2">
          <v-col cols="auto">
            <v-select
              variant="solo-filled"
              :hide-details="true"
              flat
              :items-per-page="itemsPerPage"
              v-model="itemsPerPage"
              :items="[10, 20, 30, 40, 50]"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-pagination
              active-color="primary"
              v-model="page"
              :length="2"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-col>
</template>

<script setup>
import { ref } from "vue";
const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories", sortable: false },
  { title: "Fat (g)", key: "fat", sortable: false },
  { title: "Carbs (g)", key: "carbs", sortable: false },
  { title: "Protein (g)", key: "protein", sortable: false },
  { title: "Iron (%)", key: "iron", sortable: false },
];
const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: "6%",
  },
];
function getColor(calories) {
  if (calories > 400) return "red";
  else if (calories > 200) return "orange";
  else return "green";
}
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
```
