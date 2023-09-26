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
          v-model="search"
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
      :items="filteredTest"
      class="elevation-1"
      style="border-radius: 10px"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          style="margin-right: 20px"
          @click="
            this.$router.push({
              path: `createtest`,
            })
          "
          >mdi-pencil</v-icon
        >
        <v-icon @click="Delete(item)">mdi-delete</v-icon>
        <v-icon style="margin-left: 20px">mdi-send</v-icon>
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
import axios from "../axios.js";
import { onMounted, computed } from "vue";
let test = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("/questiontype", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    console.log("questions:", response.data);
    const testmap = response.data.map((question, index) => ({
      id: index + 1,
      testName: question,
    }));
    console.log("testmap:", testmap);
    test.value = testmap;
    console.log("test:", test);
  } catch (error) {
    console.error("Error:", error);
  }
});

const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  {
    title: "No.",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Test Name", key: "testName", sortable: false, align: "center" }, // Update key to "testName"
  { title: "Action", key: "action", sortable: false, align: "center" },
];

let search = ref("");

const filteredTest = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return test.value.filter((item) =>
    item.testName.toLowerCase().includes(searchTerm)
  );
});

function Delete(question) {
  const type = { type: question.columns.testName };
  const typeJSON = JSON.stringify(type, null, 2);
  console.log("test", typeJSON);
  axios
    .delete("/questionsDel", {
      headers: {
        "Content-Type": "application/json",
      },
      data: typeJSON, // Send the data directly in the request body
    })
    .then((response) => {
      console.log("delete questions:", response);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
```
