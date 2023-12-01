<template>
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
          <!-- Display event details if available -->
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
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
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
        // Add more events as needed
      },
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.calendar-day-size {
  width: 800px;
  margin: 0 auto;
}

.timeline-day {
  display: flex;
  flex-direction: column;
}

.time-day {
  height: 60px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: relative;
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
