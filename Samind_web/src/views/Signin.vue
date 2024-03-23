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
          style="
            position: absolute;
            bottom: 0px;
            left: 20px;
            z-index: 0;
            width: 700px;
            height: auto;
          "
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
                  @click="handleLogin()"
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
import axios from "../axios.js";
export default {
  data() {
    return {
      role: "",
      therapistId: "",
      email: "",
      checkEmail: false,
      emailRules: [
        (value) => {
          if (!value) {
            return "You must enter an email address.";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Invalid email address. Please enter a valid email.";
          } else {
            this.checkEmail = true;
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
  methods: {
    handleLogin() {
      console.log(this.email, this.password);
      if (
        this.email === "" ||
        this.password === "" ||
        this.checkEmail === false
      ) {
      } else {
        console.log("Login Account", this.email, this.password);
        let param = {
          email: this.email,
          password: this.password,
        };
        console.log("param", param);
        axios
          .post("/login", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.data.status !== "error") {
              console.log(response.data.user.role);
              localStorage.setItem("id", response.data.user.therapist_id);
              localStorage.setItem("role", response.data.user.role);
              if (response.data.user.role === "therapist") {
                this.$router.push("/dashboard/patient");
                console.log(
                  "Login success",
                  response.data.user.role,
                  localStorage.getItem("id"),
                  localStorage.getItem("role")
                );
              } else if (response.data.user.role === "admin") {
                this.$router.push("/dashboard/managepatient");
                console.log(
                  "Login success",
                  response.data.user.role,
                  localStorage.getItem("id"),
                  localStorage.getItem("role")
                );
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
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
