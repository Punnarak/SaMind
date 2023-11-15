<template>
  <v-row>
    <v-app
      style="z-index: 9999; background-color: transparent; position: fixed"
    >
      <v-container fluid>
        <v-col v-if="requestBarOpen" class="request-bar" col="4">
          <v-navigation-drawer
            color="white"
            location="right"
            app
            right
            style="width: auto"
          >
            <row>
              <label class="title ml-5"> POSTPONE MEETING REQUEST </label>
              <v-btn icon variant="text" @click="toggleRequestBar">
                <v-icon>mdi-close</v-icon>
              </v-btn></row
            >
            <v-list align="center" dense>
              <v-list-item
                v-for="(patient, patientIndex) in patients"
                :key="patientIndex"
                class="custom-chip mb-5"
              >
                <div style="margin-top: -10px">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-top: -30px;
                      position: absolute;
                    "
                  >
                    <img
                      class="mr-2"
                      src="../assets/dashboard/ybg.png"
                      style="width: 30px"
                    />
                    <label class="nametext">{{ patient.patientName }}</label>
                  </div>
                  <br />
                  <div>
                    <div class="circle-container">
                      <div
                        class="circle"
                        style="background-color: rgba(0, 191, 99, 1)"
                      ></div>
                      <div class="line"></div>
                      <div
                        class="circle"
                        style="background-color: rgba(217, 217, 217, 1)"
                      ></div>
                    </div>

                    <div
                      style="
                        display: flex;
                        position: absolute;
                        margin-top: -74px;
                        margin-left: 70px;
                      "
                    >
                      <label
                        class="text mr-8"
                        style="color: rgba(0, 191, 99, 1); font-size: 13px;
'"
                        >To</label
                      >
                      <label
                        class="text"
                        style="
                          color: rgba(0, 191, 99, 1);
                          font-weight: 500;
                          font-size: 13px;
                          text-align: start;
                        "
                        >{{ patient.toDate }}<br />{{ patient.toTime }}
                      </label>
                    </div>

                    <div
                      style="
                        display: flex;
                        position: absolute;
                        margin-top: -20px;
                        margin-left: 70px;
                      "
                    >
                      <label
                        class="text mr-4"
                        style="color: rgba(157, 157, 157, 1); font-size: 13px"
                        >From</label
                      ><label
                        class="text"
                        style="
                          color: rgba(157, 157, 157, 1);
                          font-weight: 500;
                          font-size: 13px;
                          text-align: start;
                        "
                        >{{ patient.fromDate }}<br />{{ patient.fromTime }}
                      </label>
                    </div>
                    <div
                      style="
                        display: flex;
                        margin-top: 30px;
                        margin-left: 5px;
                        position: absolute;
                      "
                    >
                      <v-btn
                        class="requestbtn mr-2"
                        style="
                          color: rgba(0, 191, 99, 1);
                          border: 1px solid #00bf63;
                          border-color: rgba(0, 191, 99, 1);
                          box-shadow: 0px 0px 2px 0px #00bf63;
                        "
                        >confirm</v-btn
                      >
                      <v-btn
                        class="requestbtn"
                        style="
                          color: rgba(242, 86, 86, 1);
                          border: 1px solid rgba(242, 86, 86, 1);
                          border-color: rgba(242, 86, 86, 1);
                          box-shadow: 0px 0px 2px 0px rgba(242, 86, 86, 1);
                        "
                        >cancel</v-btn
                      >
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
      </v-container>
    </v-app>

    <!-- Calendar Content -->
    <v-col class="px-10 mt-3" col="8">
      <v-row align="center" class="calendar" justify="center">
        <v-col
          class="calendar-header"
          v-if="selectedViewType === 'day'"
          cols="4"
        >
          <button @click="prevDay"><v-icon>mdi-chevron-left</v-icon></button>
          <h2>{{ currentDay }}</h2>
          <button @click="nextDay"><v-icon>mdi-chevron-right</v-icon></button>
        </v-col>
        <v-col
          class="calendar-header"
          v-if="selectedViewType === 'month'"
          cols="4"
        >
          <button @click="prevMonth"><v-icon>mdi-chevron-left</v-icon></button>
          <h2>{{ currentMonth }}</h2>
          <button @click="nextMonth"><v-icon>mdi-chevron-right</v-icon></button>
        </v-col>
        <v-col class="calendar-type" cols="4" align="center">
          <button @click="selectDay">DAY</button>
          <button @click="selectWeek">WEEK</button>
          <button @click="selectMonth">MONTH</button>
        </v-col>
        <v-col cols="2"> </v-col>

        <v-col class="mb-3" cols="2">
          <v-btn
            rounded="xl"
            class="text-none mx-auto"
            color="#569AFF"
            block
            size="x-large"
            variant="flat"
            @click="request !== 0 ? toggleRequestBar() : null"
          >
            {{ request !== 0 ? `${request} requests` : "No request" }}
          </v-btn>
        </v-col>

        <div class="calendar-day" v-if="selectedViewType === 'day'">
          <div class="time-slots">
            <div class="time-slot" v-for="hour in hours" :key="hour">
              {{ hour }}
            </div>
          </div>
        </div>
        <div class="calendar-week" v-if="selectedViewType === 'week'">
          <!-- ... Your existing grid view code ... -->
        </div>
        <div class="calendar-grid" v-if="selectedViewType === 'month'">
          <!-- Add day labels and numbers within the v-for loop -->
          <div
            v-for="(cell, index) in calendarGrid"
            :key="cell.key"
            :class="['calendar-box', cell.class]"
          >
            <!-- Display day labels for the first row of the calendar grid -->
            <div v-if="index < 7" class="day-label">{{ dayLabels[index] }}</div>
            <div v-if="index < 7" class="day-number-1fr">{{ cell.day }}</div>
            <div v-if="index >= 7" class="day-number">{{ cell.day }}</div>
            <br />
            <!-- Eye icon for viewing -->
            <div
              class="icon-viewcontainer"
              @mouseover="handleIconHover"
              @mouseout="handleIconHover"
              @click.stop="viewClicked(cell.day, currentDate)"
            >
              <v-icon class="icon view-icon">mdi-eye</v-icon>
              <span class="icon view-text">View</span>
            </div>
            <!-- Booking icon for booking -->
            <div
              class="icon-bookcontainer"
              @mouseover="handleIconHover"
              @mouseout="handleIconHover"
              @click.stop="bookClicked(cell.day, currentDate)"
            >
              <v-icon class="icon book-icon">mdi-account-plus</v-icon
              ><span class="icon book-text">Booking</span>
            </div>
          </div>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>
