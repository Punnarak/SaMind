<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600; font-size: 30px">Support</v-col>
    </v-row>
    <!-- <v-col cols="10"> -->
    <label style="font-size: 25px">
      หากพบปัญหา ระบบขัดข้อง ทำงานผิดพลาด ทำงานไม่ได้ ติตด่อ IT Support
      ได้ที่ช่องทางติดต่อด้านล่าง</label
    >
    <!-- </v-col> -->
    <v-row>
      <v-col cols="5">
        <label style="font-size: 25px">
          <label style="font-weight: 600">เบอร์โทรศัพท์:</label>
          0890999999</label
        >
        <br />
        <!-- </v-col> -->
        <!-- <v-col cols="4"> -->
        <label style="font-size: 25px">
          <label style="font-weight: 600">Email:</label>
          SaMind@Company.co.th</label
        >
        <!-- </v-col> -->
        <br />
        <!-- <v-col cols="3"> -->
        <label style="font-size: 25px">
          <label style="font-weight: 600">Line:</label> @SaMindCompany</label
        >
      </v-col>
    </v-row>
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
    therapist_id: localStorage.getItem("id"),
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
      this.therapistId = "1";
      this.firstName = therapist;
      this.lastName = "1";
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
        this.checkEmail === false ||
        this.password === ""
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
