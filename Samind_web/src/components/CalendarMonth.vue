<template>
  <v-row>
    <!-- Calendar Content -->
    <v-col class="px-10 mt-3" col="8">
      <v-row align="center" class="calendar" justify="center">
        <div class="calendar-grid">
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
<script setup></script>
<script>
// import Calendar from "../components/CalendarDay.vue";
export default {
  components: {
    // Calendar,
  },
  mounted() {
    // Create a new instance of CalendarMonth
    const calendarInstance = this.$createElement(Calendar);

    // Attach the ref to the new instance
    calendarInstance.ref = "calendarRef";

    // Mount the component to the parent
    this.$mount(calendarInstance.$el, this.$el);

    // Now you can access the ref
    // this.$refs.calendarRef.month = this.month;
  },
  data() {
    return {
      text: "s",
      selectedViewType: "month",
      selectedDate: new Date(),
      currentMonth: "",
      calendarGrid: [],
      currentDate: new Date(),
      currentYear: "",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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

      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      timeSlots: [
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
    set() {
      console.log("innnn", this.text);
    },

    getScheduleLineStyle() {
      const top = (this.currentTimeMinutes * 100) / 1440 + "%";
      return { top };
    },

    editEvent(event) {
      console.log("Edit event: " + event.title);
    },
    updateCalendar() {
      this.$refs.calendarRef.currentMonth = `${
        this.months[this.currentDate.getMonth()]
      }, ${this.currentYear}`;

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
.calendar-week-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
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

.calendar-week-box {
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
