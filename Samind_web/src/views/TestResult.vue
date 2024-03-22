<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> Test Result </v-col>
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
          @Click="$router.go(-1)"
        >
          <v-icon style="margin-right: 10px">mdi-arrow-left</v-icon>Back
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
              disabled="true"
              style="width: 245px; border-radius: 10px; opacity: 1"
            ></v-text-field>

            <!-- Test Description -->
            <label style="font-weight: bold">Test Description</label>
            <v-text-field
              class="mt-2"
              variant="outlined"
              rounded="lg"
              v-model="description"
              style="border-radius: 10px; height: 300px; word-wrap: break-word"
              :disabled="true"
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
          <label style="font-weight: bold"> Question </label>
          <v-col cols="12" sm="6" md="4">
            <v-row cols="6">
              <v-text-field
                :disabled="true"
                v-model="question.question"
                class="mt-2 mb-4"
                variant="outlined"
                rounded="lg"
                style="border-radius: 10px; color: black"
              ></v-text-field>
            </v-row>
            <!-- Options for the question -->
            <v-radio-group v-model="question.selectedAnswer">
              <v-row
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
              >
                <v-col cols="8">
                  <label style="font-weight: bold">option</label>
                  <v-radio
                    :value="option"
                    :label="option"
                    :disabled="true"
                  ></v-radio>
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
import { ref } from "vue";
import axios from "../axios.js";

export default {
  data() {
    return {
      questions: [],
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
      // this.questions = [
      //   {
      //     question: "What is your favorite color?",
      //     options: ["Red", "Green", "Blue"],
      //     selectedAnswer: "Red",
      //   },
      //   {
      //     question: "How many fingers do you have?",
      //     options: ["Four", "Five", "Six"],
      //     selectedAnswer: null,
      //   },
      // ];

      this.testName = "Sample Test";
      this.description = "This is a sample test for demonstration purposes.";
      console.log("query test param", this.$route.query,this.$route.query.questions);
      if (this.$route.query != null) {
        this.testName = this.$route.query.testName;
        this.description = this.$route.query.description;
        let receivedQuestions = JSON.parse(this.$route.query.questions);

        this.questions = receivedQuestions;
        console.log("Questions:", this.questions);
      }
    },
  },
};
</script>

<style scoped></style>
