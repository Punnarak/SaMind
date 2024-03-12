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
          @click="clear(), (createPopup = true)"
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
              : item.columns.mood === "positive"
              ? "positive"
              : "-"
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
          @click="handleEditAccount(item.columns), (editPopup = true)"
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
                    {{ this.selectPatient.columns.name }} ?</slot
                  >
                </div>

                <div class="modal-footer" style="margin-bottom: 40px">
                  <slot name="footer">
                    <button
                      class="modal-default-button"
                      style="color: red"
                      @click="
                        Delete(item, selectPatient), (deletePopup = false)
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
                >Create Patient Account</slot
              >
              <v-icon style="" @click="createPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="Gender">
                    <label class="text title">Gender</label>
                    <v-col style="margin-top: -18px; margin-left: -10px">
                      <v-select
                        class="mt-4"
                        variant="outlined"
                        density="comfortable"
                        rounded="lg"
                        style="width: 150px; height: 45px; border-radius: 10px"
                        v-model="gender"
                        :items="['Female', 'Male']"
                        placeholder="Select Gender"
                        :rules="genderValidation"
                      >
                      </v-select>
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
                        placeholder="Enter Patient Firstname"
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
                        placeholder="Enter Patient Lastname"
                        style="width: 245px; height: 45px; flex-shrink: 0"
                        v-model="lastName"
                        :rules="lastNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
                <div
                  style="display: flex; flex-direction: row; margin-bottom: 8px"
                >
                  <div class="born">
                    <label class="text title">Birth Date</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Patient Birth Date"
                        style="width: 200px; height: 45px; flex-shrink: 0"
                        v-model="born"
                        :rules="bornValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="Tel">
                    <label class="text title">Phone Number</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Patient Phone Number"
                        style="width: 200px; height: 45px; flex-shrink: 0"
                        v-model="phone"
                        :rules="phoneValidation"
                        maxlength="10"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="therapist">
                    <label class="text title">
                      <v-icon>mdi-stethoscope</v-icon> Therapist</label
                    >
                    <v-col style="margin-top: -20px">
                      <v-select
                        class="mt-4"
                        variant="outlined"
                        density="comfortable"
                        rounded="lg"
                        style="width: 235px; height: 45px; border-radius: 10px"
                        v-model="selectTherapist"
                        :items="options"
                        placeholder="Select Therapist"
                        :rules="therapistValidation"
                      >
                      </v-select>
                    </v-col>
                  </div>
                </div>
                <!-- <div style="display: flex; flex-direction: row"> -->
                <div class="username">
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
                      placeholder="Enter Patient Email"
                      style="width: 670px; height: 45px; flex-shrink: 0"
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
                      placeholder="Enter Patient Password"
                      style="
                        width: 670px;
                        height: 45px;
                        flex-shrink: 0;
                        margin-bottom: 8px;
                      "
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
              style="
                display: flex;
                justify-content: flex-end;
                margin-top: -50px;
              "
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
                      margin-top: 25px;
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

    <Transition name="edit-modal">
      <div v-if="editPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container create">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Edit Patient Account</slot
              >
              <v-icon @click="editPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="TherapistId">
                    <label class="text title">Patient ID</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        disabled="true"
                        placeholder="Enter Patient ID"
                        style="width: 100px; height: 45px; flex-shrink: 0"
                        v-model="patientId"
                        :rules="patientIdValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="Gender">
                    <label class="text title">Gender</label>
                    <v-col style="margin-top: -18px; margin-left: -10px">
                      <v-select
                        class="mt-4"
                        variant="outlined"
                        density="comfortable"
                        rounded="lg"
                        style="width: 130px; height: 45px; border-radius: 10px"
                        v-model="gender"
                        :items="['Female', 'Male']"
                        placeholder="Select Gender"
                        :rules="genderValidation"
                      >
                      </v-select>
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
                        placeholder="Enter Patient Firstname"
                        style="width: 200px; height: 45px; flex-shrink: 0"
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
                        placeholder="Enter Patient Lastname"
                        style="width: 200px; height: 45px; flex-shrink: 0"
                        v-model="lastName"
                        :rules="lastNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
                <div
                  style="display: flex; flex-direction: row; margin-bottom: 8px"
                >
                  <div class="born">
                    <label class="text title">Birth Date</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Patient Birth Date"
                        style="width: 200px; height: 45px; flex-shrink: 0"
                        v-model="born"
                        :rules="bornValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="Tel">
                    <label class="text title">Phone Number</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Patient Phone Number"
                        style="width: 200px; height: 45px; flex-shrink: 0"
                        v-model="phone"
                        :rules="phoneValidation"
                        maxlength="10"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="therapist">
                    <label class="text title">
                      <v-icon>mdi-stethoscope</v-icon> Therapist</label
                    >
                    <v-col style="margin-top: -20px">
                      <v-select
                        class="mt-4"
                        variant="outlined"
                        density="comfortable"
                        rounded="lg"
                        style="width: 235px; height: 45px; border-radius: 10px"
                        v-model="selectTherapist"
                        :items="options"
                        placeholder="Select Therapist"
                        :rules="therapistValidation"
                      >
                      </v-select>
                    </v-col>
                  </div>
                </div>
                <!-- <div style="display: flex; flex-direction: row"> -->
                <div class="username">
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
                      placeholder="Enter Patient Email"
                      style="width: 670px; height: 45px; flex-shrink: 0"
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
                      placeholder="Enter Patient Password"
                      style="
                        width: 670px;
                        height: 45px;
                        flex-shrink: 0;
                        margin-bottom: 8px;
                      "
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
                      margin-top: -50px;
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
// import { ref, computed, onMounted } from "vue";
// import axios from "../axios.js";

