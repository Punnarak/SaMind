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
                {{ mood }}
              </v-chip>
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col v-if="moodResult != 'Unknown'" cols="6" sm="5" md="4">
              <label class="title ml-3" style="font-weight: bold"
                >Latest Average Mood</label
              >
              <br />
              <v-chip
                class="mt-5 ml-5"
                style="
                  color: rgb(152, 151, 151);
                  width: 256px;
                  height: 101px;
                  flex-shrink: 0;
                  border-radius: 10px;
                "
              >
                <v-row>
                  <img
                    class="ml-5"
                    src="../assets/dashboard/hicon.png"
                    style="
                      position: absolute;
                      width: 50px;
                      z-index: 10;
                      margin-top: 0.8px;
                      margin-left: 0.5px;
                    "
                  />
                  <img
                    class="ml-5"
                    src="../assets/dashboard/ybg.png"
                    style="width: 55px"
                  />
                </v-row>
                <v-col>
                  <label
                    class="moodresult ml-8"
                    style="font-weight: bold; font-size: 24px"
                    >{{ moodResult }}</label
                  >
                  <br />
                  <label class="testdate ml-2">{{ testDate }}</label>
                </v-col></v-chip
              ></v-col
            ><v-col v-if="scoretest1" cols="26" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Score Test
              </label>
              <span class="mr-16 ml-16"></span>

              <label
                v-if="scoretest1"
                class="hyper mr-16"
                style="font-weight: bold"
                @click="
                  $router.push({
                    path: 'patienttesthistory',
                    query: {
                      patientName: patientName,
                      patientId: patientId,
                    },
                  })
                "
                >See All
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
                <v-list
                  class="scoretest"
                  style="
                    background-color: transparent;
                    width: 320px;
                    margin-left: -10px;
                  "
                >
                  <v-list-item v-if="scoretest1">
                    <v-row
                      style="
                        background-color: rgba(228, 228, 228, 0.4);
                        width: 310px;
                      "
                    >
                      <v-col class="testname">{{ scoretest1[0] }}</v-col>
                      <v-col
                        class="result"
                        :style="{
                          color: getColorResult(scoretest1[1], scoretest1[0]),
                        }"
                        style="margin-left: -16px"
                        >{{ scoretest1[1] }}</v-col
                      >
                      <v-col class="date"
                        ><label>{{ scoretest1[2] }}</label></v-col
                      >
                    </v-row>
                  </v-list-item>
                  <v-divider
                    inset
                    style="color: rgb(255, 255, 255)"
                  ></v-divider>

                  <v-list-item v-if="scoretest2">
                    <v-row
                      style="
                        background-color: rgba(228, 228, 228, 0.4);
                        width: 310px;
                      "
                    >
                      <v-col class="testname">{{ scoretest2[0] }}</v-col>
                      <v-col
                        :style="{
                          color: getColorResult(scoretest2[1], scoretest2[0]),
                        }"
                        class="result"
                        style="margin-left: -16px"
                        >{{ scoretest2[1] }}</v-col
                      >
                      <v-col class="date">{{ scoretest2[2] }}</v-col>
                    </v-row>
                  </v-list-item></v-list
                ></v-chip
              ></v-col
            ><v-col v-if="moodDetect != '-'" cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Mood Detection with Samind
              </label>
              <v-chip
                class="mt-5 ml-5"
                style="
                  color: rgb(152, 151, 151);
                  width: 230px;
                  height: 101px;
                  flex-shrink: 0;
                  border-radius: 10px;
                "
              >
                <v-row>
                  <img
                    class="ml-5"
                    src="../assets/dashboard/hicon.png"
                    style="
                      position: absolute;
                      width: 50px;
                      z-index: 10;
                      margin-top: 0.8px;
                      margin-left: 0.5px;
                    "
                  />
                  <img
                    class="ml-5"
                    src="../assets/dashboard/ybg.png"
                    style="width: 55px"
                  />
                </v-row>
                <v-row>
                  <label
                    class="moodresult ml-8 mb-8"
                    style="font-weight: bold; font-size: 24px"
                    >{{ moodDetect }}</label
                  >
                  <br />
                  <label class="testdate ml-10" style="margin-top: -30px">{{
                    detectDate
                  }}</label>
                </v-row></v-chip
              ></v-col
            ></v-row
          >
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col cols="6" sm="5" md="4">
              <label class="title ml-3" style="font-weight: bold"
                >Latest Game Played</label
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
                <v-col>
                  <div style="text-align: center">
                    <label
                      style="font-weight: bold; font-size: 24px; color: black"
                      >{{ playLastdate }}</label
                    >
                    <br />
                    <label
                      style="
                        font-style: normal;
                        font-weight: 600;
                        font-size: 16px;
                        color: #b6b9c2;
                        display: inline-block;
                      "
                      >{{ playLasttime }}</label
                    >
                  </div>
                </v-col></v-chip
              ></v-col
            ><v-col cols="26" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Total number of plays
              </label>
              <span class="mr-16 ml-16"></span>

              <!-- <label
                class="hyper mr-16"
                style="font-weight: bold"
                @click="
                  $router.push({
                    path: 'patienttesthistory',
                    query: {
                      patientName: patientName,
                      patientId: patientId
                    },
                  })
                "
                >See All
              </label> -->

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
                <v-col>
                  <label
                    class="moodresult ml-8"
                    style="font-weight: bold; font-size: 24px"
                    >{{ timestoplay }} time(s)</label
                  >
                  <br />
                </v-col> </v-chip></v-col
            ><v-col cols="6" sm="6" md="4">
              <label class="title mr-16" style="font-weight: bold"
                >Percent of Good Word
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
                <!-- <v-row>
                  <img
                    class="ml-5"
                    src="../assets/dashboard/hicon.png"
                    style="
                      position: absolute;
                      width: 50px;
                      z-index: 10;
                      margin-top: 0.8px;
                      margin-left: 0.5px;
                    "
                  />
                  <img
                    class="ml-5"
                    src="../assets/dashboard/ybg.png"
                    style="width: 55px"
                  />
                </v-row> -->
                <v-row>
                  <label
                    class="moodresult ml-8"
                    style="font-weight: bold; font-size: 24px"
                  >
                    {{ percentageGoodword }}%
                  </label>
                  <br />
                  <!-- <label class="testdate ml-7">{{ detectDate }}</label> -->
                </v-row></v-chip
              ></v-col
            ></v-row
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>
<script setup>
import axios from "../axios.js";
function getColor(mood) {
  if (mood === "negative") return "red";
  else if (mood === "neutral") return "orange";
  else if (mood === "positive") return "green";
  else return "lightgray";
}
function getColorResult(result, test) {
  if (test === "PHQ9") {
    if (result.includes("ปานกลาง")) {
      return "#FF914D";
    } else if (result.includes("น้อยมาก")) {
      return "#11dd66";
    } else if (result.includes("น้อย")) {
      return "#FFDE59";
    } else if (result.includes("มาก")) {
      return "#FF5757";
    } else if (result.includes("ไม่มี")) {
      return "#11dd66";
    } else if (result.includes("รุนแรง")) {
      return "#FF5757";
    }
  }

  if (test === "2Q") {
    console.log("in 2q");
    if (result.includes("มีแนวโน้ม")) {
      return "#FFDE59";
    } else if (result.includes("ไม่มี")) {
      return "#11dd66";
    }
  }
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

      playLastdate: "8 July 2022",
      playLasttime: "08:00:52",
      percentageGoodword: 0,
      timestoplay: 0,
    };
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
    console.log("this.patientInfo", this.$route.query);
    this.patientName = this.$route.query.name;
    this.patientId = this.$route.query.patientId;
    this.age = this.$route.query.age;
    this.mood = this.$route.query.mood;
    let param = {
      patientID: this.patientId,
    };
    axios
      .post("/adPersonalData", param, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        this.born = response.data.born;
        this.startTreatement = response.data.start;
        this.lastAppointment = response.data.lastAppointment;
        this.nextAppointment = response.data.nextAppointment;
        this.tel = response.data.tel;
        this.email = response.data.email;
        this.mood = response.data.mood;
        this.moodResult = response.data.avgMood;
        this.testDate = response.data.dateBetween;
        this.moodDetect = response.data.avatarMood;
        this.detectDate = response.data.dateAvatarMoodDetec;
        if (response.data && response.data.hasOwnProperty("historyTest")) {
          if (
            response.data.historyTest &&
            response.data.historyTest.hasOwnProperty("type1")
          ) {
            let result1 = this.getResult(
              response.data.historyTest.type1,
              response.data.historyTest.result1
            );
            this.scoretest1 = [
              response.data.historyTest.type1,
              result1,
              response.data.historyTest.date1,
            ];
          }

          if (
            response.data.historyTest &&
            response.data.historyTest.hasOwnProperty("type2")
          ) {
            let result2 = this.getResult(
              response.data.historyTest.type2,
              response.data.historyTest.result2
            );
            this.scoretest2 = [
              response.data.historyTest.type2,
              result2,
              response.data.historyTest.date2,
            ];
          }
        } else {
          this.scoretest1 = null;
          this.scoretest2 = null;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    this.fetchAdditionalData();
    this.fetchLastVisit();
  },
  methods: {
    getResult(type, result) {
      if (type == "PHQ9" || type == "2Q") {
        if (result.includes("ปานกลาง")) {
          return "ระดับปานกลาง";
        } else if (result.includes("น้อยมาก")) {
          return "ระดับน้อยมาก";
        } else if (result.includes("น้อย")) {
          return "ระดับน้อย";
        } else if (result.includes("ไม่มี")) {
          return "ไม่มีภาวะซึมเศร้า";
        } else if (result.includes("มีแนวโน้ม")) {
          return "มีแนวโน้มซึมเศร้า";
        } else if (result.includes("รุนแรง")) {
          return "ระดับรุนแรง";
        }
      }
    },
    async fetchAdditionalData() {
      try {
        const response = await axios.post("/patientGame", {
          patient_id: this.patientId,
        });
        const { goodword, timeplay } = response.data;
        this.percentageGoodword = goodword;
        this.timestoplay = timeplay;
        console.log("this.gw", this.goodword);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    },
    async fetchLastVisit() {
      try {
        const response = await axios.post("/lastVisitGame", {
          patient_id: this.patientId,
        });
        const { lastVisitDate, lastVisitTime } = response.data; // Extracting date and time separately
        this.playLastdate = lastVisitDate; // Assigning the date part
        this.playLasttime = lastVisitTime; // Assigning the time part
        console.log("Last Visit Date:", this.playLastdate);
        console.log("Last Visit Time:", this.playLasttime);
      } catch (error) {
        console.error("Error fetching last visit data:", error);
      }
    },
  },
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

.hyper {
  color: #3c9bf2;
  text-align: right;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.hyper:hover {
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(84, 147, 248, 0.5);
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
  font-size: 9px;
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
