<template>
  <v-main style="display: flex">
    <div>
      <img
        src="../assets/signin/whitemood.png"
        style="
          position: absolute;
          top: 0px;
          left: -120px;
          z-index: 0;
          height: 170%;
        "
      />
      <div class="d-none d-md-block">
        <img
          src="../assets/signin/avatar.svg"
          style="position: absolute; bottom: 0px; left: 20px; z-index: 0"
        />
      </div>
    </div>
    <v-container class="center">
      <v-col cols="12" md="6">
        <v-card class="px-10" rounded="xl">
          <v-container>
            <v-col>
              <div class="subtext text-center">SaMind</div>
              <div class="title text-center">Sign in</div>
            </v-col>
            <v-card-text>
              <v-form>
                <label>Email</label>
                <v-text-field
                  class="mt-2"
                  variant="outlined"
                  placeholder="Enter your email"
                  density="comfortable"
                  rounded="lg"
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
                <label>Password</label>
                <v-text-field
                  class="mt-2 mb-4"
                  type="password"
                  variant="outlined"
                  placeholder="Enter your password"
                  density="comfortable"
                  rounded="lg"
                  v-model="password"
                  :rules="passwordRules"
                ></v-text-field>

                <v-btn
                  rounded="lg"
                  class="text-none mx-auto"
                  color="#569AFF"
                  block
                  size="x-large"
                  variant="flat"
                  @click="() => $router.push('/dashboard/patient')"
                >
                  Sign in
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        (value) => {
          if (!value) {
            return "You must enter an email address.";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid email address. Please enter a valid email.";
          } else {
            return true;
          }
        },
      ],
      password: "",
      passwordRules: [
        (value) => {
          if (!value) {
            return "You must enter a password.";
          } else {
            return true;
          }
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.v-main {
  background-color: #bed8ff;
  overflow: hidden;
  position: relative;
}

.elevation-2 {
  z-index: 1;
}

.title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 0px;
  font-family: "Nunito", sans-serif;
}

.subtext {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 0px;
  color: #569aff;
  font-family: "Nunito", sans-serif;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  font-size: 16px;
  font-weight: 600;
  color: #569aff;
  font-family: "Poppins", sans-serif;
  text-transform: none;
}

.v-btn {
  font-size: 16px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  text-transform: none;
  display: block;
}
</style>