function getColor(mood) {
  if (mood === "negative") return "red";
  else if (mood === "neutral") return "orange";
  else if (mood === "positive") return "green";
  else return "lightgray";
}
</script>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";
let patients = ref(
  // []
  [
    {
      no: "01",
      therapist: "somesee",
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
  { title: "Therapist", key: "therapist", align: "start", sortable: false },
  { title: "Patient ID", key: "patientId", align: "start", sortable: false },
  { title: "Patient Name", key: "name", sortable: false },
  { title: "Age", key: "age", align: "center", sortable: false },
  { title: "Mood", key: "mood", align: "center", sortable: false },
  { title: "Action", key: "action", align: "center", sortable: false },
];

export default {
  props: {
    deletePopup: Boolean,
  },
  async created() {
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
    this.hospitalName = "Siriraj Hospital";
    const param = {
      hospitalName: this.hospitalName,
    };
    await axios
      .post("/adPatientView", param, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        patients.value = response.data.map((patient, index) => ({
          no: patient.No,
          patientId: patient.patientID,
          name: patient.patientName,
          age: patient.age,
          mood: patient.mood,
          therapist: patient.therapistName,
          gender: patient.gender,
          email: patient.email,
          phone: patient.phone,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    await axios
      .post("/adTherapistAll", param, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        this.options = response.data.therapistAll;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  data() {
    return {
      hospitalName: "",
      selectedDuplicateTest: null,
      selectTherapist: "",
      options: ["Dr. Somsak", "Dr. Somsee", "Dr. Somjai"],
      selectPatient: [],
      createPopup: false,
      editPopup: false,
      patientId: "",
      patientIdValidation: [
        (value) => {
          if (!value) {
            return "please enter Patient ID";
          } else {
            return true;
          }
        },
      ],
      gender: "",
      genderValidation: [
        (value) => {
          if (!value) {
            return "please select Gender";
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
      born: "",
      checkBirthDate: false,
      bornValidation: [
        (value) => {
          const dateFormat =
            /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
          const enteredDateParts = value.split("/");
          const enteredDay = parseInt(enteredDateParts[0]);
          const enteredMonth = parseInt(enteredDateParts[1]) - 1; // Months are zero-indexed
          const enteredYear = parseInt(enteredDateParts[2]);
          const enteredDate = new Date(enteredYear, enteredMonth, enteredDay);
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          if (!value) {
            this.checkBirthDate = false;
            return "Please enter a birth date.";
          } else {
            if (!dateFormat.test(value)) {
              this.checkBirthDate = false;
              return "Please enter a valid date format (e.g., DD/MM/YYYY).";
            }
            if (enteredDate > currentDate) {
              this.checkBirthDate = false;
              return "Birth date cannot be in the future.";
            }
            this.checkBirthDate = true;
            return true;
          }
        },
      ],

      phone: "",
      phoneValidation: [
        (value) => !!value || "please enter Phone number", // Required validation
        (value) => /^\d{10}$/.test(value) || "Phone number must be 10 digits", // Length validation
      ],
      checkEmail: false,
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
      therapistValidation: [
        (value) => {
          if (!value) {
            return "please select therapist";
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
        this.gender === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.phone === "" ||
        this.phone === undefined ||
        this.email === "" ||
        this.checkEmail === false ||
        this.password === "" ||
        this.selectTherapist === "" ||
        this.born === "" ||
        this.checkBirthDate === false
      ) {
      } else {
        console.log(
          "Create Patient Account",
          this.firstName,
          this.lastName,
          this.email,
          this.password,
          this.selectTherapist,
          this.born
        );
        let param = {
          fname: this.firstName,
          lname: this.lastName,
          phone: this.phone,
          gender: this.gender,
          born: this.born,
          email: this.email,
          password: this.password,
          therapistName: this.selectTherapist,
        };
        console.log("param", param);
        axios
          .post("/adCreatePatient", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Create success", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        this.gender = "";
        this.patientId = "";
        this.firstName = "";
        this.lastName = "";
        this.phone = "";
        this.email = "";
        this.password = "";
        this.selectTherapist = "";
        this.born = "";
        this.checkEmail = false;
        this.createPopup = false;
        this.checkBirthDate = false;
        window.location.reload();
      }
    },
    handleEditAccount(patient) {
      console.log("patientInfo For Edit", patient);
      this.patientId = patients.value.find(
        (item) => item.patientId === patient.patientId
      ).patientId;
      this.gender = patients.value.find(
        (item) => item.patientId === patient.patientId
      ).gender;
      let name = patients.value
        .find((item) => item.patientId === patient.patientId)
        .name.split(" ");

      this.firstName = name[0];
      this.lastName = name[1];
      this.phone = patients.value.find(
        (item) => item.patientId === patient.patientId
      ).phone;
      this.email = patients.value.find(
        (item) => item.patientId === patient.patientId
      ).email;
      this.password = "";
      this.checkEmail = true;
      this.selectTherapist = patients.value.find(
        (item) => item.patientId === patient.patientId
      ).therapist;
      this.born = "12/02/2001";

      console.log(
        "Edit Patient Account",
        this.patientId,
        this.firstName,
        this.lastName,
        this.phone,
        this.email,
        this.password
      );
    },
    handleUpdateAccount() {
      if (
        this.patientId === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.email === "" ||
        this.phone === "" ||
        this.phone === undefined ||
        this.checkEmail === false ||
        this.selectTherapist === "" ||
        this.born === "" ||
        this.checkBirthDate === false
      ) {
      } else {
        let param;
        if (this.password !== "") {
          param = {
            patientID: this.patientId,
            fname: this.firstName,
            lname: this.lastName,
            phone: this.phone,
            gender: this.gender,
            born: this.born,
            email: this.email,
            password: this.password,
            therapistName: this.selectTherapist,
          };
        } else {
          param = {
            patientID: this.patientId,
            fname: this.firstName,
            lname: this.lastName,
            phone: this.phone,
            gender: this.gender,
            born: this.born,
            email: this.email,
            therapistName: this.selectTherapist,
          };
        }
        console.log("param", param);
        axios
          .post("/adEditPersonalData", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Update success", response.data);
            console.log(
              "Update Patient Account",
              this.patientId,
              this.firstName,
              this.lastName,
              this.phone,
              this.email,
              this.password
            );
            this.patientId = "";
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.phone = "";
            this.born = "";
            this.gender = "";
            this.selectTherapist = "";
            this.checkBirthDate = false;
            this.checkEmail = false;
            this.editPopup = false;
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    Delete(patient, selectPatient) {
      console.log(patient);
      let param = {
        patientID: selectPatient.columns.patientId,
      };
      console.log(param);
      axios
        .post("/adDeletePatient", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("Delete success", patient, response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    clear() {
      this.gender = "";
      this.born = "";
      this.patientId = "";
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.selectTherapist = "";
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
.create {
  width: 740px;
  height: 540px;
}

.dropdown-list {
  position: fixed;
  z-index: 9999;
}

.delete {
  height: auto;
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
