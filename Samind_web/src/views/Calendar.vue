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
            <div class="scroll" style="height: 90vh; overflow-y: auto">
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
            </div>
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
          <h2 style="width: 200px">{{ currentDay() }}</h2>
          <button @click="nextDay"><v-icon>mdi-chevron-right</v-icon></button>
        </v-col>
        <v-col
          class="calendar-header"
          v-if="selectedViewType === 'week'"
          cols="4"
        >
          <button @click="prevMonth"><v-icon>mdi-chevron-left</v-icon></button>
          <h2 style="width: 200px">{{ currentMonth }}</h2>
          <button @click="nextMonth"><v-icon>mdi-chevron-right</v-icon></button>
        </v-col>
        <v-col
          class="calendar-header"
          v-if="selectedViewType === 'month'"
          cols="4"
        >
          <button @click="prevMonth"><v-icon>mdi-chevron-left</v-icon></button>
          <h2 style="width: 200px">{{ currentMonth }}</h2>
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
          <div class="calendar-day-size">
            <div class="timeline-day">
              <div v-for="time in timesDay" :key="time" class="time">
                <div class="text-container-day">
                  <span class="text-day">{{ time }}</span>
                  <div class="line-day"></div>
                </div>
                <div class="linee-day mt-5"></div>
              </div>
            </div>
            <div class="day-day">
              <div class="event-container-day">
                <div
                  v-for="time in timesDay"
                  :key="time"
                  class="event-day"
                  :style="getEventStyle(time)"
                >
                  <div v-if="eventsDay[time]" class="event-details-day">
                    <span class="title-day">{{ eventsDay[time].title }}</span>
                    <span class="description-day">{{
                      eventsDay[time].description
                    }}</span>
                    <span class="color-day">{{ eventsDay[time].color }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calendar-week" v-if="selectedViewType === 'week'">
          <div class="calendar-week-grid">
            <!-- First row for day labels and "ALL DAY" -->
            <div class="calendar-week-box all-day-label-week">ALL DAY</div>
            <div
              class="calendar-week-box"
              v-for="(day, dayIndex) in weekDays"
              :key="dayIndex"
            >
              <label class="day-label-week" style="line-height: 2.5">
                {{ day }} <br />
              </label>

              <label :class="{ 'current-day-week': isCurrentDay(dayIndex) }">
                {{ getDayDate(dayIndex) }}
              </label>
            </div>
          </div>
          <!-- Rows for time slots -->
          <div
            v-for="(time, timeIndex) in timeSlots"
            :key="timeIndex"
            class="calendar-row"
          >
            <!-- Box for time label -->
            <div class="calendar-week-box time-slot-week">
              {{ time }}
            </div>

            <!-- Empty boxes for time slots -->
            <div
              class="calendar-week-box"
              v-for="dayIndex in 7"
              :key="dayIndex"
            ></div>
          </div>
        </div>

        <div class="calendar-grid" v-if="selectedViewType === 'month'">
          <div
            v-for="(cell, index) in calendarGrid"
            :key="cell.key"
            :class="['calendar-box', cell.class]"
            style="text-align: left"
          >
            <!-- Display day labels for the first row of the calendar grid -->
            <div v-if="index < 7" class="day-label">{{ dayLabels[index] }}</div>
            <div v-if="index < 7" class="day-number-1fr">{{ cell.day }}</div>
            <div v-if="index >= 7" class="day-number">{{ cell.day }}</div>
            <br />

            <!-- event chatgpt -->
            <!-- Display event information here -->
            <div
              class="event-box"
              :class="{
                'event-box-pink': hasEvents(cell.day, cell, currentDate),
              }"
            >
              <div
                v-for="(event, index) in sortedEvents(
                  cell.day,
                  cell,
                  currentDate
                )"
                :key="index"
                style="text-align: left"
              >
                <label v-if="index === 0" class="event-info-time"
                  >{{ event.time }}
                </label>
                <br />
                <label v-if="index === 0" class="event-info-name">{{
                  event.patientName
                }}</label>
              </div>
            </div>

            <!-- Eye icon for viewing -->
            <div
              class="icon-viewcontainer"
              @mouseover="handleIconHover"
              @mouseout="handleIconHover"
              @click.stop="viewClicked(cell.day, currentDate, cell)"
            >
              <v-icon class="icon view-icon">mdi-eye</v-icon>
              <span class="icon view-text">View</span>
            </div>
            <!-- Booking icon for booking -->
            <div
              class="icon-bookcontainer"
              @mouseover="handleIconHover"
              @mouseout="handleIconHover"
              @click.stop="bookClicked(cell.day, currentDate, cell)"
            >
              <v-icon class="icon book-icon">mdi-account-plus</v-icon
              ><span class="icon book-text">Booking</span>
            </div>

            <label
              v-if="hasMultipleEvents(cell.day, cell, currentDate)"
              @click="seeMoreEvents(cell.day, cell, currentDate)"
              style="font-size: 10px; margin-left: 10px"
            >
              See More Events
            </label>
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
  components: {},
  data() {
    return {
      request: 1,
      selectedViewType: "month",
      selectedDate: new Date(),
      currentMonth: "",
      calendarGrid: [],
      currentDate: new Date(),
      currentYear: "",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timesDay: [
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
      eventsDay: {
        //เปลี่ยนวันแล้วให้ยิง api ไปดึงข้อมูลมาในแต่ละรอบ
        "08:00": {
          title: "Meeting",
          description: "Team meeting",
          color: "red",
        },
        "12:00": {
          title: "Lunch",
          description: "Lunch with colleagues",
          color: "green",
        },
      },
      times: [
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ],
      events: [
        {
          id: 1,
          patientName: "Mary Jane",
          date: "11-11-2023",
          time: "15:30",
        },
        {
          id: 2,
          patientName: "Kanokpong Janta",
          date: "11-11-2023",
          time: "10:00",
        },
        {
          id: 2,
          patientName: "Mary Janta",
          date: "2-12-2023",
          time: "15:00",
        },
        {
          id: 2,
          patientName: "Test Janta",
          date: "2-12-2023",
          time: "10:00",
        },
        // ... เพิ่มเหตุการณ์อื่น ๆ ตามต้องการ
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
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      timeSlots: [
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
      ],
    };
  },
  computed: {},
  methods: {
    //Calendar Main
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
    //Calendar Day
    currentDay() {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return (
        days[
          this.currentDate.getDay() !== 0
            ? this.currentDate.getDay() - 1
            : this.currentDate.getDay()
        ] +
        " " +
        this.currentDate.getDate()
      );
    },
    nextDay() {
      const nextDay = new Date(this.selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      this.selectedDate = nextDay;
      this.currentDate = nextDay;
      console.log("currentDay", this.currentDate);

      this.updateCalendar();
    },
    prevDay() {
      const prevDay = new Date(this.selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      this.selectedDate = prevDay;
      this.currentDate = prevDay;
      console.log("currentDay", this.currentDate);

      this.updateCalendar();
    },
    getEventStyle(time) {
      const event = this.eventsDay[time];

      if (event) {
        const index = this.timesDay.indexOf(time);
        const positionTop = (index + 2.9) * 60;

        return {
          height: "60px",
          backgroundColor: event.color || "lightblue",
          opacity: 0.5,
          borderBottom: "1px solid #ccc",
          position: "absolute",
          top: `${positionTop}px`,
          left: "530px",
          right: "0",
          width: "760px",
        };
      }

      return {
        height: "60px",
        backgroundColor: "transparent",
        borderBottom: "1px solid #ccc",
      };
    },
    //Calendar Week
    isCurrentDay(dayIndex) {
      const currentDate = new Date(this.currentDate);
      currentDate.setDate(
        currentDate.getDate() - currentDate.getDay() + dayIndex
      );
      const today = new Date();
      return (
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      );
    },
    getDayDate(dayIndex) {
      const date = new Date(this.currentDate);
      date.setDate(date.getDate() - date.getDay() + dayIndex);
      return date.getDate();
    },
    //Calendar Month
    hasEvents(day, cell, currentDate) {
      let tempMonth = currentDate.getMonth();
      let tempYear = currentDate.getFullYear();
      let month, year;
      if (cell.class === "day") {
        month = tempMonth + 1;
        year = tempYear;
      } else if (cell.class === "prev-month-day") {
        if (tempMonth + 1 <= 1) {
          tempMonth = 11;

          month = tempMonth + 1;
          year = tempYear - 1;
        } else {
          month = tempMonth;
          year = tempYear;
        }
      } else if (cell.class === "next-month-day") {
        if (tempMonth + 1 >= 12) {
          tempMonth = 0;

          month = tempMonth + 1;
          year = tempYear + 1;
        } else {
          month = tempMonth + 2;
          year = tempYear;
        }
      }
      // ตรวจสอบว่ามีเหตุการณ์ในวันที่กำหนดหรือไม่
      console.log(
        this.events.some(
          (event) => event.date === day + "-" + month + "-" + year
        ),
        day +
          "-" +
          (this.currentDate.getMonth() + 1) +
          "-" +
          this.currentDate.getFullYear()
      );
      return this.events.some(
        (event) => event.date === day + "-" + month + "-" + year
      );
    },
    getEvents(day, cell, currentDate) {
      let tempMonth = currentDate.getMonth();
      let tempYear = currentDate.getFullYear();
      let month, year;
      if (cell.class === "day") {
        month = tempMonth + 1;
        year = tempYear;
      } else if (cell.class === "prev-month-day") {
        if (tempMonth + 1 <= 1) {
          tempMonth = 11;

          month = tempMonth + 1;
          year = tempYear - 1;
        } else {
          month = tempMonth;
          year = tempYear;
        }
      } else if (cell.class === "next-month-day") {
        if (tempMonth + 1 >= 12) {
          tempMonth = 0;

          month = tempMonth + 1;
          year = tempYear + 1;
        } else {
          month = tempMonth + 2;
          year = tempYear;
        }
      }
      // ดึงข้อมูลเหตุการณ์ทั้งหมดในวันที่กำหนด
      console.log(
        this.events.filter(
          (event) => event.date === day + "-" + month + "-" + year
        )
      );
      return this.events.filter(
        (event) => event.date === day + "-" + month + "-" + year
      );
    },
    sortedEvents(day, cell, currentDate) {
      const events = this.getEvents(day, cell, currentDate);
      return events.sort((a, b) => {
        const timeA = a.time.split(":").map(Number);
        const timeB = b.time.split(":").map(Number);

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        } else {
          return timeA[1] - timeB[1];
        }
      });
    },
    hasMultipleEvents(day, cell, currentDate) {
      return this.getEvents(day, cell, currentDate).length > 1;
    },
    seeMoreEvents(day, cell, currentDate) {
      // Implement the logic to show more events or navigate to a separate page
      console.log(
        `See more events for Day ${day}, Month ${
          currentDate.getMonth() + 1
        }, Year ${currentDate.getFullYear()}`
      );
    },
    updateCalendar() {
      console.log("inn", this.currentDate.getMonth());
      this.currentMonth = `${
        this.months[this.currentDate.getMonth()]
      }, ${this.currentDate.getFullYear()}`;

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
        this.currentDate.setFullYear(this.currentYear - 1); // Update the year as well
      }
      console.log("current", this.currentDate);
      this.updateCalendar();
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      if (this.currentDate.getMonth() === 12) {
        this.currentDate.setMonth(0);
        this.currentDate.setFullYear(this.currentYear + 1); // Update the year as well
      }
      console.log("current", this.currentDate);
      this.updateCalendar();
    },
    viewClicked(day, currentDate, cell) {
      if (cell.class === "day") {
        console.log(
          `View clicked: Day ${day}, Month ${
            currentDate.getMonth() + 1
          }, Year ${currentDate.getFullYear()}`
        );
      } else if (cell.class === "prev-month-day") {
        if (currentDate.getMonth() < 0) {
          console.log(
            `View clicked: Day ${day}, Month ${currentDate.getMonth(0)}, Year ${
              currentDate.getFullYear() - 1
            }`
          );
        } else {
          console.log(
            `View clicked: Day ${day}, Month ${currentDate.getMonth()}, Year ${currentDate.getFullYear()}`
          );
        }
      } else if (cell.class === "next-month-day") {
        if (currentDate.getMonth() > 11) {
          console.log(
            `View clicked: Day ${day}, Month ${currentDate.getMonth(0)}, Year ${
              currentDate.getFullYear() + 1
            }`
          );
        } else {
          console.log(
            `View clicked: Day ${day}, Month ${
              currentDate.getMonth() + 1
            }, Year ${currentDate.getFullYear()}`
          );
        }
      }

      this.selectedViewType = "day";
      this.currentDate = currentDate;
      this.updateCalendar();
    },

    bookClicked(day, currentDate, cell) {
      if (cell.class === "day") {
        console.log(
          `Book clicked: Day ${day}, Month ${
            currentDate.getMonth() + 1
          }, Year ${currentDate.getFullYear()}`
        );

        this.$router.push({
          path: `booking`,
          query: {
            bookday: `${day}/${
              currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`,
          },
        });
      } else if (cell.class === "prev-month-day") {
        if (currentDate.getMonth() + 1 <= 1) {
          currentDate.setMonth(11);
          console.log(
            `Book clicked: Day ${day}, Month ${currentDate.getMonth()}, Year ${
              currentDate.getFullYear() - 1
            }`
          );

          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${currentDate.getMonth() + 1}/${
                currentDate.getFullYear() - 1
              }`,
            },
          });
        } else {
          console.log(
            `Book clicked: Day ${day}, Month ${currentDate.getMonth()}, Year ${currentDate.getFullYear()}`
          );

          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
            },
          });
        }
      } else if (cell.class === "next-month-day") {
        if (currentDate.getMonth() + 1 >= 12) {
          currentDate.setMonth(0);
          console.log(
            `Book clicked: Day ${day}, Month ${
              currentDate.getMonth() + 1
            }, Year ${currentDate.getFullYear() + 1}`
          );

          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${currentDate.getMonth() + 1}/${
                currentDate.getFullYear() + 1
              }`,
            },
          });
        } else {
          console.log(
            `Book clicked: Day ${day}, Month ${
              currentDate.getMonth() + 2
            }, Year ${currentDate.getFullYear()}`
          );

          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${
                currentDate.getMonth() + 2
              }/${currentDate.getFullYear()}`,
            },
          });
        }
      }

      this.currentDate = currentDate;
      this.updateCalendar();
    },
    //Request Bar
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

<!-- Text & Body-->
<style scoped>
.text {
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.16px;
}

body {
  font-family: Arial, sans-serif;
}

h2 {
  color: #000;
  text-align: center;
  font-family: "Nunito";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.54px;
}
</style>

<!-- Request Bar -->
<style scoped>
.nametext {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.13px;
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
.scroll::-webkit-scrollbar {
  width: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #3c9bf2;
  border-radius: 4px;
}
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

.custom-chip {
  width: 277px;
  height: 194px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #569aff;
  box-shadow: 0px 0px 2px 0px #569aff;
  position: relative;
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

.v-navigation-drawer {
  z-index: 9999; /* Set a higher z-index value for the navigation drawer */
}
</style>

<!-- Calendar Main -->
<style scoped>
.calendar {
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
</style>

<!-- Calendar Day -->
<style scoped>
.time-day {
  height: 60px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: relative;
}

.calendar-day-size {
  width: 800px;
  margin: 0 auto;
}

.timeline-day {
  display: flex;
  flex-direction: column;
}

.text-container-day {
  display: flex;
  align-items: center;
}

.line-day,
.linee-day {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}

.linee-day {
  width: 94%;
  height: 1px;
  background-color: #ccc;
  margin-left: auto;
  margin-bottom: 14.7px;
}

.day-day {
  display: flex;
}

.event-container-day {
  display: flex;
  flex-wrap: wrap;
}

.event-day {
  flex: 1;
  position: relative;
  box-sizing: border-box;
}

.event-details-day {
  position: absolute;
  top: 0; /* Set top to 0 to align events within the time slots */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1;
  color: #fff;
}

.event-details-day span {
  display: block;
  margin-bottom: 5px;
}

.event-day:hover .event-details-day {
  display: flex; /* Show details on hover */
}

.event-day:hover {
  background-color: #f0f0f0;
}
</style>

<!-- calendar Week -->
<style scoped>
.current-day-week {
  background-color: rgba(60, 155, 242, 1);
  border-radius: 100%;
  padding: 5%;
  padding-left: 10%;
  padding-right: 10%;
  color: white;
}

.calendar-week {
  width: 100%;
  margin: 0px 0;
}

.calendar-week-grid {
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  grid-gap: 0px;
}

.calendar-week-box {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.all-day-label-week {
  background-color: white;
  color: #569aff;
  font-family: "Nunito";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 130px;
  /* height: 50px; */

  display: flex;
  justify-content: center;
  align-items: center;
}

.day-label-week {
  font-weight: bold;
  color: #9d9d9d;
  font-family: "Nunito";
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-row {
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  grid-gap: 0px;
}

.time-slot-week {
  width: 130px;
  height: 69px;
  background-color: white;
  font-weight: bold;

  color: #000;
  font-family: "Nunito";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<!-- Calendar Month -->
<style scoped>
.event-box-pink {
  margin-top: 10px;
  position: absolute;
  background-color: rgba(255, 192, 203, 0.5);
  width: 100%;
  height: 50px;

  z-index: 0;
}
.event-info-time {
  font-family: "Poppins", sans-serif;
  padding-left: 10px;
  text-align: left;
  opacity: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.event-info-name {
  font-family: "Poppins", sans-serif;
  padding-left: 10px;
  text-align: left;
  opacity: 100%;
  color: #3c9bf2;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.16px;

  max-width: 10%; /* Set your desired maximum width */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
