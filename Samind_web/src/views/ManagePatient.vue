<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600"> PATIENTS LIST </v-col>
      <v-col cols="5">
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
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="#569AFF"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          @click="createWithPopup = true"
        >
          <v-icon>mdi-file-document-outline</v-icon>Create Patient</v-btn
        >
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
          style="margin-right: 20px"
          @click="
            this.$router.push({
              path: 'patientdashboard',
              query: {
                patientId: item.columns.patientId,
                name: item.columns.name,
                age: item.columns.age,
                mood: item.columns.mood,
              },
            })
          "
        />
        <v-btn
          icon="mdi-pencil"
          color="blue"
          size="30px"
          style="margin-right: 20px"
          @click="handleEditPaitent(item.columns.testname)"
        />
        <v-btn
          icon="mdi-delete"
          color="blue"
          size="30px"
          @click="(deletePopup = true), (selectPatient = item)"
        />

        <Transition name="delete-modal">
          <div v-if="deletePopup" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container delete">
                <div class="modal-header" align="start">
                  <slot class="popupheader" name="header">Confirm delete</slot>
                </div>
                <v-divider
                  class="mt-3"
                  color="black"
                  style="opacity: 1"
                ></v-divider>
                <div class="modal-body" style="margin-top: 6px" align="start">
                  <slot name="body"
                    >Are you sure you want to delete :
                    {{ item.columns.name }} ?</slot
                  >
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button
                      class="modal-default-button"
                      style="color: red"
                      @click="Delete(item, selectTest), (deletePopup = false)"
                    >
                      Delete
                    </button>
                    <button
                      class="modal-default-button mr-5"
                      style="color: #00bf63"
                      @click="Delete(item, selectTest), (deletePopup = false)"
                    >
                      Cancel
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </Transition>
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

let patients = ref(
  // []
  [
    {
      no: "01",
      patientId: "PID001",
      name: "Somsak Test1",
      age: 24,
      mood: 4,
    },
    {
      no: "02",
      patientId: "PID002",
      name: "Jane Doe",
      age: 36,
      mood: 3,
    },
    {
      no: "03",
      patientId: "PID003",
      name: "John Smith",
      age: 45,
      mood: 2,
    },
    {
      no: "04",
      patientId: "PID004",
      name: "Alice Johnson",
      age: 28,
      mood: 5,
    },
    {
      no: "05",
      patientId: "PID005",
      name: "Michael Brown",
      age: 52,
      mood: 1,
    },
    {
      no: "06",
      patientId: "PID006",
      name: "Emily Davis",
      age: 19,
      mood: 4,
    },
  ]
);
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

function getColor(mood) {
  if (mood === "negative") return "red";
  else if (mood === "neutral") return "orange";
  else return "green";
}
</script>
<script>
let checkedNames = ref([]);

import axios from "../axios.js";
export default {
  props: {
    deletePopup: Boolean,
  },
  data() {
    return {
      selectedDuplicateTest: null,
      selectPatient: [],
      sendPopup: false,
      sendingPopup: false,
      dueDate: null,
      donePopup: false,
    };
  },
  methods: {
    Delete(question, selectTest) {
      console.log("selectTest", selectTest);
      const type = { type: question.columns.testName };
      const typeJSON = JSON.stringify(type, null, 2);
      console.log("test", typeJSON);

      // axios
      //   .delete("/questionsDel", {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     data: typeJSON, // Send the data directly in the request body
      //   })
      //   .then((response) => {
      //     console.log("delete questions:", response);
      //     window.location.reload();
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });\
    },
    handleEditPaitent(testName) {
      console.log("testName in testlist page", testName);
      this.$router.push({
        name: "edittest",
        query: {
          testName: testName,
        },
      });
    },
  },
};
</script>
<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
<style scoped>
.custom-placeholder ::placeholder {
  font-size: 11.6px;
}
.send-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-family: "Poppins", sans-serif;
}
/* WebKit */
.scroll::-webkit-scrollbar {
  width: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #3c9bf2;
  border-radius: 4px;
}

:deep(.v-pagination__list) {
  justify-content: end;
}
.popupcreateheader {
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.popupheader {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 452px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin: 0px auto;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.createwith {
  height: 280px;
  border: 2px solid #3c9bf2;
}

.dropdown-list {
  position: fixed;
  z-index: 9999;
}

.delete {
  height: 150px;
}

.send {
  height: 463px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button-duplicate {
  float: center;
}
.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
```
