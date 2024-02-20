<template>
  <v-col class="px-10 mt-10">
    <v-row align="center">
      <v-col cols="6" style="font-weight: 400; font-size: 20px">
        {{ patientName }} >>
        <label style="font-weight: bold">Test History</label></v-col
      >
    </v-row>
    <v-row align="center">
      <v-col cols="3">
        <v-text-field
          class="mt-2"
          density="comfortable"
          rounded="xl"
          variant="outlined"
          placeholder="Search Test"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-menu>
        <template
          v-slot:activator="{ props }"
          style="
            width: 10px !important;
            min-width: 10px !important;
            white-space: nowrap;
            overflow: hidden;
          "
        >
          <v-btn
            v-bind="props"
            rounded="xl"
            class="text-none mx-auto"
            color="#BED8FF"
            block
            size="x-large"
            variant="flat"
            style="
              font-family: 'Inter', 'sans-serif';
              width: 10px !important;
              min-width: 10px !important;
              white-space: nowrap;
              overflow: hidden;
            "
          >
            <v-icon class="mr-2">mdi-sort-variant</v-icon>Sort by
          </v-btn>
        </template>
        <v-list style="border-radius: 10px 10px 0px 0px">
          <v-list-item
            :style="{
              'background-color': sortType === 'desc' ? '#C9C9C9' : 'white',
            }"
            @click="
              {
                (sortDirection = 'desc'), (this.sortType = 'desc');
              }
            "
          >
            <span class="pl-2">Newest first</span>
          </v-list-item>
          <v-list-item
            :style="{
              'background-color': sortType === 'asc' ? '#C9C9C9' : 'white',
            }"
            @click="(sortDirection = 'asc'), (this.sortType = 'asc')"
          >
            <span class="pl-2">Oldest first</span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-data-table
      rounded="xl"
      v-model:page="page"
      :headers="headers"
      :items="filteredHistorys"
      class="elevation-1"
      style="border-radius: 10px"
    >
      <template v-slot:item.result="{ item }">
        <label
          :style="{
            color: getColor(item.columns.result, item.columns.testName),
          }"
        >
          <template
            v-if="
              item.columns.testName !== 'PHQ9' && item.columns.testName !== '2Q'
            "
          >
            <v-chip
              color="blue"
              @click="() => $router.push('/dashboard/testresult')"
            >
              see result
            </v-chip>
          </template>
          <template v-else>
            {{ getResult(item.columns.result, item.columns.testName) }}
          </template>
        </label>
      </template>

      <template v-slot:bottom>
        <v-row class="pt-2 px-2">
          <v-col cols="auto">
            <v-select
              variant="solo-filled"
              :hide-details="true"
              flat
              :items-per-page="itemsPerPage"
              v-model="itemsPerPage"
              :items="[10, 20, 30, 40, 50]"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-pagination
              active-color="primary"
              v-model="page"
              :length="2"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-col>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";
// onMounted(async () => {
//   try {
//     let url = "/question";
//     await axios
//       .get(url)
//       .then((response) => {
//         console.log(response.data)
//       })

//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// });
let search = ref("");

const filteredHistorys = computed(() => {
  const searchTerm = search.value.toLowerCase();
  let info = historys.filter((item) =>
    item.testName.toLowerCase().includes(searchTerm)
  );

  return sortHistorys(info);
});

let sortDirection = ref("asc");

function sortHistorys(historys) {
  const sortedHistorys = [...historys]; // Create a copy of the original array

  // Sort by date
  sortedHistorys.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortDirection.value === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return sortedHistorys;
}

const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "id",
  },
  { title: "Test Name", key: "testName", align: "start", sortable: false },
  { title: "Result", key: "result", align: "center", sortable: false },
  { title: "Date", key: "date", align: "center", sortable: false },
];
const historys = [
  {
    id: "01",
    testName: "2Q",
    result: "1",
    date: "Oct 13, 2023 13:00",
  },
  {
    id: "02",
    testName: "PHQ9",
    result: "10",
    date: "Oct 14, 2023 13:00",
  },
  {
    id: "03",
    testName: "2Q",
    result: "2",
    date: "Oct 15, 2023 13:00",
  },
  {
    id: "04",
    testName: "test1",
    result: "-",
    date: "Oct 16, 2023 13:00",
  },
  {
    id: "05",
    testName: "test2",
    result: "-",
    date: "Oct 17, 2023 13:00",
  },
  {
    id: "06",
    testName: "test3",
    result: "-",
    date: "Oct 18, 2023 13:00",
  },
];
function getColor(result, test) {
  if (test === "PHQ9") {
    if (result < 7) {
      return "#11dd66";
    } else if (result >= 7 && result <= 12) {
      return "#FFDE59";
    } else if (result >= 13 && result <= 18) {
      return "#FF914D";
    } else if (result >= 19) {
      return "#FF5757";
    }
  }

  if (test === "2Q") {
    if (result != 0) {
      return "#11dd66";
    } else if (result == 0) {
      return "#FFDE59";
    }
  }
}

function getResult(result, test) {
  if (test === "PHQ9") {
    if (result < 7) {
      return "ท่านไม่มีอาการซึมเศร้าหรือมีอาการซึมเศร้าในระดับน้อยมาก";
    } else if (result >= 7 && result <= 12) {
      return "ท่านมีอาการซึมเศร้าในระดับน้อย";
    } else if (result >= 13 && result <= 18) {
      return "ท่านมีอาการซึมเศร้าในระดับปานกลาง";
    } else if (result >= 19) {
      return "ท่านมีอาการซึมเศร้าในระดับรุนแรง";
    }
  }

  if (test === "2Q") {
    if (result != 0) {
      return "ท่านมีแนวโน้มเป็นโรคซึมเศร้า";
    } else if (result == 0) {
      return "ท่านไม่มีแนวโน้มเป็นโรคซึมเศร้า";
    }
  }
}
</script>
<script>
export default {
  data() {
    return {
      patientName: "",
      sortType: "",
    };
  },
  created() {
    this.patientName = this.$route.query.patientName;
  },
  methods: {},
};
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
</style>
