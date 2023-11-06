<template>
  <v-col class="px-10">
    <v-row align="center" class="calendar" justify="center">
      <v-col class="calendar-header" v-if="selectedViewType === 'day'" cols="4">
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
      <v-col cols="4">
        <!-- Empty space on the right -->
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
</template>

<script>
export default {
  data() {
    return {
      selectedViewType: "month", // Initially, show the grid view
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

    // Update the current day to the previous day
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
      // Calculate the position and height of the event based on its start and end times
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
      // Implement event editing logic
      console.log("Edit event: " + event.title);
    },
    updateCalendar() {
      this.currentMonth = `${this.months[this.currentDate.getMonth()]}, ${
        this.currentYear
      }`;

      // Clear the existing calendar grid
      this.calendarGrid = [];

      // Calculate the number of days in the current month
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

      // Calculate the previous month's last day correctly
      const prevMonthLastDay = new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        0
      );

      // Calculate the next month's first day
      const nextMonthFirstDay = new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        1
      );

      // Add cells for the days of the previous month in gray
      for (let i = 0; i < firstDay.getDay(); i++) {
        const day = prevMonthLastDay.getDate() - firstDay.getDay() + i + 1;
        this.calendarGrid.push({
          key: `prev-${i}`,
          day,
          class: "prev-month-day",
        });
      }

      // Add the days of the current month
      for (let day = 1; day <= numDays; day++) {
        this.calendarGrid.push({ key: `day-${day}`, day, class: "day" });
      }

      // Add cells for the days of the next month
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
      // Handle the click on the "DAY" button
      console.log("Selected DAY");
      this.selectedViewType = "day";
    },
    selectWeek() {
      // Handle the click on the "WEEK" button
      console.log("Selected WEEK");
      this.selectedViewType = "week";
    },
    selectMonth() {
      // Handle the click on the "MONTH" button
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
  width: 150px;
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
