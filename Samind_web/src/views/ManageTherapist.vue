<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600"> THERAPIST LIST </v-col>
      <v-col cols="5">
        <v-text-field
          class="mt-2"
          density="comfortable"
          rounded="xl"
          variant="outlined"
          placeholder="Search Therapist"
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
          @click="clear(), (createPopup = true)"
        >
          <v-icon>mdi-file-document-outline</v-icon>Create Therapist</v-btn
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
      <template v-slot:item.action="{ item }">
        <v-btn
          icon="mdi-pencil"
          color="blue"
          size="30px"
          style="margin-right: 20px"
          @click="(editPopup = true), handleEditAccount(item.columns)"
        />
        <v-btn
          icon="mdi-delete"
          color="blue"
          size="30px"
          @click="(deletePopup = true), (selectTherapist = item)"
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
                    {{ this.selectTherapist.columns.name }} ?</slot
                  >
                </div>

                <div class="modal-footer" style="margin-bottom: 40px">
                  <slot name="footer">
                    <button
                      class="modal-default-button"
                      style="color: red"
                      @click="
                        Delete(item, selectTherapist), (deletePopup = false)
                      "
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
    <Transition name="create-modal">
      <div v-if="createPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container create">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Create Therapist Account</slot
              >
              <v-icon @click="createPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="TherapistId">
                    <label class="text title">Therapist ID</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist ID"
                        style="width: 150px; height: 45px; flex-shrink: 0"
                        v-model="therapistId"
                        :rules="therapistIdValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="FirstName">
                    <label class="text title">First Name</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Firstname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="firstName"
                        :rules="firstNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="LastName">
                    <label class="text title">Last Name</label>
                    <v-col
                      style="
                        margin-top: -10px;
                        margin-left: -10px;
                        margin-bottom: 8px;
                      "
                    >
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Lastname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="lastName"
                        :rules="lastNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
                <!-- <div style="display: flex; flex-direction: row"> -->
                <div class="email">
                  <label class="text title">Email</label>
                  <v-col
                    style="
                      margin-top: -10px;
                      margin-left: -10px;
                      margin-bottom: 8px;
                    "
                  >
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Email"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="email"
                      :rules="emailValidation"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <div class="password">
                  <label class="text title">Password</label>
                  <v-col style="margin-top: -10px; margin-left: -10px">
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Password"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="password"
                      :rules="passwordValidation"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <!-- </div> -->
              </slot>
            </div>

            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
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
                    @click="handleCreateAccount()"
                  >
                    Create Account</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="Edit-modal">
      <div v-if="editPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container create">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Edit Therapist Account</slot
              >
              <v-icon @click="editPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="TherapistId">
                    <label class="text title">Therapist ID</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist ID"
                        style="width: 150px; height: 45px; flex-shrink: 0"
                        v-model="therapistId"
                        :rules="therapistIdValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="FirstName">
                    <label class="text title">First Name</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Firstname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="firstName"
                        :rules="firstNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="LastName">
                    <label class="text title">Last Name</label>
                    <v-col
                      style="
                        margin-top: -10px;
                        margin-left: -10px;
                        margin-bottom: 8px;
                      "
                    >
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Lastname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="lastName"
                        :rules="lastNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
                <!-- <div style="display: flex; flex-direction: row"> -->
                <div class="email">
                  <label class="text title">Email</label>
                  <v-col
                    style="
                      margin-top: -10px;
                      margin-left: -10px;
                      margin-bottom: 8px;
                    "
                  >
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Email"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="email"
                      :rules="emailValidation"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <div class="password">
                  <label class="text title">New Password</label>
                  <v-col style="margin-top: -10px; margin-left: -10px">
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Password"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="password"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <!-- </div> -->
              </slot>
            </div>

            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
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
                    @click="handleUpdateAccount()"
                  >
                    Edit Account</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </v-col>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";

