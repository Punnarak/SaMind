<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> Edit Test </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="black"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          to="/dashboard/test"
        >
          <v-icon style="margin-right: 10px">mdi-close-circle-outline</v-icon
          >Cancel
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          rounded="xl"
          class="text-none mx-auto"
          color="#569AFF"
          block
          size="x-large"
          variant="flat"
          style="font-family: 'Inter', 'sans-serif'"
          @click="createTest"
        >
          <v-icon>mdi-file-document-outline</v-icon>Create Test
        </v-btn>
      </v-col>
    </v-row>

    <!-- Test Detail Section -->
    <v-card class="mx-auto" col="6" rounded="xl">
      <v-list lines="two">
        <v-list-subheader
          class="ml-3"
          style="font-family: 'Poppins', 'sans-serif'; border-bottom-width: 1px"
        >
          Test Detail
        </v-list-subheader>
        <v-divider insert></v-divider>

        <!-- Test Name -->
        <v-list-item>
          <v-col cols="12" sm="6" md="4" style="height: 350px">
            <label style="font-weight: bold">Test Name</label>
            <label style="color: red">*</label>
            <v-text-field
              class="mt-2 mb-4"
              variant="outlined"
              rounded="lg"
              v-model="testName"
              :rules="testNameRules"
              style="width: 245px; border-radius: 10px"
            ></v-text-field>

            <!-- Test Description -->
            <label style="font-weight: bold">Test Description</label>
            <v-text-field
              class="mt-2"
              variant="outlined"
              rounded="lg"
              v-model="description"
              style="border-radius: 10px; height: 300px"
            ></v-text-field>
          </v-col>
        </v-list-item>

        <v-divider insert></v-divider>
        <!-- Question Section -->
        <v-list-item
          class="ml-4"
          v-for="(question, questionIndex) in questions"
          :key="questionIndex"
        >
          <label style="font-weight: bold">
            Question
            <template v-if="questions.length > 1">
              <v-icon color="red" icon @click="removeQuestion(questionIndex)"
                >mdi-delete</v-icon
              >
            </template>
          </label>
          <v-col cols="12" sm="6" md="4">
            <v-row cols="6">
              <v-text-field
                v-model="question.question"
                class="mt-2 mb-4"
                variant="outlined"
                rounded="lg"
                style="border-radius: 10px"
              ></v-text-field>
              <v-btn
                class="ml-4 mt-2"
                style="background-color: #5686e1"
                icon
                @click="addQuestion(questionIndex)"
              >
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </v-row>
            <!-- Options for the question -->
            <v-radio-group v-model="question.answer">
              <v-row
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
              >
                <v-col cols="3">
                  <label style="font-weight: bold">option</label>
                  <!-- Use a unique v-model for each radio button -->
                  <v-radio :value="option" v-model="question.answer"></v-radio>
                </v-col>
                <template v-if="question.options.length > 1">
                  <v-icon
                    color="red"
                    @click="removeQuestionOption(questionIndex, optionIndex)"
                    >mdi-delete</v-icon
                  >
                </template>
                <v-col cols="6">
                  <v-text-field
                    v-model="question.options[optionIndex]"
                    class="mt-2 mb-4"
                    variant="outlined"
                    rounded="lg"
                    style="border-radius: 10px; width: 100%"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    icon
                    @click="addQuestionOption(questionIndex, optionIndex)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
          <v-divider insert></v-divider>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "../axios.js";

export default {
  data() {
    return {
      oldType: "",
      questions: [
        {
          text: "",
          options: [""],
        },
      ],
      testName: "",
      testNameRules: [
        (value) => {
          if (value) return true;
          return "You must enter a test name.";
        },
      ],
      description: "",
    };
  },
  mounted() {
    this.mockTestData();
  },

  methods: {
    mockTestData() {
      console.log("query param", this.$route.query);
      if (this.$route.query != null) {
        this.oldType = this.$route.query.testName;
        this.testName = this.$route.query.testName;
        console.log("edittest: ", this.testName);

        // let questionsapi = [
        //   {
        //     no: 1,
        //     question: "What is your favorite color?",
        //     options: ["Red", "Green", "Blue"],
        //     type: "Mock Type",
        //     answer: "Red", // Index of the correct answer in the options array
        //   },
        //   {
        //     no: 2,
        //     question: "How many fingers do you have?",
        //     options: ["Four", "Five", "Six"],
        //     type: "Mock Type",
        //     answer: "Five", // Index of the correct answer in the options array
        //   },
        // ];

        let test = ref([]);
        const param = {
          therapistId: 5555,
          type: this.testName,
        };
        axios
          .post("/viewOneQuestion", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("response123456", response.data);
            this.description = response.data[0].description;
            test.value = response.data;
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        this.questions = test;
        console.log("Questions:", this.questions);
      }
    },
    addQuestionOption(questionIndex, index) {
      // Push an empty string as a new option for the specified question
      // this.questions.options.push("");

      this.questions[questionIndex].options.splice(index + 1, 0, "");
    },
    removeQuestionOption(questionIndex, optionIndex) {
      // Remove the option for the specified question index and option index
      this.questions[questionIndex].options.splice(optionIndex, 1);
    },
    addQuestion(index) {
      const newQuestion = { question: "", options: [""] }; // Create a new question with an empty option
      this.questions.splice(index + 1, 0, newQuestion); // Add the new question to the list of questions
    },
    removeQuestion(index) {
      // Remove the question and corresponding options at the specified index
      this.questions.splice(index, 1);
    },
    createTest() {
      const questions = this.questions.map((question, index) => ({
        no: index + 1, // Assuming a simple incrementing ID starting from 15
        question: question.question,
        options: question.options,
        answer: question.answer,
        type: this.testName, // Assuming a simple incrementing type starting from test5
      }));

      // Convert testData to JSON string
      // const testDataJSON = JSON.stringify(testData, null, 2);
      const param = {
        therapist_id: 5555,
        description: this.description,
        oldType: this.oldType,
        questions,
      };
      console.log("questions (JSON):", JSON.stringify(param, null, 2));

      // Add additional logic for handling the created test data if needed

      // Placeholder message for now
      console.log("Test creation logic to be implemented.");

      // axios
      //   .post("/questionAdd", testDataJSON)
      //   .then((response) => {
      //     console.log("Inserted questions:", response.data);
      //     this.$router.push("/dashboard/test");
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });

      axios
        .post("/questionUpdate", JSON.stringify(param, null, 2), {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("Inserted questions:", response.data);
          this.$router.push("/dashboard/test");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles you need */
</style>
