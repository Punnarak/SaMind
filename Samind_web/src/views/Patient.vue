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
          v-model="search"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      rounded="xl"
      v-model:page="page"
      :headers="headers"
      :items="filteredPatients"
      class="elevation-1"
      style="border-radius: 10px"
    >
      <template v-slot:item.mood="{ item }">
        <v-chip :color="getColor(item.columns.mood)">
          <v-icon left size="10px" style="margin-right: 10px"
            >mdi-circle</v-icon
          >
          {{
            item.columns.mood === "negative"
              ? "negative"
              : item.columns.mood === "neutral"
              ? "neutral"
              : "positive"
          }}
        </v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn
          icon="mdi-magnify"
          color="blue"
          size="30px"
          @click="
            this.$router.push({
              path: 'patientdashboard',
              query: {
                patientId: item.columns.patientId,
                name: item.columns.patientName,
                age: item.columns.age,
                mood: item.columns.mood,
              },
            })
          "
        />
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
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";

let patients = ref([]);
onMounted(async () => {
  const param = {
    therapist_id: 5555,
  };
  await axios
    .post("/patientList", param, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log("response", response.data);
      patients.value = response.data.map((patient, index) => ({
        no: patient.no,
        patientId: patient.patientId,
        name: patient.name,
        age: patient.age,
        mood: patient.mood,
        // action: patient.action, // Add this line if "action" property is present
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


let search = ref("");

const filteredPatients = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return patients.value.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
});

const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "no",
  },
  { title: "Patient ID", key: "patientId", align: "start", sortable: false },
  { title: "Patient Name", key: "name", sortable: false },
  { title: "Age", key: "age", align: "center", sortable: false },
  { title: "Mood", key: "mood", align: "center", sortable: false },
  { title: "Action", key: "action", align: "center", sortable: false },
];


// const patients = [
//   {
//     id: "01",
//     patientId: "PID001",
//     patientName: "Somsak Test1",
//     age: 24,
//     gender: "male",
//     mood: 4,
//     action: "1%",
//   },
//   {
//     id: "02",
//     patientId: "PID002",
//     patientName: "Somsee Test2",
//     age: 37,
//     gender: "female",
//     mood: 4.3,
//     action: "1%",
//   },
//   {
//     id: "03",
//     patientId: "PID003",
//     patientName: "Somchai Test3",
//     age: 23,
//     gender: "male",
//     mood: 6,
//     action: "7%",
//   },
//   {
//     id: "04",
//     patientId: "PID004",
//     patientName: "Somsom Test4",
//     age: 67,
//     gender: "male",
//     mood: 4.3,
//     action: "8%",
//   },
//   {
//     id: "05",
//     patientId: "PID005",
//     patientName: "Somcheng Test5",
//     age: 49,
//     gender: "female",
//     mood: 3.9,
//     action: "16%",
//   },
//   {
//     id: "06",
//     patientId: "PID006",
//     patientName: "Sompon Test6",
//     age: 94,
//     gender: "female",
//     mood: 0,
//     action: "0%",
//   },
//   {
//     id: "07",
//     patientId: "PID007",
//     patientName: "Somporn Test7",
//     age: 98,
//     gender: "male",
//     mood: 600,
//     action: "2%",
//   },
//   {
//     id: "08",
//     patientId: "PID008",
//     patientName: "Sommon Test8",
//     age: 87,
//     gender: "female",
//     mood: 400,
//     action: "45%",
//   },
//   {
//     id: "09",
//     patientId: "PID009",
//     patientName: "Somrak Test9",
//     age: 51,
//     gender: "male",
//     mood: 200,
//     action: "22%",
//   },
//   {
//     id: "10",
//     patientId: "PID010",
//     patientName: "Somjit Test10",
//     age: 65,
//     gender: "female",
//     mood: 7,
//     action: "6%",
//   },
//   {
//     id: "11",
//     patientId: "PID011",
//     patientName: "Somjit Test11",
//     age: 65,
//     gender: "female",
//     mood: 7,
//     action: "6%",
//   },
// ];

function getColor(mood) {
  if (mood === "negative") return "red";
  else if (mood === "neutral") return "orange";
  else return "green";
}
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
```