<template>
  <div class="patientview">
    <div class="patientbg">
      <h1 class="patientlabel">PATIENTS LIST</h1>

      <input class="searchpatient" type="text" placeholder="Search Patient" />
      <svg
        class="searchpatienticon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z"
          fill="#90A0B7"
        />
      </svg>
      <div>
        <table class="patienttable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Mood</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in data" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ row.column1 }}</td>
              <td>{{ row.column2 }}</td>
              <td>{{ row.column3 }}</td>
              <td>{{ row.column4 }}</td>
              <td>{{ row.column5 }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <svg
          class="patienttablebuttonnext"
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 5L15 12L9 19"
            stroke="#6B6B6B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
  <menu-bar></menu-bar>
</template>

<script>
import MenuBar from "../components/MenuBar.vue";

export default {
  name: "App",
  components: {
    "menu-bar": MenuBar,
  },
};
</script>

<style>
.patientbg {
  position: absolute;
  background: white;
  width: 240vh;
  height: 100vh;
  top: 50px;
  left: 99px;
  z-index: -1;
}
.patientlabel {
  color: #000;
  font-family: "Poppins";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.6px;
  position: absolute;
  top: 50px;
  left: 200px;
  z-index: 1;
}
.searchpatient {
  position: fixed;
  top: 94px;
  right: 50px;

  width: 216px;
  height: 42px;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid #d1c9c9;
  background: rgba(217, 217, 217, 0.33);

  text-align: center;
  z-index: 1;
}
.searchpatienticon {
  position: fixed;
  top: 106px;
  right: 230px;
}
.patienttable {
  width: 1185px;
  height: 444px;
  flex-shrink: 0;

  border-radius: 15px;
  border: 1px solid #d1c9c9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  position: fixed;
  top: 150px;
  left: 300px;
}
.patienttable th {
  display: flex;
  width: 190px;
  height: 66px;
  padding-top: 20px;
  flex-direction: column;
  display: inline-table;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  text-align: center;
  font-family: "Poppins";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.45px;
}

.patienttable thead {
  display: flex;
  border-bottom-color: #000;
  border-width: 1px;
}
.patienttablebuttonnext {
  position: fixed;
  bottom: 150px;
  right: 90px;
}
</style>
