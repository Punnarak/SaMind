<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col
        cols="6"
        style="font-weight: 600; font-size: 20px"
        class="mt-5 mb-5"
      >
        Patient Referral
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-card
      rounded="xl"
      style="
        height: 450px;
        width: auto;
        padding-left: 60px;
        padding-right: 60px;
      "
      align="center"
    >
      <v-col align="center" style="align-self: center">
        <v-row>
          <v-col col="2" align="left" style="top: 0">
            <label style="font-weight: bold">Patient</label>
            <label style="color: red">*</label>
            <v-select
              class="mt-4 mb-16"
              variant="outlined"
              rounded="lg"
              style="width: 245px; height: 50px; border-radius: 10px"
              v-model="selectedPatient"
              :items="patientOptions"
              placeholder="Select patient"
              :rules="selectPatientRules"
            ></v-select>
            <label style="font-weight: bold">Refer To Doctor</label>
            <label style="color: red">*</label>
            <v-select
              class="mt-4"
              variant="outlined"
              rounded="lg"
              style="width: 245px; height: 50px; border-radius: 10px"
              v-model="selectedDoctor"
              :items="doctorOptions"
              placeholder="Select Doctor"
              :rules="selectDoctorRules"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>

          <v-col class="" align="left">
            <label style="font-weight: bold"> Additional Information </label>
            <v-text-field
              class="mt-4"
              variant="outlined"
              rounded="lg"
              style="border-radius: 10px; width: 400px; height: 400px"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          rounded="xl"
          class="send text-none"
          size="x-large"
          variant="flat"
          to="patient"
        >
          Send Referral<v-icon class="ml-5">mdi-share-outline</v-icon>
        </v-btn>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      bookday: "",
      selectedPatient: null,
      selectedDoctor: null,
      patientOptions: ["Somsak", "Somsee", "Somjai"],
      doctorOptions: ["Dr. Somsak", "Dr. Somsee", "Dr. Somjai"],
      selectPatientRules: [
        (value) => {
          if (value) return true;
          return "You must enter a patient.";
        },
      ],
      selectDoctorRules: [
        (value) => {
          if (value) return true;
          return "You must enter a doctor.";
        },
      ],
    };
  },
  created() {},
  computed: {},

  methods: {},
};
</script>

<style scoped>
.send {
  border-radius: 20px;
  background: #569aff;
  color: white;

  /* width: 141px;
  height: 54px; */
  flex-shrink: 0;
  margin-top: -170px;
}
</style>
