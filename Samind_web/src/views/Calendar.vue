<template>
  <v-row>
    <v-app
      style="z-index: 9999; background-color: transparent; position: fixed"
    >
      <v-container fluid>
        <v-col v-if="requestBarOpen === true" class="request-bar" col="4">
          <v-navigation-drawer
            color="white"
            location="right"
            app
            right
            style="width: auto"
          >
            <row>
              <label class="title ml-5 mr-10"> APPOINTMENT REQUEST </label>
              <v-btn icon variant="text" @click="toggleRequestBar">
                <v-icon>mdi-close</v-icon>
              </v-btn></row
            >
            <div class="scroll" style="height: 90vh; overflow-y: auto">
              <v-list align="center" dense>
                <v-list-item
                  v-for="(patient, patientIndex) in patients"
                  :key="patientIndex"
                  :class="{
                    'confirmed-item': patient.confirmed,
                    'cancel-item': patient.cancel,
                    'sure-item': patient.sureConfirmed || patient.sureCancel,
                    'new-appointment': patient.new,
                  }"
                  class="custom-chip mb-5"
                >
                  <div
                    v-if="
                      !patient.confirmed &&
                      !patient.cancel &&
                      !patient.sureCancel &&
                      !patient.sureConfirmed &&
                      patient.toDate === '-' &&
                      patient.toTime === '-'
                    "
                  >
                    <div style="margin-top: -10px" v-if="patient.value == ''">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          margin-top: -40px;
                          position: absolute;
                        "
                      >
                        <div
                          class="circle mr-2"
                          style="
                            background-color: rgba(86, 154, 255, 1);
                            width: 30px;
                            height: 30px;
                          "
                        >
                          <v-icon style="color: white">mdi-account</v-icon>
                        </div>

                        <label class="nametext">{{
                          patient.patientName
                        }}</label>
                      </div>
                      <br />
                      <div>
                        <div class="circle-container">
                          <div
                            class="circle"
                            style="
                              background-color: rgba(0, 191, 99, 1);
                              margin-bottom: 35px;
                            "
                          ></div>
                        </div>

                        <div
                          style="
                            display: flex;
                            position: absolute;
                            margin-top: -50px;
                            margin-left: 70px;
                          "
                        >
                          <label
                            class="text mr-8"
                            style="color: rgba(0, 191, 99, 1); font-size: 13px"
                            >Request</label
                          >
                          <label
                            class="text"
                            style="
                              color: rgba(0, 191, 99, 1);
                              font-weight: 500;
                              font-size: 13px;
                              text-align: start;
                              margin-left: -20px;
                            "
                            >{{ patient.fromDate }}<br />{{ patient.fromTime }}
                          </label>
                        </div>
                      </div>
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
                          box-shadow: 0px 0px 2px 0px #00bf63;
                        "
                        @click="confirm(patientIndex)"
                      >
                        confirm
                      </v-btn>
                      <v-btn
                        class="requestbtn"
                        style="
                          color: rgba(242, 86, 86, 1);
                          border: 1px solid rgba(242, 86, 86, 1);
                          box-shadow: 0px 0px 2px 0px rgba(242, 86, 86, 1);
                        "
                        @click="cancel(patientIndex)"
                      >
                        cancel
                      </v-btn>
                    </div>
                  </div>
                  <div v-if="patient.confirmed" class="confirmtext">
                    <label>
                      Are you sure you want to
                      <label style="font-weight: bold">confirm</label> this
                      meeting reschedule ?</label
                    >
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
                          color: white;
                          border: 1px solid white;
                          background-color: rgba(86, 154, 255, 1);
                          box-shadow: none;
                        "
                        @click="confirmConfirm(patientIndex)"
                      >
                        confirm
                      </v-btn>
                      <v-btn
                        class="requestbtn"
                        style="
                          color: white;
                          border: 1px solid white;
                          background-color: rgba(86, 154, 255, 1);
                          box-shadow: none;
                        "
                        @click="cancelConfirm(patientIndex)"
                      >
                        cancel
                      </v-btn>
                    </div>
                  </div>
                  <div v-if="patient.cancel" class="confirmtext">
                    <label>
                      Are you sure you want to
                      <label style="font-weight: bold">cancel</label> this
                      meeting reschedule ?</label
                    >
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
                          color: white;
                          border: 1px solid white;
                          background-color: rgba(86, 154, 255, 1);
                          box-shadow: none;
                        "
                        @click="confirmCancel(patientIndex)"
                      >
                        confirm
                      </v-btn>
                      <v-btn
                        class="requestbtn"
                        style="
                          color: white;
                          border: 1px solid white;
                          background-color: rgba(86, 154, 255, 1);
                          box-shadow: none;
                        "
                        @click="cancelCancel(patientIndex)"
                      >
                        cancel
                      </v-btn>
                    </div>
                  </div>
                  <div
                    v-if="
                      !patient.confirmed &&
                      !patient.cancel &&
                      !patient.sureCancel &&
                      !patient.sureConfirmed &&
                      patient.toDate !== '-' &&
                      patient.toTime !== '-'
                    "
                  >
                    <div style="margin-top: -10px" v-if="patient.value == ''">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          margin-top: -30px;
                          position: absolute;
                        "
                      >
                        <div
                          class="circle mr-2"
                          style="
                            background-color: rgba(86, 154, 255, 1);
                            width: 30px;
                            height: 30px;
                          "
                        >
                          <v-icon style="color: white">mdi-account</v-icon>
                        </div>

                        <label class="nametext">{{
                          patient.patientName
                        }}</label>
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
                            style="color: rgba(0, 191, 99, 1); font-size: 13px"
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
                            style="
                              color: rgba(157, 157, 157, 1);
                              font-size: 13px;
                            "
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
                      </div>
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
                          box-shadow: 0px 0px 2px 0px #00bf63;
                        "
                        @click="confirm(patientIndex)"
                      >
                        confirm
                      </v-btn>
                      <v-btn
                        class="requestbtn"
                        style="
                          color: rgba(242, 86, 86, 1);
                          border: 1px solid rgba(242, 86, 86, 1);
                          box-shadow: 0px 0px 2px 0px rgba(242, 86, 86, 1);
                        "
                        @click="cancel(patientIndex)"
                      >
                        cancel
                      </v-btn>
                    </div>
                  </div>

                  <div
                    v-if="patient.sureConfirmed || patient.sureCancel"
                    align="center"
                  >
                    <img
                      ref="animationContainer"
                      src="../assets/check.gif"
                      style="width: 150px; z-index: 1; position: relative"
                    />
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
          <button @click="prevWeek"><v-icon>mdi-chevron-left</v-icon></button>
          <h2 style="width: 200px">{{ currentWeekRange() }}</h2>
          <button @click="nextWeek"><v-icon>mdi-chevron-right</v-icon></button>
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

        <!-- calendar day -->
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
              <v-menu
                class="event-container-day"
                :position-x="menuPositionX"
                :position-y="menuPositionY"
              >
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    v-for="time in timesDayUse"
                    :key="time"
                    class="event-day"
                    :style="getEventStyle(time)"
                    @click="toggleListVisibility($event)"
                  >
                    <div v-if="eventsDay[time]" class="event-details-day">
                      <span class="title-day">{{
                        eventsDay[time].patientName
                      }}</span>
                      <span class="description-day"
                        >{{ eventsDay[time].timeA }}-{{
                          eventsDay[time].timeB
                        }}</span
                      >
                    </div>
                  </div>
                </template>
                <v-list v-if="isListVisible" class="custom-list-style">
                  <!-- Show v-list only if isListVisible is true -->
                  <v-list-item @click="">
                    <span class="pl-2">{{ eventsDay[time] }}</span>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>

        <!-- calendar week -->
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
            <!-- <div
              class="calendar-week-box"
              v-for="dayIndex in 7"
              :key="dayIndex"
            ></div> -->

            <div
              class="calendar-week-box"
              v-for="(dayIndex, day) in weekDays"
              :key="dayIndex"
            >
              <!-- Render events for the specific time slot and day -->
              <div v-for="event in events" :key="event.patientName">
                <!-- Check if the event time matches the current time slot -->
                <template v-if="checkTimeEvent(event.time, time)">
                  <!-- Check if the event belongs to the current day -->
                  <template
                    v-if="isEventOnDay(event, dayIndex) && isEventOnWeek(event)"
                  >
                    <div
                      class="event-week-box event"
                      :class="{
                        'event-box-special': isSpecialTime(event.time),
                      }"
                    >
                      {{ event.patientName }}
                      <br />

                      {{ showEventWeekTime(event.time, time) }}
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- calendar month -->
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

            <!-- event -->
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
                <label v-if="index == 0" class="event-info-time"
                  >{{ event.time }}
                </label>
                <br />
                <label v-if="index == 0" class="event-info-name">{{
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
              class="moreevent mt-2"
              v-if="hasMultipleEvents(cell.day, cell, currentDate)"
              style="font-size: 10px; margin-left: 10px; position: absolute"
            >
              + more events
            </label>
          </div>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup></script>
<script>
import { ref } from "vue";
import { startOfWeek, endOfWeek, format } from "date-fns";
import animationpath from "../assets/sending.json";
import lottie from "lottie-web";
import axios from "../axios.js";

export default {
  components: {},
  data() {
    return {
      // ใช้ใน request bar
      // count request
      request: 0,
      //request Appointment info
      patients: [
        {
          id: "01",
          patientId: "PID001",
          patientName: "Somsak Test1",
          toDate: "Tue, 19 Sep 2023",
          toTime: "10.00",
          fromDate: "Tue, 12 Sep 2023",
          fromTime: "10.00",
          value: "",
        },
        {
          id: "02",
          patientId: "PID002",
          patientName: "Somsee Test2",
          toDate: "Tue, 19 Sep 2023",
          toTime: "10.00",
          fromDate: "Tue, 12 Sep 2023",
          fromTime: "10.00",
          value: "",
        },
        {
          id: "03",
          patientId: "PID003",
          patientName: "Somchai Test3",
          toDate: "Tue, 19 Sep 2023",
          toTime: "10.00",
          fromDate: "Tue, 12 Sep 2023",
          fromTime: "10.00",
          value: "",
        },
        {
          id: "04",
          patientId: "PID004",
          patientName: "Somsom Test4",
          toDate: "Tue, 19 Sep 2023",
          toTime: "10.00",
          fromDate: "Tue, 12 Sep 2023",
          fromTime: "10.00",
          value: "",
        },
        {
          id: "05",
          patientId: "PID004",
          patientName: "Somsom Test4",
          toDate: "-",
          toTime: "-",
          fromDate: "Tue, 12 Sep 2023",
          fromTime: "10.00",
          value: "",
        },
      ],
      // set calendar type
      selectedViewType: "month",
      selectedDate: new Date(),
      currentMonth: "",
      currentWeek: "",
      calendarGrid: [],
      currentDate: new Date(),
      currentYear: "",
      selectedEvent: {},
      isListVisible: false,
      // ใช้เป็นตารางของ calendar day
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
        "24:00",
      ],
      // ใช้คูณหาตำแหน่งใน calendar day
      timesDayUse: [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
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
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "24:00",
        "24:30",
      ],
      eventsDay: [],
      // {
      //   //เปลี่ยนวันแล้วให้ยิง api ไปดึงข้อมูลมาในแต่ละรอบ
      //   "10:00": {
      //     patientName: "John Smith’s session",
      //     timeA: "10:00 ",
      //     timeB: "11:00",
      //   },
      //   "13:30": {
      //     patientName: "Jane Kim’s session",
      //     timeA: "13:30",
      //     timeB: "14:30",
      //   },
      //   "12:00": {
      //     patientName: "Jane Kim’s session",
      //     timeA: "12:00",
      //     timeB: "13:00",
      //   },
      // },
      menuPositionX: 0,
      menuPositionY: 0,
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
      requestBarOpen: false,
      //ใช้ใน calendar Month
      dayLabels: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"],
      events: [],
      // [
      //   {
      //     id: 1,
      //     patientName: "Sat 3",
      //     date: "3-2-2024",
      //     time: "2:00",
      //   },
      //   {
      //     id: 1,
      //     patientName: "Tue 30",
      //     date: "30-1-2024",
      //     time: "2:00",
      //   },
      //   {
      //     id: 1,
      //     patientName: "Sat 27",
      //     date: "27-1-2024",
      //     time: "1:00",
      //   },
      //   {
      //     id: 1,
      //     patientName: "Sun 28",
      //     date: "28-1-2024",
      //     time: "1:00",
      //   },
      //   {
      //     id: 2,
      //     patientName: "Wed 31",
      //     date: "31-1-2024",
      //     time: "1:00",
      //   },
      //   {
      //     id: 2,
      //     patientName: "Mon 29",
      //     date: "29-1-2024",
      //     time: "1:00",
      //   },
      //   {
      //     id: 2,
      //     patientName: "Thu 1",
      //     date: "1-2-2024",
      //     time: "1:00",
      //   },
      // ],
      //ใช้ใน calnedar week
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      timeSlots: [
        // "9:00",
        // "10:00",
        // "11:00",
        // "12:00",
        // "13:00",
        // "14:00",
        // "15:00",
        // "16:00",
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
        "24:00",
      ],
    };
  },
  computed: {},

  methods: {
    //Calendar Main
    selectDay() {
      var windowWidth = window.innerWidth;

      console.log("Window width: " + windowWidth);
      console.log("Selected DAY");
      this.selectedViewType = "day";
      const day = this.currentDate.getDate();
      const month = this.currentDate.getMonth() + 1; // Months are zero-based
      const year = this.currentDate.getFullYear();
      console.log("currentDay", this.currentDate);
      let param = {
        therapist_id: localStorage.getItem("id"),
        date: `${day}-${month}-${year}`,
      };
      console.log(param);
      axios
        .post("/calendarDay", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.eventsDay = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.eventsDay = [];
        });
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

      const adjustedDayIndex = (this.currentDate.getDay() - 1 + 7) % 7; // Adjust for Sunday

      return days[adjustedDayIndex] + " " + this.currentDate.getDate();
    },
    nextDay() {
      console.log("nextDay");
      const nextDay = new Date(this.selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      this.selectedDate = nextDay;
      this.currentDate = nextDay;
      const day = this.currentDate.getDate();
      const month = this.currentDate.getMonth() + 1; // Months are zero-based
      const year = this.currentDate.getFullYear();
      console.log("currentDay", this.currentDate);
      let param = {
        therapist_id: localStorage.getItem("id"),
        date: `${day}-${month}-${year}`,
      };
      console.log(param);
      axios
        .post("/calendarDay", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.eventsDay = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.eventsDay = [];
        });
      this.updateCalendar();
    },
    prevDay() {
      console.log("prevDay");
      const prevDay = new Date(this.selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      this.selectedDate = prevDay;
      this.currentDate = prevDay;
      const day = this.currentDate.getDate();
      const month = this.currentDate.getMonth() + 1; // Months are zero-based
      const year = this.currentDate.getFullYear();
      console.log("currentDay", this.currentDate);
      let param = {
        therapist_id: localStorage.getItem("id"),
        date: `${day}-${month}-${year}`,
      };
      console.log(param);
      axios
        .post("/calendarDay", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.eventsDay = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.eventsDay = [];
        });
      this.updateCalendar();
    },
    getEventStyle(time) {
      const event = this.eventsDay[time];
      if (event) {
        const index = this.timesDayUse.indexOf(time);
        const positionTop = (index + 5.7) * 30.1;
        return {
          height: "60px",
          backgroundColor: "#3C9BF2",
          borderBottom: "1px solid #ccc",
          position: "absolute",
          top: `${positionTop}px`,
          left: "435px",
          right: "0",
          width: "950px",
          borderRadius: "15px",
        };
      }
      return {
        height: "60px",
        backgroundColor: "transparent",
        borderBottom: "1px solid #ccc",
      };
    },
    toggleListVisibility(event) {
      this.menuPositionX = event.clientX;
      this.menuPositionY = event.clientY;
      this.isListVisible = !this.isListVisible;
    },
    //Calendar Week
    currentWeekRange() {
      const start = startOfWeek(this.currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(this.currentDate, { weekStartsOn: 0 });
      const startFormat = format(start, "d MMM");
      const endFormat = format(end, "d MMM");

      return `${startFormat} - ${endFormat}`;
    },
    prevWeek() {
      const prevWeekStart = startOfWeek(this.currentDate, { weekStartsOn: 0 });
      const prevWeekEnd = endOfWeek(this.currentDate, { weekStartsOn: 0 });
      const prevWeekEndDate = new Date(prevWeekStart);
      prevWeekEndDate.setDate(prevWeekEndDate.getDate() - 1);

      this.currentDate = prevWeekEndDate;
      this.updateCalendar();
    },
    nextWeek() {
      const nextWeekStart = startOfWeek(this.currentDate, { weekStartsOn: 0 });
      const nextWeekEnd = endOfWeek(this.currentDate, { weekStartsOn: 0 });
      const nextWeekStartDate = new Date(nextWeekEnd);
      nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);

      this.currentDate = nextWeekStartDate;
      this.updateCalendar();
    },
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
    checkTimeEvent(eventTime, Time) {
      let partEventTime = eventTime.split(":");
      let eventHour = parseInt(partEventTime[0]);

      let partTime = Time.split(":");
      let timeHour = parseInt(partTime[0]);

      return eventHour == timeHour;
    },
    isEventOnDay(event, targetDay) {
      const [day, month, year] = event.date
        .split("-")
        .map((part) => parseInt(part));

      const eventDate = new Date(year, month - 1, day);

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const eventDayName = dayNames[eventDate.getDay()];

      return eventDayName === targetDay;
    },
    isEventOnWeek(event) {
      const start = startOfWeek(this.currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(this.currentDate, { weekStartsOn: 0 });
      const startFormat = new Date(format(start, "dd/MM/yyyy"));
      const endFormat = new Date(format(end, "dd/MM/yyyy"));
      const eventDate = new Date(
        event.date.split("-")[2],
        event.date.split("-")[1] - 1,
        event.date.split("-")[0]
      );

      const eventFormat = format(eventDate, "dd/MM/yyyy");

      // console.log("week", eventDate, start, end);
      return eventDate >= start && eventDate <= end;
    },
    isSpecialTime(time) {
      const parts = time.split(":");
      const min = parseInt(parts[1]);

      return min === 30;
    },
    showEventWeekTime(eventTime, time) {
      let partTime = eventTime.split(":");
      let eventMinTime = parseInt(partTime[1]);

      if (eventMinTime == 30) {
        let endTime = this.timeSlots[this.timeSlots.indexOf(time) + 1];

        let partEndTime = endTime.split(":");

        return eventTime + "-" + partEndTime[0] + ":30";
      } else {
        return (
          eventTime + "-" + this.timeSlots[this.timeSlots.indexOf(time) + 1]
        );
      }
    },
    //Calendar Month
    async fetchEvents() {
      let param = {
        therapist_id: localStorage.getItem("id"),
      };
      await axios
        .post("/calendar_view", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.events = response.data;
          // .map((event, index) => ({
          //   // id: index + 1,
          //   patientName: event.patientName,
          //   date: event.date,
          //   time: event.time,
          // }));

          console.log("this.events", this.events);
          // this.events = [
          //   {
          //     patientName: "jare year",
          //     date: "29-1-2024",
          //     time: "10:00",
          //   },
          //   {
          //     patientName: "30 y",
          //     date: "30-1-2024",
          //     time: "10:00",
          //   },
          // ];
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("api event", this.events);
      // window.location.reload();
    },
    formatDate(dateString) {
      const parts = dateString.split("-");
      const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
      return formattedDate;
    },
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

      day = day.toString().padStart(2, "0");
      month = month.toString().padStart(2, "0");
      // ตรวจสอบว่ามีเหตุการณ์ในวันที่กำหนดหรือไม่
      console.log(
        this.events.some(
          (event) => event.date == day + "-" + month + "-" + year
        ),
        day + "-" + month + "-" + year
      );
      return this.events.some(
        (event) => event.date == day + "-" + month + "-" + year
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
      day = day.toString().padStart(2, "0");
      month = month.toString().padStart(2, "0");
      // ดึงข้อมูลเหตุการณ์ทั้งหมดในวันที่กำหนด
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
      let month = currentDate.getMonth(); // Months are zero-based
      let year = currentDate.getFullYear();

      if (cell.class === "day") {
        console.log(
          `View clicked: Day ${day}, Month ${month + 1}, Year ${year}`
        );
      } else if (cell.class === "prev-month-day") {
        if (month === 0) {
          month = 11; // December of previous year
          year--;
        } else {
          month--;
        }
        console.log(
          `View clicked: Day ${day}, Month ${month + 1}, Year ${year}`
        );
      } else if (cell.class === "next-month-day") {
        if (month === 11) {
          month = 0; // January of next year
          year++;
        } else {
          month++;
        }
        console.log(
          `View clicked: Day ${day}, Month ${month + 1}, Year ${year}`
        );
      }

      this.selectedViewType = "day";
      this.currentDate = new Date(year, month, day);

      console.log(
        "currentDate",
        day + "-" + (month + 1) + "-" + year,
        new Date(year, month, day)
      );

      let param = {
        therapist_id: localStorage.getItem("id"),
        date: `${year}-${month + 1}-${day}`,
      };

      console.log("param", param);

      axios
        .post("/calendarDay", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
          this.eventsDay = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          this.eventsDay = [];
        });

      this.updateCalendar();
    },

    bookClicked(day, currentDate, cell) {
      if (cell.class === "day") {
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
          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${currentDate.getMonth() + 1}/${
                currentDate.getFullYear() - 1
              }`,
            },
          });
        } else {
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
          this.$router.push({
            path: `booking`,
            query: {
              bookday: `${day}/${currentDate.getMonth() + 1}/${
                currentDate.getFullYear() + 1
              }`,
            },
          });
        } else {
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
      this.requestBarOpen = !this.requestBarOpen;

      console.log("open", this.requestBarOpen);
    },
    confirm(index) {
      // confirm case
      if (index >= 0 && index < this.patients.length) {
        console.log("confirm case", index);
        this.patients[index].confirmed = true;
      }
    },
    confirmConfirm(index) {
      // confirm confirm this case
      if (index >= 0 && index < this.patients.length) {
        console.log("confirm confirm this case", index);
        this.patients[index].confirmed = false;
        this.patients[index].sureConfirmed = true;
        this.patients[index].value = "Y";
        this.handleSureCase(index);
      }
    },
    cancelConfirm(index) {
      // cancel in confirm case
      if (index >= 0 && index < this.patients.length) {
        console.log("sure to cancel confirm this case");
        this.patients[index].confirmed = false;
      }
    },
    cancel(index) {
      //cancel case
      if (index >= 0 && index < this.patients.length) {
        console.log("cancel case");
        this.patients[index].cancel = true;
      }
    },
    confirmCancel(index) {
      // confirm cancel this case
      if (index >= 0 && index < this.patients.length) {
        console.log("confirm Cancel this case");
        this.patients[index].cancel = false;
        this.patients[index].sureCancel = true;
        this.patients[index].value = "N";
        this.handleSureCase(index);
      }
    },
    cancelCancel(index) {
      // cancel in cencel case
      if (index >= 0 && index < this.patients.length) {
        console.log("sure to cancel this case");
        this.patients[index].cancel = false;
      }
    },
    handleSureCase(patient) {
      let param = {
        patientID: this.patients[patient].patientId,
        patientName: this.patients[patient].patientName,
        dateFrom: this.patients[patient].fromDate,
        timeFrom: this.patients[patient].fromTime,
        dateTo: this.patients[patient].toDate,
        timeTo: this.patients[patient].toTime,
        confirm: this.patients[patient].value,
      };
      console.log(param);
      axios
        .post("/appointmentRequestConfirm", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          this.eventsDay = [];
        });
      this.loadAnimation();
      setTimeout(() => {
        console.log("finish", patient);
        this.patients.splice(patient, 1);
      }, 3000);
    },
    loadAnimation() {
      this.$nextTick(() => {
        const animationContainer = this.$refs.animationContainer;
        console.log("Animation Container:", animationContainer);

        lottie.loadAnimation({
          container: animationContainer,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationpath,
        });
      });
    },
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
    await this.fetchEvents();
    let param = {
      therapist_id: localStorage.getItem("id"),
    };
    console.log(param);
    axios
      .post("/appointmentRequestView", param, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        this.request = response.data.length;
        this.patients = response.data.map((patient, index) => ({
          id: index + 1,
          patientId: patient.patientID,
          patientName: patient.patientName,
          toDate: patient.dateTo,
          toTime: patient.timeTo,
          fromDate: patient.dateFrom,
          fromTime: patient.timeFrom,
          value: "",
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
        this.eventsDay = [];
      });
    this.selectedDate = new Date();
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();

    console.log("currentdate", this.currentDate);
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
.hidden-details {
  display: none;
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
  z-index: 9;
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
/* confirm or cancel */
.confirmed-item,
.cancel-item,
.sure-item {
  background-color: rgba(86, 154, 255, 1);
}

.confirmtext {
  margin-top: -5px;
  color: #fff;
  text-align: center;
  font-family: "Poppins";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.13px;
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
  width: 1000px;
  margin: 0 auto;
}

@media only screen and (max-width: 1029px) {
  .calendar-day-size {
    width: 500px !important;
  }
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
  width: 100%;
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
  top: 0;
  left: 10%;
  transform: translateX(-50%);
  text-align: left;
  z-index: 1;
  color: #fff;
}

.event-details-day span {
  display: block;
  margin-bottom: 5px;
}

/* .event-day:hover .event-details-day {
  display: flex;
} */

.event-day:hover {
  background-color: #f0f0f0;
}

.custom-list-style {
  max-width: 297px;
  max-height: 167px;
}
</style>

<!-- calendar Week -->
<style scoped>
.event-week-box {
  position: absolute;
  padding: 10px;
  text-align: left;
  margin: -10px;
  width: 155px;
  height: 70px;
  background-color: rgba(116, 121, 255, 1);
  border: 1px solid rgba(116, 121, 255, 1);
  color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  font-size: 14px;
  overflow: hidden;
}
.event-box-special {
  position: absolute;
  margin-top: 20px !important;
  padding: 10px;
  text-align: left;
  margin: -10px;
  width: 155px;
  height: 70px;
  background-color: rgba(116, 121, 255, 1);
  border: 1px solid rgba(116, 121, 255, 1);
  color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  font-size: 14px;
  overflow: hidden;
}
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
  background-color: rgba(112, 229, 255, 0.33);
  width: 100%;
  height: 50px;
  user-select: none;
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
  user-select: none;
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
  user-select: none;
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
  user-select: none;
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
@media only screen and (max-width: 768px) {
  .day,
  .calendar-box {
    width: calc(100% / 7); /* Adjust width for smaller screens */
    max-width: none; /* Reset max-width */
  }
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
  z-index: 1;
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
  z-index: 1;
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

.calendar-box:hover .event-box-pink,
.calendar-box:hover .moreevent {
  opacity: 0;
}
</style>
