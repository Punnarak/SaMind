<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600"> TEST LIST </v-col>
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
          @click="createWithPopup = true"
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
      :items-per-page="itemsPerPage"
      class="elevation-1"
      style="border-radius: 10px; text-align: center"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          style="margin-right: 20px"
          @click="handleEditTest(item.columns.testname)"
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

        <v-icon
          style="margin-left: 20px"
          @click="handleCopyTest(item.columns.testname)"
          >mdi-content-copy</v-icon
        >

        <Transition name="delete-modal">
          <div v-if="deletePopup" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container delete">
                <div class="modal-header" align="left">
                  <slot class="popupheader" name="header">Confirm delete</slot>
                </div>
                <v-divider
                  class="mt-3"
                  color="black"
                  style="opacity: 1"
                ></v-divider>
                <div class="modal-body" style="margin-top: 6px" align="left">
                  <slot name="body"
                    >Are you sure you want to delete :
                    {{ selectTest.columns.testname }} ?</slot
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
                      @click="deletePopup = false"
                    >
                      Cancel
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="send-modal">
          <div v-if="sendPopup" class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container send">
                <div class="modal-header send-popup-header" align="start">
                  <slot class="popupheader" name="header"
                    >Send “{{ selectTest.columns.testname }}”
                  </slot>
                  <v-icon @click="sendPopup = false">mdi-close</v-icon>
                </div>

                <div class="modal-body" align="left">
                  <slot name="body"
                    ><v-text-field
                      class="mt-2 mb-3"
                      density="comfortable"
                      variant="outlined"
                      style="
                        height: 50px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        border: 1px solid #3c9bf2;
                      "
                      placeholder="Search Patient"
                      v-model="searchPatient"
                    ></v-text-field>
                    <div class="scroll" style="height: 190px; overflow-y: auto">
                      <div
                        class="mt-3 ml-4"
                        v-for="(patient, Index) in filteredPatients"
                        :key="Index"
                      >
                        <input
                          type="checkbox"
                          :id="'checkbox_' + Index"
                          :value="patient.patientId"
                          style="
                            width: 17px;
                            height: 17px;
                            flex-shrink: 0;
                            color: rgba(60, 155, 242, 1);
                          "
                          @change="handleCheckboxChange(patient.patientId)"
                          v-model="checkedNames"
                        />
                        <label class="ml-4">{{ patient.patientName }}</label>
                        <v-divider class="mt-3 mb-3" insert></v-divider>
                      </div>
                    </div>
                    <div class="detail">
                      <label class="text">Detail</label>
                      <v-col style="margin-top: -10px; margin-left: -10px">
                        <v-text-field
                          class="custom-placeholder mt-2"
                          density="comfortable"
                          rounded="lg"
                          variant="outlined"
                          placeholder="Enter Detail"
                          prepend-inner-icon="mdi-format-align-left"
                          style="width: 380px; height: 45px; flex-shrink: 0"
                          v-model="detail"
                          :rules="[detailValidate]"
                        >
                        </v-text-field>
                      </v-col>
                    </div>
                    <div class="duedate">
                      <label class="text">Due date</label>
                      <v-col style="margin-top: -10px; margin-left: -10px">
                        <v-text-field
                          class="custom-placeholder mt-2"
                          density="comfortable"
                          rounded="lg"
                          variant="outlined"
                          placeholder="Enter Date (DD/MM/YYYY)"
                          prepend-inner-icon="mdi-calendar"
                          style="width: 208px; height: 45px; flex-shrink: 0"
                          v-model="dueDate"
                          :rules="[dateValidation]"
                        >
                        </v-text-field>
                      </v-col>
                    </div>
                  </slot>
                </div>

                <div
                  class="modal-footer"
                  style="display: flex; justify-content: flex-end"
                >
                  <slot name="footer">
                    <v-col cols="5">
                      <v-btn
                        rounded="xl"
                        class="text-none mx-auto"
                        color="#569AFF"
                        block
                        size="large"
                        variant="flat"
                        style="
                          color: #fff;
                          font-size: 15px;
                          font-style: normal;
                          font-weight: 500;
                          line-height: normal;
                          letter-spacing: 0.13px;
                          margin-top: -40px;
                        "
                        @click="handleSendTestClick()"
                      >
                        Send Test</v-btn
                      >
                    </v-col>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="sending-modal">
          <div v-if="sendingPopup" class="modal-mask">
            <div class="modal-wrapper">
              <div
                class="modal-container send"
                style="
                  margin-top: 6px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                "
              >
                <label
                  class="popupheader"
                  style="font-size: 25px; margin-top: 150px"
                  >Sending Test</label
                >
                <div
                  ref="animationContainer"
                  style="width: 700px; height: 700px; margin-top: -140px"
                ></div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="done-modal">
          <div v-if="donePopup" class="modal-mask">
            <div class="modal-wrapper">
              <div
                class="modal-container send"
                style="
                  margin-top: 6px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                "
              >
                <label
                  class="popupheader"
                  style="font-size: 25px; margin-top: 140px"
                  >Test has been sent</label
                >
                <div
                  ref="animationContainer2"
                  style="width: 300px; height: 300px"
                ></div>
                <v-col cols="5">
                  <v-btn
                    rounded="xl"
                    class="text-none mx-auto"
                    color="#569AFF"
                    block
                    size="x-large"
                    variant="flat"
                    style="
                      color: #fff;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                      letter-spacing: 0.13px;
                      margin-top: -10px;
                      border-radius: 20px;
                    "
                    @click="donePopup = false"
                  >
                    Close</v-btn
                  >
                </v-col>
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
    <Transition name="createwith-modal">
      <div v-if="createWithPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container createwith">
            <div class="modal-header mt-5" align="center">
              <slot class="popupcreateheader" name="header"
                ><label
                  style="
                    color: #000;
                    text-align: center;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                  "
                  >Create Test</label
                ></slot
              >
            </div>

            <div class="modal-body mt-10" style="margin-top: 6px">
              <slot name="body">
                <v-row>
                  <v-col>
                    <v-btn
                      rounded="xl"
                      class="text-none mx-auto"
                      color="#569AFF"
                      block
                      size="x-large"
                      variant="flat"
                      style="width: 100px; height: 70px"
                      @click="createWithPopup = false"
                      to="createtest"
                    >
                      <v-icon class="mr-2" style="font-size: 27px"
                        >mdi-file-document-outline</v-icon
                      >New Test</v-btn
                    > </v-col
                  ><v-col>
                    <v-btn
                      rounded="xl"
                      class="text-none mx-auto"
                      color="rgba(0, 191, 99, 1)"
                      block
                      size="x-large"
                      variant="flat"
                      style="width: 100px; height: 70px"
                      :disabled="testDuplicate.length === 0"
                      @click="
                        (createWithPopup = false), (duplicatePopup = true)
                      "
                    >
                      <v-row align="center">
                        <v-icon class="mr-2" style="font-size: 27px"
                          >mdi-file-document-outline</v-icon
                        >
                        <div align="start">
                          <label style="font-size: 13px; display: block">
                            Duplicate from
                          </label>
                          <label style="font-size: 13px; display: block">
                            Other Test</label
                          >
                        </div></v-row
                      >
                    </v-btn></v-col
                  ></v-row
                >
              </slot>
            </div>

            <div class="modal-footer" align="center">
              <slot name="footer">
                <button
                  class="modal-default-button-duplicate text mt-5"
                  style="
                    color: #858585;
                    text-align: center;
                    font-size: 17px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 24px; /* 160% */
                  "
                  @click="createWithPopup = false"
                >
                  Cancel
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="duplicate-modal">
      <div v-if="duplicatePopup" class="modal-mask-duplicate">
        <div class="modal-wrapper">
          <div class="modal-container createwith">
            <div class="modal-header mt-5" align="start">
              <slot class="popupcreateheader" name="header"
                ><label
                  class="ml-5"
                  style="
                    color: #000;
                    text-align: center;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                  "
                  >Duplicate Test</label
                ></slot
              >
            </div>

            <div class="modal-body mt-5" style="margin-top: 6px">
              <slot name="body">
                <v-select
                  class="dropdown-list mt-4 ml-5"
                  variant="outlined"
                  rounded="lg"
                  style="
                    width: 330px;
                    height: 50px;
                    border-radius: 10px;
                    z-index: 9999;
                    position: relative;
                  "
                  v-model="selectedDuplicateTest"
                  :items="testDuplicate"
                  placeholder="Select Test"
                ></v-select
              ></slot>
            </div>

            <div class="modal-footer" align="center">
              <slot name="footer">
                <button
                  class="modal-default-button-duplicate text mt-10 mr-16"
                  style="
                    color: rgba(60, 155, 242, 1);
                    text-align: center;
                    font-size: 17px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 24px; /* 160% */
                  "
                  @click="
                    (duplicatePopup = false),
                      handleDuplicateTest(selectedDuplicateTest)
                  "
                >
                  Next
                </button>

                <button
                  class="modal-default-button-duplicate text mt-5 ml-16"
                  style="
                    color: #858585;
                    text-align: center;
                    font-size: 17px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 24px; /* 160% */
                  "
                  @click="duplicatePopup = false"
                >
                  Cancel
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </v-col>
</template>

