<template>
  <v-col class="px-10">
    <!-- Header and buttons -->
    <v-row align="center">
      <v-col
        cols="6"
        style="font-weight: 600; font-size: 20px"
        class="mt-5 mb-5"
      >
        Edit Profile
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-card
      rounded="xl"
      style="height: auto; width: auto; display: flex"
      align="center"
    >
      <!-- Container for the blue background on the left side -->
      <div
        style="
          background-color: rgba(190, 216, 255, 1);
          height: 100%;
          width: auto;
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
        "
      >
        <img
          src="../assets/EditAccount/gdoctor.png"
          style="width: 250px; margin-top: 150px"
        />
        <img
          src="../assets/EditAccount/bdoctor.png"
          style="
            width: 200px;
            margin-top: 150px;
            margin-left: -100px;
            z-index: 1;
            position: relative;
          "
        />
      </div>

      <!-- Container for the form on the right side -->
      <v-col align="center" style="align-self: center; padding: 50px">
        <v-row>
          <v-col col="6" align="left">
            <label style="font-weight: bold">First Name</label>
            <label style="color: red">*</label>
            <v-text-field
              class="mt-2 mb-4"
              variant="outlined"
              rounded="lg"
              v-model="firstName"
              :rules="firstNameRules"
              style="width: 300px; border-radius: 10px"
            ></v-text-field>
          </v-col>
          <v-col col="12" align="left">
            <label style="font-weight: bold">Last Name</label>
            <label style="color: red">*</label>
            <v-text-field
              class="mt-2 mb-4"
              variant="outlined"
              rounded="lg"
              v-model="lastName"
              :rules="lastNameRules"
              style="width: 300px; border-radius: 10px"
            ></v-text-field>
          </v-col>
          <v-col col="12" align="left">
            <label style="font-weight: bold">New Password</label>
            <v-text-field
              class="mt-2 mb-4"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              rounded="lg"
              v-model="newPassword"
              style="width: 660px; border-radius: 10px"
            >
            </v-text-field>
          </v-col>
          <!-- <v-col col="12" align="left">
            <label style="font-weight: bold">New Password</label>
            <v-text-field
              class="mt-2 mb-4"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              rounded="lg"
              v-model="newPassword"
              ref="passwordField"
              style="width: 660px; border-radius: 10px"
            >
              <v-icon
                style="
                  position: absolute;
                  top: 16px;
                  right: 10px;
                  cursor: pointer;
                "
                @click="togglePasswordVisibility"
              >
                {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
            </v-text-field>
          </v-col> -->

          <v-col col="12" align="left">
            <v-btn
              rounded="xl"
              class="save text-none"
              size="x-large"
              variant="flat"
              @click="savePopup = true"
            >
              Save
            </v-btn>
            <Transition name="save-modal">
              <div v-if="savePopup" class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-container">
                    <div class="modal-header" align="end">
                      <slot class="popupheader" name="header"
                        ><label
                          @click="savePopup = false"
                          style="
                            width: 12px;
                            height: 15.724px;
                            flex-shrink: 0;
                            cursor: pointer;
                            font-weight: 500;
                          "
                          >X</label
                        ></slot
                      >
                    </div>
                    <div
                      class="modal-body"
                      align="center"
                      style="margin-top: 6px"
                    >
                      <slot name="body">
                        <img
                          src="../assets/EditAccount/savecomplete.png"
                          style="width: 150px; margin-left: -10px"
                        />
                      </slot>
                    </div>
                    <div
                      class="modal-footer"
                      align="center"
                      style="margin-top: -50px"
                    >
                      <slot name="footer">
                        <label
                          style="
                            color: #000;
                            font-family: Inter;
                            font-size: 20px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            letter-spacing: 0.2px;
                          "
                        >
                          Changes saved successfully!</label
                        ></slot
                      >
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      newPassword: "",
      savePopup: false,
      firstNameRules: [
        (value) => {
          if (value) return true;
          return "You must enter a First Name.";
        },
      ],
      lastNameRules: [
        (value) => {
          if (value) return true;
          return "You must enter a Last Name.";
        },
      ],
      showPassword: false,
    };
  },
  created() {},
  computed: {},
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      // Set the cursor at the end of the input field
      this.$refs.passwordField.focus();
      const length = this.newPassword.length;
      this.$refs.passwordField.setSelectionRange(length, length);
    },
  },
};
</script>

<style scoped>
.text {
  font-family: "Poppins", sans-serif;
}
.save {
  width: 230px;
  border-radius: 15px;
  background: #569aff;
  color: white;
  /* width: 141px;
  height: 54px; */
  flex-shrink: 0;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 410px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin: 0px auto;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
