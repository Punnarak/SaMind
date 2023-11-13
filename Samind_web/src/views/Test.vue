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
      style="border-radius: 10px; text-align: center"
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
        <v-icon @click="(deletePopup = true), (selectTest = item)"
          >mdi-delete</v-icon
        >
        <v-icon
          style="margin-left: 20px"
          @click="(sendPopup = true), (selectTest = item)"
          >mdi-send</v-icon
        >
        <Transition name="modal">
          <div v-if="deletePopup" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
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
                    {{ item.columns.testName }} ?</slot
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

        <Transition name="modal">
          <div v-if="sendPopup" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header" align="start">
                  <slot class="popupheader" name="header"
                    >Send “{{ item.columns.testName }}”
                  </slot>
                </div>

                <div class="modal-body" align="start">
                  <slot name="body"
                    ><v-text-field
                      class="mt-2"
                      density="comfortable"
                      variant="Solo"
                      style="
                        height: 50px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        border: 1px solid #3c9bf2;
                      "
                      placeholder="Search Patient"
                      v-model="searchPatient"
                    ></v-text-field>
                    <vue-custom-scrollbar
                      class="scroll-area"
                      :settings="settings"
                      @ps-scroll-y="scrollHanle"
                    ></vue-custom-scrollbar>
                    <div
                      class="mt-3 ml-4"
                      v-for="(patient, Index) in patients"
                      :key="Index"
                    >
                      <input
                        type="checkbox"
                        id="Index"
                        value="patient"
                        style="width: 17px; height: 17px; flex-shrink: 0"
                        color="
                      rgba(60, 155, 242, 1)"
                        v-model="checkedNames"
                      />
                      <label class="ml-4">{{ patient.patientName }}</label>
                      <v-divider class="mt-3 mb-3" insert></v-divider></div
                  ></slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button
                      class="modal-default-button"
                      style="color: red"
                      @click="Delete(item, selectTest), (sendPopup = false)"
                    >
                      Send
                    </button>
                    <button
                      class="modal-default-button mr-5"
                      style="color: #00bf63"
                      @click="Delete(item, selectTest), (sendPopup = false)"
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

<script>
export default {
  props: {
    deletePopup: Boolean,
    sendPopup: Boolean,
  },
  data() {
    return {
      selectTest: [],
    };
  },
};
</script>
<script setup>
import { ref } from "vue";
import axios from "../axios.js";
import { onMounted, computed } from "vue";
// let test = ref([]);
let test = ref([
  {
    id: 1,
    testName: "Test1",
    action: "1",
  },
]);

const patients = [
  {
    id: "01",
    patientId: "PID001",
    patientName: "Somsak Test1",
    age: 24,
    gender: "male",
    mood: 4,
    action: "1%",
  },
  {
    id: "02",
    patientId: "PID002",
    patientName: "Somsee Test2",
    age: 37,
    gender: "female",
    mood: 4.3,
    action: "1%",
  },
  {
    id: "03",
    patientId: "PID003",
    patientName: "Somchai Test3",
    age: 23,
    gender: "male",
    mood: 6,
    action: "7%",
  },
  {
    id: "04",
    patientId: "PID004",
    patientName: "Somsom Test4",
    age: 67,
    gender: "male",
    mood: 4.3,
    action: "8%",
  },
  {
    id: "05",
    patientId: "PID005",
    patientName: "Somcheng Test5",
    age: 49,
    gender: "female",
    mood: 3.9,
    action: "16%",
  },
  {
    id: "06",
    patientId: "PID006",
    patientName: "Sompon Test6",
    age: 94,
    gender: "female",
    mood: 0,
    action: "0%",
  },
  {
    id: "07",
    patientId: "PID007",
    patientName: "Somporn Test7",
    age: 98,
    gender: "male",
    mood: 600,
    action: "2%",
  },
  {
    id: "08",
    patientId: "PID008",
    patientName: "Sommon Test8",
    age: 87,
    gender: "female",
    mood: 400,
    action: "45%",
  },
  {
    id: "09",
    patientId: "PID009",
    patientName: "Somrak Test9",
    age: 51,
    gender: "male",
    mood: 200,
    action: "22%",
  },
  {
    id: "10",
    patientId: "PID010",
    patientName: "Somjit Test10",
    age: 65,
    gender: "female",
    mood: 7,
    action: "6%",
  },
];
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
    align: "center",
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

function Delete(question, selectTest) {
  console.log("selectTest", selectTest);
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

.popupheader {
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 452px;
  height: 463px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin: 0px auto;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
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