<script setup>
const patients = [
  {
    id: "01",
    patientId: "PID001",
    patientName: "Somsak Test1",
    toDate: "Tue, 19 Sep 2023",
    toTime: "10.00",
    fromDate: "Tue, 12 Sep 2023",
    fromTime: "10.00",
  },
  {
    id: "02",
    patientId: "PID002",
    patientName: "Somsee Test2",
    toDate: "Tue, 19 Sep 2023",
    toTime: "10.00",
    fromDate: "Tue, 12 Sep 2023",
    fromTime: "10.00",
  },
  {
    id: "03",
    patientId: "PID003",
    patientName: "Somchai Test3",
    toDate: "Tue, 19 Sep 2023",
    toTime: "10.00",
    fromDate: "Tue, 12 Sep 2023",
    fromTime: "10.00",
  },
  {
    id: "04",
    patientId: "PID004",
    patientName: "Somsom Test4",
    toDate: "Tue, 19 Sep 2023",
    toTime: "10.00",
    fromDate: "Tue, 12 Sep 2023",
    fromTime: "10.00",
  },
];
</script>
<script>
export default {
  data() {
    return {
      request: 1,
      selectedViewType: "month",
      selectedDate: new Date(),
      currentMonth: "",
      calendarGrid: [],
      currentDate: new Date(),
      currentYear: "",
      hours: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      events: [
        { id: 1, title: "Meeting", start: "09:00", end: "10:00" },
        { id: 2, title: "Lunch", start: "12:00", end: "13:00" },
        { id: 3, title: "Workshop", start: "14:00", end: "16:00" },
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      dayLabels: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
      requestBarOpen: false,
    };
  },
  computed: {
    currentDay() {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[this.currentDate.getDay()] + " " + this.currentDate.getDate();
    },
  },
  methods: {
    nextDay() {
      const nextDay = new Date(this.selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      this.selectedDate = nextDay;
      this.currentDate = nextDay;
      console.log("currentDay", this.currentDate);
    },
    prevDay() {
      const prevDay = new Date(this.selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      this.selectedDate = prevDay;
      this.currentDate = prevDay;
      console.log("currentDay", this.currentDate);
    },
    getScheduleLineStyle() {
      const top = (this.currentTimeMinutes * 100) / 1440 + "%";
      return { top };
    },
    getEventStyle(event) {
      const startHour = parseInt(event.start.split(":")[0]);
      const startMinute = parseInt(event.start.split(":")[1]);
      const endHour = parseInt(event.end.split(":")[0]);
      const endMinute = parseInt(event.end.split(":")[1]);
      const top = ((startHour * 60 + startMinute) * 100) / 1440 + "%";
      const height =
        ((endHour * 60 + endMinute) * 100) / 1440 -
        ((startHour * 60 + startMinute) * 100) / 1440 +
        "%";
      return { top, height };
    },
    editEvent(event) {
      console.log("Edit event: " + event.title);
    },
    updateCalendar() {
      this.currentMonth = `${this.months[this.currentDate.getMonth()]}, ${
        this.currentYear
      }`;

      this.calendarGrid = [];

      const firstDay = new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        1
      );
      const lastDay = new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0
      );
      const numDays = lastDay.getDate();

      const prevMonthLastDay = new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        0
      );

      const nextMonthFirstDay = new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        1
      );

      for (let i = 0; i < firstDay.getDay(); i++) {
        const day = prevMonthLastDay.getDate() - firstDay.getDay() + i + 1;
        this.calendarGrid.push({
          key: `prev-${i}`,
          day,
          class: "prev-month-day",
        });
      }

      for (let day = 1; day <= numDays; day++) {
        this.calendarGrid.push({ key: `day-${day}`, day, class: "day" });
      }

      for (let i = 0; i < 6 - lastDay.getDay(); i++) {
        const day = i + 1;
        this.calendarGrid.push({
          key: `next-${i}`,
          day,
          class: "next-month-day",
        });
      }
    },
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      if (this.currentDate.getMonth() < 0) {
        this.currentDate.setMonth(11);
        this.currentYear -= 1;
      }
      this.updateCalendar();
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      if (this.currentDate.getMonth() > 11) {
        this.currentDate.setMonth(0);
        this.currentYear += 1;
      }
      this.updateCalendar();
    },
    selectDay() {
      console.log("Selected DAY");
      this.selectedViewType = "day";
    },
    selectWeek() {
      console.log("Selected WEEK");
      this.selectedViewType = "week";
    },
    selectMonth() {
      console.log("Selected MONTH");
      this.selectedViewType = "month";
    },
    viewClicked(day, currentDate) {
      console.log(
        `View clicked: Day ${day}, Month ${currentDate.getMonth()}, Year ${currentDate.getFullYear()}`
      );
      this.selectedViewType = "day";
    },
    bookClicked(day, currentDate) {
      console.log(
        `Book clicked: Day ${day}, Month ${currentDate.getMonth()}, Year ${currentDate.getFullYear()}`
      );

      this.$router.push({
        path: `booking`,
        query: {
          bookday: `${day}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
        },
      });
    },
    toggleRequestBar() {
      console.log("opennnn");
      this.requestBarOpen = !this.requestBarOpen;
    },
  },
  created() {
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.updateCalendar();
  },
};
</script>

<style scoped>
.requestbtn {
  display: flex;
  width: 113px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  font-family: "Poppins", sans-serif;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.1px;
}
.text {
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.16px;
}
.circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -10px;
  margin-right: 150px;
}

.circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.line {
  width: 2px;
  height: 40px; /* Adjust the height of the line as needed */
  background-color: #000; /* You can set your preferred color */
}
.custom-chip {
  width: 277px;
  height: 194px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #569aff;
  box-shadow: 0px 0px 2px 0px #569aff;
  position: relative;
  overflow: hidden;
}
.nametext {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.13px;
}
.title {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.16px;
}
.request-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.v-navigation-drawer {
  z-index: 9999; /* Set a higher z-index value for the navigation drawer */
}
body {
  font-family: Arial, sans-serif;
}
.day-calendar {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.day-schedule-line {
  position: absolute;
  top: 0;
  left: 50%; /* Adjust the left position to align the line in the middle of the day column */
  transform: translateX(-50%);
  width: 2px; /* Adjust the width of the line */
  height: 100%;
  background-color: red; /* Adjust the color of the line */
  z-index: 2; /* Ensure the line is above other elements */
}
.time-slots {
  display: flex;
  flex-direction: column;
}

.time-slot {
  height: 60px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  background-color: #f5f5f5;
}

.events {
  position: relative;
}

.event {
  position: absolute;
  background-color: #3498db;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.calendar {
  /* max-width: 400px; */
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px;
}

.calendar-type {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  color: #000;
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.54px;
}

button {
  cursor: pointer;
  color: black;
  border: none;
  padding: 5px 10px;
}

h2 {
  color: #000;
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.54px;
}

.day,
.prev-month-day,
.next-month-day {
  text-align: center;
  width: 150px; /* Set a fixed width of 50px */
  height: 100px; /* Set a fixed height of 50px */
  border: 2px solid #eaeaea; /* Increase cell border width */
  background-color: white;
  cursor: pointer;
  position: relative; /* Add position: relative for positioning */
}

.next-month-day,
.prev-month-day {
  color: #c1c1c1; /* Set the text color for the previous month days */
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* Increase cell spacing */
  /* gap: 10px; */
}

.day-label {
  color: black; /* Set the text color for day labels to black */
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  top: 0; /* Position at the top */
  left: 5px; /* Position at the left */
}
.day-number-1fr {
  position: absolute;
  top: 15px; /* Adjust top position for the number */
  left: 5px; /* Adjust left position for the number */
}
.day-number {
  position: absolute;
  top: 5px; /* Adjust top position for the number */
  left: 5px; /* Adjust left position for the number */
}

.calendar-box {
  width: 155px;
  height: 100px;
  border: 2px solid #eaeaea;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.calendar-box:hover {
  background-color: #d0f6ff;
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  cursor: pointer;
  font-size: 20px;
  margin: 5px;
  opacity: 0; /* Initially hide the icons */
  transition: opacity 0.3s;
}
.icon.book-icon,
.icon.book-text {
  color: #f27456b2;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.icon-bookcontainer:hover .icon {
  color: #f27456;
}

.icon.view-icon,
.icon.view-text {
  color: #3c9bf2b2;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.icon-viewcontainer:hover .icon {
  color: #3c9bf2;
}

.calendar-box:hover .icon {
  opacity: 1; /* Show the icons on hover */
}

.icon-viewcontainer,
.icon-bookcontainer {
  text-align: left;
  margin-left: 20px;
}
</style>