<script>
let checkedNames = ref([]);
let checkedNamesAfter = ref([]);
import { watchEffect } from "vue";
import moment from "moment";
import axios from "../axios.js";
export default {
  props: {
    createWithPopup: Boolean,
    duplicatePopup: Boolean,
    deletePopup: Boolean,
    sendPopup: Boolean,
  },
  data() {
    return {
      selectedDuplicateTest: null,
      selectTest: [],
      sendPopup: false,
      sendingPopup: false,
      dueDate: null,
      donePopup: false,
      detail: "",
      // checkedNames: [],
      dateValidate: false,
      // testDuplicate: [],
    };
  },
  methods: {
    handleDuplicateTest(testName) {
      console.log("testName in testlist page", testName);
      this.$router.push({
        name: "createtest", // Use the route name instead of path
        query: {
          testName: testName,
        },
      });
    },
    Delete(question, selectTest) {
      console.log("selectTest", selectTest);
      const type = {
        therapistId: localStorage.getItem("id"),
        type: selectTest.columns.testname,
      };
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
    },
    handleEditTest(testName) {
      console.log("testName in testlist page", testName);
      this.$router.push({
        name: "edittest",
        query: {
          testName: testName,
        },
      });
    },
    handleCopyTest(testName) {
      console.log("testName in testlist page", testName);
      this.$router.push({
        name: "createtest",
        query: {
          testName: testName,
        },
      });
    },
    handleCheckboxChange(patientId) {
      const index = checkedNamesAfter.value.indexOf(patientId);
      if (index === -1) {
        // If the patientId is not in the array, add it
        checkedNamesAfter.value.push(patientId);
      } else {
        // If the patientId is already in the array, remove it
        checkedNamesAfter.value.splice(index, 1);
      }
      console.log(
        "checkName, chekNameafter",
        checkedNames.value,
        checkedNamesAfter.value
      );
    },
    dateValidation(value) {
      const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!value) {
        this.dateValidate = false;
        return "Please enter a date";
      } else {
        this.dateValidate = true;
      }

      if (!dateRegex.test(value)) {
        this.dateValidate = false;
        return "Date must be in the format DD/MM/YYYY";
      } else {
        this.dateValidate = true;
      }

      // Additional check for valid date
      const parts = value.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        this.dateValidate = false;
        return "Invalid date";
      } else {
        this.dateValidate = true;
      }

      // const inputDate = moment(new Date(year, month - 1, day)).format(
      //   "DD/MM/YYYY"
      // );
      const inputDate = new Date(year, month - 1, day);
      const currentDate = new Date();
      // const currentDate = moment(new Date()).format("DD/MM/YYYY");
      if (
        inputDate.getDate() !== day ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getFullYear() !== year ||
        inputDate < currentDate
      ) {
        this.dateValidate = false;
        return "Invalid date or past date";
      } else {
        this.dateValidate = true;
      }

      return true;
    },
    detailValidate(value) {
      if (!value) {
        return "Please enter a detail";
      }
      // return true;
    },
    handleSendTestClick() {
      console.log(
        "check",
        this.dateValidate,
        checkedNames.value.length,
        this.detail
      );
      if (
        this.dateValidate === false ||
        checkedNames.value.length === 0 ||
        this.detail == ""
      ) {
      } else {
        let param = {
          therapistId: localStorage.getItem("id"),
          testName: this.selectTest.columns.testname,
          patientId: checkedNames.value,
          detail: this.detail,
          dueDate: this.dueDate,
        };
        axios
          .post("/therapistSendTest", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("response", response.data);
            console.log("Selected Patients IDs:", checkedNames.value);
            this.sendPopup = false;
            this.sendingPopup = true;
            checkedNames.value = [];
            this.detail = "";

            this.loadSendingAnimation();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },

    loadSendingAnimation() {
      this.$nextTick(() => {
        const animationContainer = this.$refs.animationContainer;
        console.log("Animation Container:", animationContainer);

        lottie.loadAnimation({
          container: animationContainer,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationpath,
        });

        setTimeout(() => {
          this.sendingPopup = false;
          this.donePopup = true;
          // this.checkedNames = []; ---> อย่าลืมเคลียร์ค่าผู้ป่วยที่เลือกในแต่ละรอบ
          this.dueDate = null;
          this.loadSendingAnimation2();
        }, 3000);
      });
    },
    loadSendingAnimation2() {
      this.$nextTick(() => {
        const animationContainer2 = this.$refs.animationContainer2;
        console.log("Animation Container2:", animationContainer2);

        lottie.loadAnimation({
          container: animationContainer2,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationpath2,
        });
      });
    },
  },
  created() {
    axios
      .post("/refreshToken", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("refresh Token", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
watchEffect(() => {
  checkedNames.value = [...checkedNamesAfter.value];
});
</script>
<script setup>
import { ref, onMounted, computed } from "vue";
import lottie from "lottie-web";
import animationpath from "../assets/sending.json";
import animationpath2 from "../assets/senddone.json";

let test = ref([]);
// let test = ref([
//   { no: 1, testname: "Test 1" },
//   { no: 2, testname: "Test 2" },
//   { no: 3, testname: "Test 3" },
// ]);

let patients = ref();
// []
let testDuplicate = ref([]);
let searchPatient = ref("");
const filteredPatients = computed(() => {
  const searchTerm = searchPatient.value.toLowerCase();
  return patients.value.filter((item) =>
    item.patientName.toLowerCase().includes(searchTerm)
  );
});

onMounted(async () => {
  // patients.value = [
  //   {
  //     patientId: "124",
  //     patientName: "Somsak Test1",
  //   },
  //   {
  //     patientId: "125",
  //     patientName: "Somsak Test1",
  //   },
  //   {
  //     patientId: "126",
  //     patientName: "Somsak Test1",
  //   },
  //   {
  //     patientId: "127",
  //     patientName: "Somsak Test1",
  //   },
  // ];
  const param = {
    therapist_id: localStorage.getItem("id"),
  };
  await axios
    .post("/allTest", param, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log("response", response.data);
      test.value = response.data.map((patient, index) => ({
        no: patient.no,
        testname: patient.testname,
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
        patientName: patient.name,
        patientId: patient.patientId,
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  testDuplicate.value = test.value
    ? test.value.map((testItem) => testItem.testname)
    : null;
});

// onMounted(async () => {
//   try {
//     const response = await axios.get("/questiontype", {
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//       },
//     });
//     console.log("questions:", response.data);
//     const testmap = response.data.map((question, index) => ({
//       id: index + 1,
//       testName: question,
//     }));
//     console.log("testmap:", testmap);
//     test.value = testmap;
//     console.log("test:", test);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "no",
  },
  { title: "Test Name", key: "testname", sortable: false, align: "center" }, // Update key to "testName"
  { title: "Action", key: "action", sortable: false, align: "center" },
];

let search = ref("");

const filteredTest = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return test.value.filter((item) =>
    item.testname.toLowerCase().includes(searchTerm)
  );
});
</script>
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

.modal-mask-duplicate {
  position: fixed;
  top: 0;
  z-index: 999;
  /* margin-top: -280px; */
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-mask {
  position: fixed;
  z-index: 999;
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
  height: 160px;
}

.send {
  height: 560px;
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
