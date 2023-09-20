<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col cols="6" style="font-weight: 600"> Create Test </v-col>
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
          to="createtest"
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
          to="createtest"
        >
          <v-icon>mdi-file-document-outline</v-icon>Create Test
        </v-btn>
      </v-col>
    </v-row>

    <!-- Test Detail Section -->
    <v-card class="mx-auto" col="6" rounded="xl">
      <v-list lines="two">
        <v-list-subheader
          style="font-family: 'Poppins', 'sans-serif'; border-bottom-width: 1px"
        >
          Test Detail
        </v-list-subheader>
        <v-divider inset></v-divider>

        <!-- Test Name -->
        <v-list-item>
          <v-col cols="12" sm="6" md="4">
            <label>Test Name</label> <label style="color: red">*</label>
            <v-text-field
              class="mt-2 mb-4"
              variant="outlined"
              rounded="lg"
              style="width: 245px; border-radius: 10px"
            ></v-text-field>

            <!-- Test Description -->
            <label>Test Description</label>
            <v-text-field
              class="mt-2 mb-4"
              variant="outlined"
              rounded="lg"
              style="border-radius: 10px"
            ></v-text-field>
          </v-col>
        </v-list-item>

        <v-divider inset></v-divider>

        <!-- Question Section -->
        <v-list-item v-for="(question, index) in questions" :key="index">
          <v-col cols="12" sm="6" md="4">
            <label>
              Question
              <template v-if="questions.length > 1">
                <v-btn icon @click="removeQuestion(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </template>
            </label>
            <v-row col="6">
              <v-text-field
                v-model="questions[index]"
                class="mt-2 mb-4"
                variant="outlined"
                rounded="lg"
                style="border-radius: 10px"
              ></v-text-field>
              <v-btn icon @click="addQuestion(index + 1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <v-divider insert></v-divider>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      questions: [""], // Initialize with an empty question
      options: [""],
    };
  },
  methods: {
    addQuestion(index) {
      this.questions.splice(index, 0, ""); // Add a new empty question at the specified index
    },
    removeQuestion(index) {
      this.questions.splice(index, 1); // Remove the question at the specified index
    },
  },
};
</script>

<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}
.title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 0px;
  font-family: "Nunito", sans-serif;
}
</style>
