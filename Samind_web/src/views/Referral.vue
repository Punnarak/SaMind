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
      style="height: 450px; width: auto; display: flex; padding-left: 60px"
      align="center"
    >
      <v-col align="center" style="align-self: center; flex: 1">
        <v-row>
          <v-col col="2" align="left" style="padding-top: 80px">
            <label style="font-weight: bold">Patient</label>
            <label style="color: red">*</label>
            <v-select
              class="mt-4 mb-6"
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
              class="mt-4 mb-6"
              variant="outlined"
              rounded="lg"
              style="width: 245px; height: 50px; border-radius: 10px"
              v-model="selectedDoctor"
              :items="doctorOptions"
              placeholder="Select Doctor"
              :rules="selectDoctorRules"
            ></v-select>

            <label style="font-weight: bold"> Additional Information </label>
            <v-text-field
              class="mt-4 mr-9"
              variant="outlined"
              rounded="lg"
              style="border-radius: 10px; width: 450px; height: 200px"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        align="center"
        style="
          background-color: rgba(190, 216, 255, 1);
          width: 25%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <v-btn
          rounded="xl"
          class="send text-none"
          size="x-large"
          variant="flat"
          to="patient"
        >
          Send Referral
        </v-btn>
        <img
          src="../assets/Referral/talk.png"
          style="
            position: absolute;
            width: 80px;
            margin-left: -135px;
            margin-top: -100px;
          "
        />
        <img
          src="../assets/Referral/doctor.png"
          style="width: 300px; margin-top: 110px"
        />
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
  top: 50px;
  /* width: 141px;
  height: 54px; */
  flex-shrink: 0;
}
</style>
