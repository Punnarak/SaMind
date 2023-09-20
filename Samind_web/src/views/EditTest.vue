<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> Edit Test </v-col>
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

    <v-sheet :elevation="1" :height="200" :width="200"> </v-sheet>
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
  { title: "Patient ID", key: "patientId", sortable: false },
  { title: "Patient Name", key: "patientName", sortable: false },
  { title: "Age", key: "age", sortable: false },
  { title: "Mood", key: "mood", sortable: false },
  { title: "Action", key: "action", sortable: false },
];
const patients = [
  {
    id: "01",
    patientId: "PID001",
    patientName: 6,
    age: 24,
    mood: 4,
    action: "1%",
  },
  {
    id: "02",
    patientId: "PID002",
    patientName: 9,
    age: 37,
    mood: 4.3,
    action: "1%",
  },
  {
    id: "03",
    patientId: "PID003",
    patientName: 16,
    age: 23,
    mood: 6,
    action: "7%",
  },
  {
    id: "04",
    patientId: "PID004",
    patientName: 3.7,
    age: 67,
    mood: 4.3,
    action: "8%",
  },
  {
    id: "05",
    patientId: "PID005",
    patientName: 16,
    age: 49,
    mood: 3.9,
    action: "16%",
  },
  {
    id: "06",
    patientId: "PID006",
    patientName: 0,
    age: 94,
    mood: 0,
    action: "0%",
  },
  {
    id: "07",
    patientId: "PID007",
    patientName: 0.2,
    age: 98,
    mood: 600,
    action: "2%",
  },
  {
    id: "08",
    patientId: "PID008",
    patientName: 3.2,
    age: 87,
    mood: 400,
    action: "45%",
  },
  {
    id: "09",
    patientId: "PID009",
    patientName: 25,
    age: 51,
    mood: 200,
    action: "22%",
  },
  {
    id: "10",
    patientId: "PID010",
    patientName: 26,
    age: 65,
    mood: 7,
    action: "6%",
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
