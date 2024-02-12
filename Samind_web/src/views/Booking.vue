<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> Appointment </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="black"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          to="/dashboard/calendar"
        >
          <v-icon style="margin-right: 10px">mdi-close-circle-outline</v-icon
          >Cancel
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="#569AFF"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          @click="addAppointment"
          :disabled="addingAppointment"
        >
          <v-icon v-if="!addingAppointment" class="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m18.13 12l1.26-1.26c.44-.44 1-.68 1.61-.74V9l-6-6H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h6v-1.87l.13-.13H5V5h7v7h6.13M14 4.5l5.5 5.5H14V4.5m5.13 9.33l2.04 2.04L15.04 22H13v-2.04l6.13-6.13m3.72.36l-.98.98l-2.04-2.04l.98-.98c.19-.2.52-.2.72 0l1.32 1.32c.2.2.2.53 0 .72Z"
              />
            </svg>
          </v-icon>
          <div v-else>
            <!-- Loading animation (e.g., a spinner) here -->
            <v-progress-circular
              indeterminate
              color="white"
              size="24"
            ></v-progress-circular>
          </div>
          {{ addingAppointment ? "Adding..." : "Add" }}
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="mx-auto" cols="12" rounded="xl" style="height: 560px">
      <v-list lines="two">
        <v-list-subheader
          class="ml-3"
          style="
            font-family: 'Poppins', 'sans-serif';
            border-bottom-width: 1px;
            font-weight: bold;
          "
        >
          Appointment Detail
        </v-list-subheader>
        <v-divider insert></v-divider>
        <v-col class="ml-4" cols="12" sm="6" md="8">
          <label style="font-weight: bold">Patient</label>
          <label style="color: red">*</label>
          <v-select
            class="mt-2 mb-5"
            variant="outlined"
            rounded="lg"
            style="width: 245px; height: 50px; border-radius: 10px"
            v-model="selectedPatient"
            :items="options"
            placeholder="Select patient"
            :rules="selectPatientRules"
          ></v-select>

          <label style="font-weight: bold">Date</label>
          <v-text-field
            class="mt-2 mb-5"
            variant="outlined"
            rounded="lg"
            style="
              border-radius: 10px;
              background-color: #d9d9d9;
              color: #605b5b;
              height: 55px;
              border-color: #d1c9c9;
              width: 245px;
            "
            :disabled="true"
            v-model="bookday"
          ></v-text-field>
          <v-row align="center">
            <v-col cols="4">
              <!-- Start Time -->
              <label style="font-weight: bold">Start Time</label>
              <label style="color: red">*</label>
              <v-select
                class="mt-2 mb-5"
                variant="outlined"
                rounded="lg"
                style="width: 245px; height: 50px; border-radius: 10px"
                v-model="selectedStartTime"
                :items="timeOption"
                placeholder="Select Time"
                :rules="selectStartTimetRules"
              ></v-select>
            </v-col>

            <!-- Arrow Icon -->
            <v-col class="text-center mt-4" cols="2">
              <v-icon>mdi-arrow-right</v-icon>
            </v-col>

            <v-col cols="4">
              <!-- End Time -->
              <label style="font-weight: bold">End Time</label>
              <label style="color: red">*</label>
              <v-select
                :disabled="true"
                class="mt-2 mb-5"
                variant="outlined"
                rounded="lg"
                style="width: 245px; height: 50px; border-radius: 10px"
                v-model="calculatedEndTime"
                :items="timeOption"
                placeholder="Select Time"
                :rules="selectEndTimeRules"
              ></v-select>
            </v-col>
          </v-row>

          <label style="font-weight: bold"> Note </label>
          <label>(optional) </label>

          <v-text-field
            class="mt-4"
            variant="outlined"
            rounded="lg"
            style="border-radius: 10px; width: 400px; height: 220px"
            v-model="note"
          ></v-text-field>
        </v-col>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>

import axios from "../axios.js";

export default {
  data() {
    return {
      patients: null,
      bookday: "",
      selectedPatient: null,
      options: ["Somsak", "Somsee", "Somjai"],
      selectPatientRules: [
        (value) => {
          if (value) return true;
          return "You must enter a patient.";
        },
      ],
      selectedStartTime: null,
      selectedEndTime: null,
      timeOption: [
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
      ],
      selectStartTimetRules: [
        (value) => {
          if (value) return true;
          return "You must start time.";
        },
      ],
      selectEndTimeRules: [
        (value) => {
          if (value) return true;
          return "You must select end time.";
        },
      ],
      addingAppointment: false,
      note: "",
    };
  },
  created() {
    // Access the bookday parameter from the route
    this.bookday = this.$route.query.bookday; // Set it to an empty string if not provided
    console.log("this.bookday", this.bookday);
    const param = {
      therapist_id: 5555,
    };
    axios
      .post("/patientList", param, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        this.options = response.data.map(patient => patient.name);
        this.patients = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  computed: {
    calculatedEndTime() {
      if (this.selectedStartTime) {
        // Assuming timeOption is in the format "HH:mm"
        const startTime = this.selectedStartTime.split(":");
        const endHour = parseInt(startTime[0]) + 1;
        const endTime =
          endHour.toString().padStart(2, "0") + ":" + startTime[1];
        return endTime;
      }
      return null;
    },
  },

  methods: {
    async addAppointment() {
      const foundPatient = this.patients.find(patient => patient.name === this.selectedPatient);
      const param = {
        therapistId: 5555,
        patientId: foundPatient.patientId,
        date: this.bookday,
        startTime: this.selectedStartTime,
        note: this.note  
      };
      await axios
        .post("/therapistAddAppoint", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(async(response) => {
          console.log("response", response.data);
          this.addingAppointment = true;
          // Simulate an asynchronous operation (e.g., an HTTP request)
          

          // Reset the loading state and provide feedback to the user
          this.addingAppointment = false;
          // this.$toast.success("Appointment added successfully"); // Use your preferred feedback mechanism
          await this.simulateAsyncOperation();
        })
        .catch((error) => {
          // console.error("Error:", error);
          // Handle the error and reset the loading state
          console.error("Error adding appointment:", error);
          this.addingAppointment = false;
          // this.$toast.error("Failed to add appointment"); // Use your preferred error handling and feedback mechanism
        });

    },
    async simulateAsyncOperation() {
      // Simulate an asynchronous operation
      return new Promise((resolve) => {
        setTimeout(resolve, 2000); // Simulate a 2-second delay
        this.$router.push({
          path: "/dashboard/calendar",
          query: {},
        });
      });
    },
  },
};
</script>

<style scoped>
.line {
  width: 40px;
  height: 2px; /* Adjust the height of the line as needed */
  background-color: #000; /* You can set your preferred color */
}
</style>
