<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600"> TEST LIST </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col cols="5">
        <v-text-field
          class="mt-2"
          density="comfortable"
          rounded="lg"
          variant="outlined"
          placeholder="Search Test"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field> </v-col
      ><v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="#569AFF"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          to="createtest"
        >
          <v-icon>mdi-file-document-outline</v-icon>Create Test</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      rounded="xl"
      v-model:page="page"
      :headers="headers"
      :items="patients"
      class="elevation-1"
      style="border-radius: 10px"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          style="margin-right: 20px"
          @click="
            this.$router.push({
              path: `edittest/${item.columns.id}`,
              query: { item: JSON.stringify(item) },
            })
          "
          >mdi-pencil</v-icon
        >
        <v-icon>mdi-delete</v-icon>
        <v-icon style="margin-left: 20px">mdi-send</v-icon>
        <!-- {{ item.columns.action }} -->
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
    title: "No.",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Test Name", key: "testName", sortable: false, align: "center" },
  { title: "Action", key: "action", sortable: false, align: "center" },
];
const patients = [
  {
    id: "01",
    testName: "Somsak Test 1",
    action: 6,
  },
  {
    id: "02",
    testName: "Somsak Test 2",
    action: 9,
  },
  {
    id: "03",
    testName: "Somsak Test 3",
    action: 16,
  },
  {
    id: "04",
    testName: "Somsak Test 4",
    action: 3.7,
  },
  {
    id: "05",
    testName: "Somsak Test 5",
    action: 16,
  },
  {
    id: "06",
    testName: "Somsak Test 6",
    action: 0,
  },
  {
    id: "07",
    testName: "Somsak Test 7",
    action: 0.2,
  },
  {
    id: "08",
    testName: "Somsak Test 8",
    action: 3.2,
  },
  {
    id: "09",
    testName: "Somsak Test 9",
    action: 25,
  },
  {
    id: "10",
    testName: "Somsak Test 10",
    action: 26,
  },
];
function getColor(mood) {
  if (mood > 400) return "red";
  else if (mood > 200) return "orange";
  else return "green";
}
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
```