let therapists = ref(
  // []
  [
    {
      no: "01",
      therapistId: "PID001",
      name: "Somsak Test1",
      email: "th1@gmail.com",
    },
    {
      no: "02",
      therapistId: "PID002",
      name: "Jane Doe",
      email: "th1@gmail.com",
    },
    {
      no: "03",
      therapistId: "PID003",
      name: "John Smith",
      email: "th1@gmail.com",
    },
    {
      no: "04",
      therapistId: "PID004",
      name: "Alice Johnson",
      email: "th1@gmail.com",
    },
    {
      no: "05",
      therapistId: "PID005",
      name: "Michael Brown",
      email: "th1@gmail.com",
    },
    {
      no: "06",
      therapistId: "PID006",
      name: "Emily Davis",
      email: "th1@gmail.com",
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
      therapists.value = response.data.map((patient, index) => ({
        no: patient.no,
        therapistId: patient.therapistId,
        name: patient.name,
        email: patient.email,
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

let search = ref("");

const filteredPatients = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return therapists.value.filter((item) =>
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
  {
    title: "Therapist ID",
    key: "therapistId",
    align: "start",
    sortable: false,
  },
  { title: "Therapist Name", key: "name", sortable: false },
  { title: "Email", key: "email", align: "start", sortable: false },
  { title: "Action", key: "action", align: "center", sortable: false },
];
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
      selectTherapist: [],
      createPopup: false,
      editPopup: false,
      therapistId: "",
      therapistIdValidation: [
        (value) => {
          if (!value) {
            return "please enter Therapist ID";
          } else {
            return true;
          }
        },
      ],
      firstName: "",
      firstNameValidation: [
        (value) => {
          if (!value) {
            return "please enter Firstname";
          } else {
            return true;
          }
        },
      ],
      lastName: "",
      lastNameValidation: [
        (value) => {
          if (!value) {
            return "please enter Lastname";
          } else {
            return true;
          }
        },
      ],
      email: "",
      emailValidation: [
        (value) => {
          if (!value) {
            this.checkEmail = false;
            return "You must enter an email address.";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this.checkEmail = false;
            return "Invalid email address. Please enter a valid email.";
          } else {
            this.checkEmail = true;
            return true;
          }
        },
      ],
      checkEmail: false,
      password: "",
      passwordValidation: [
        (value) => {
          if (!value) {
            return "please enter Password";
          } else {
            return true;
          }
        },
      ],
    };
  },
  methods: {
    handleCreateAccount() {
      if (
        this.therapistId === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.email === "" ||
        this.checkEmail === false ||
        this.password === ""
      ) {
      } else {
        console.log(
          "Create Therapist Account",
          this.therapistId,
          this.firstName,
          this.lastName,
          this.email,
          this.password
        );
        this.therapistId = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.checkEmail = false;
        this.createPopup = false;
      }
    },
    handleEditAccount(therapist) {
      let name = therapist.name.split(" ");
      this.therapistId = therapist.therapistId;
      this.firstName = name[0];
      this.lastName = name[1];
      this.email = "pun@gmail.com";
      this.password = "1";
      this.checkEmail = true;
      console.log(
        "Edit Therapist Account",
        this.therapistId,
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );
    },
    handleUpdateAccount() {
      if (
        this.therapistId === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.email === "" ||
        this.checkEmail === false
      ) {
      } else {
        console.log(
          "Update Therapist Account",
          this.therapistId,
          this.firstName,
          this.lastName,
          this.email,
          this.password
        );
        this.therapistId = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.checkEmail = false;
        this.editPopup = false;
      }
    },
    Delete(question, selectTherapist) {
      console.log("selectTherapist", selectTherapist);
      const type = { type: selectTherapist.columns.name };
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
    clear() {
      this.therapistId = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
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
.create-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: larger;
}

.title {
  font-weight: 500;
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
  /* height: 150px; */
  height: auto;
}

.create {
  width: 750px;
  height: 450px;
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
