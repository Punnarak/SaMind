<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row class="mt-5 mb-5" align="center">
      <v-col cols="6" style="font-weight: 600; font-size: 20px">
        PATIENT'S NAME :
        <label style="font-weight: lighter; font-size: 20px">{{
          patientName
        }}</label>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-card class="mx-auto" col="6" rounded="xl" style="border-width: 1px">
      <v-list lines="two">
        <v-list-subheader class="content ml-3"> ข้อมูล </v-list-subheader>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-col cols="12" sm="6" md="4">
            <label class="title mr-10" style="font-weight: bold"
              >Patient ID</label
            >
            <label>{{ patientId }}</label></v-col
          >
        </v-list-item>

        <v-list-item style="background-color: rgba(190, 216, 255, 0.13)">
          <v-row>
            <v-col cols="7" sm="6" md="4">
              <label class="title ml-3 mr-16" style="font-weight: bold"
                >Name
              </label>
              <label> {{ patientName }}</label>
            </v-col>
            <v-col cols="7" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Gender</label
              >
              <label class="ml-5"></label>
              <label class="ml-16">{{ gender }}</label>
            </v-col></v-row
          >
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col cols="8" sm="6" md="4">
              <label class="title ml-3 mr-16" style="font-weight: bold"
                >Age</label
              >
              <label class="ml-5 mr-12">{{ age }} </label></v-col
            ><v-col cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold">Born </label>
              <label class="ml-9"></label>
              <label class="ml-15">{{ born }}</label></v-col
            ></v-row
          >
        </v-list-item>

        <v-list-item style="background-color: rgba(190, 216, 255, 0.13)">
          <v-row>
            <v-col cols="7" sm="6" md="4">
              <label class="title ml-3 mr-16" style="font-weight: bold"
                >Start
              </label>
              <label class="ml-2"> {{ startTreatement }}</label>
            </v-col>
            <v-col cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Last Appointment</label
              >
              <label>{{ lastAppointment }}</label>
            </v-col>
            <v-col cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Next Appointment</label
              >
              <label>{{ nextAppointment }}</label>
            </v-col></v-row
          >
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col cols="8" sm="6" md="4">
              <label class="title ml-3 mr-16" style="font-weight: bold"
                >Tel.</label
              >
              <label class="ml-6 mr-12">{{ tel }} </label></v-col
            ><v-col cols="12" sm="6" md="6">
              <label class="title mr-16" style="font-weight: bold"
                >Email
              </label>
              <label class="ml-7"></label>
              <label class="ml-16">{{ email }}</label></v-col
            ></v-row
          >
        </v-list-item>

        <v-list-item style="background-color: rgba(190, 216, 255, 0.13)">
          <v-row>
            <v-col class="mt-2" cols="7" sm="6" md="4">
              <label class="title ml-3 mr-16" style="font-weight: bold"
                >Mood
              </label>
              <v-chip :color="getColor(mood)">
                <v-icon left size="10px" style="margin-right: 10px"
                  >mdi-circle</v-icon
                >
                {{
                  mood > 400 ? "negative" : mood > 200 ? "neutral" : "positive"
                }}
              </v-chip>
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col cols="6" sm="5" md="4">
              <label class="title ml-3" style="font-weight: bold"
                >Latest Dairy Test</label
              >
              <br />
              <v-chip
                class="mt-5 ml-5"
                style="
                  color: rgb(152, 151, 151);
                  width: 226px;
                  height: 101px;
                  flex-shrink: 0;
                  border-radius: 10px;
                "
              >
                <v-row>
                  <v-icon left size="10px" class="ml-10 mr-5"
                    >mdi-circle</v-icon
                  >
                </v-row>
                <v-col>
                  <label
                    class="moodresult ml-8"
                    style="font-weight: bold; font-size: 24px"
                    >{{ moodResult }}</label
                  >
                  <br />
                  <label class="testdate ml-3">{{ testDate }}</label>
                </v-col></v-chip
              ></v-col
            ><v-col cols="26" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Score Test
              </label>
              <v-chip
                class="mt-5 ml-5"
                style="
                  color: rgb(152, 151, 151);
                  width: 310px;
                  height: 101px;
                  flex-shrink: 0;
                  border-radius: 10px;
                "
              >
                <v-list class="scoretest" style="background-color: transparent">
                  <v-list-item>
                    <v-row style="background-color: rgba(228, 228, 228, 0.4)">
                      <v-col class="testname">{{ scoretest1[0] }}</v-col>
                      <v-col class="result">{{ scoretest1[1] }}</v-col>
                      <v-col class="date">{{ scoretest1[2] }}</v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider
                    inset
                    style="color: rgb(255, 255, 255)"
                  ></v-divider>
                  <v-list-item>
                    <v-row>
                      <v-col class="testname">{{ scoretest2[0] }}</v-col>
                      <v-col class="result">{{ scoretest2[1] }}</v-col>
                      <v-col class="date">{{ scoretest2[2] }}</v-col>
                    </v-row>
                  </v-list-item></v-list
                ></v-chip
              ></v-col
            ><v-col cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Mood Detection with Samind
              </label>
              <v-chip
                class="mt-5 ml-5"
                style="
                  color: rgb(152, 151, 151);
                  width: 226px;
                  height: 101px;
                  flex-shrink: 0;
                  border-radius: 10px;
                "
              >
                <v-row>
                  <v-icon left size="10px" class="ml-10 mr-5"
                    >mdi-circle</v-icon
                  >
                </v-row>
                <v-col>
                  <label
                    class="moodresult ml-8"
                    style="font-weight: bold; font-size: 24px"
                    >{{ moodDetect }}</label
                  >
                  <br />
                  <label class="testdate ml-7">{{ detectDate }}</label>
                </v-col></v-chip
              ></v-col
            ></v-row
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>
<script setup>
function getColor(mood) {
  if (mood > 400) return "red";
  else if (mood > 200) return "orange";
  else return "green";
}
</script>
<script>
export default {
  data() {
    return {
      patientName: "",
      patientId: "",
      age: "",
      gender: "female",
      born: "11 August 2005",
      startTreatement: "19 January 2022",
      lastAppointment: "20 June 2022",
      nextAppointment: "3 October 2022",
      tel: "0890222255",
      email: "pun_zaa_ii@hotmail.com",
      mood: "",
      moodResult: "Happy",
      test: "",
      testDate: "2 - 8 July 2022",
      scoretest1: ["2Q", "ไม่มีภาวะซึมเศร้า", "8 July 2022"],
      scoretest2: ["PHQ9", "ไม่มีภาวะซึมเศร้า", "8 July 2022"],
      moodDetect: "Happy",
      detectDate: "8 July 2022",
    };
  },
  created() {
    this.patientName = this.$route.query.name;
    this.patientId = this.$route.query.patientId;
    this.age = this.$route.query.age;
    // this.gender = this.$route.query.gender;
    this.mood = this.$route.query.mood;
    console.log("this.patientInfo", this.$route.query);
  },
  methods: {},
};
</script>

<style scoped>
.content {
  font-family: "Poppins", sans-serif;
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.45px;
}

.title {
  /* color: #000; */
  font-family: "Montserrat", sans-serif;
  /* font-size: 13px; */
  font-style: normal;
  font-weight: 600;
  /* line-height: normal; */
}

.moodresult {
  color: #000;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.testdate {
  color: #b6b9c2;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.testname {
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.result {
  color: #00bf63;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.date {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
