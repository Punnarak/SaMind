<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" class="text-center">
        <h1 class="display-2 font-weight-bold mb-4">Support</h1>
        <p class="subtitle-1">
          หากพบปัญหา ระบบขัดข้อง ทำงานผิดพลาด หรือมีข้อสงสัยใด ๆ ติดต่อ IT
          Support ได้ที่ช่องทางต่อไปนี้
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-4">
      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-4" elevation="2">
          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#569AFF">mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >เบอร์โทรศัพท์:</v-list-item-title
                >
                <v-list-item-subtitle>0890999999</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#569AFF">mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Email:</v-list-item-title
                >
                <v-list-item-subtitle
                  >SaMind@Company.co.th</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#569AFF">mdi-facebook</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Facebook:</v-list-item-title
                >
                <v-list-item-subtitle>SaMindCompany</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#569AFF">mdi-chat</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Line:</v-list-item-title
                >
                <v-list-item-subtitle>@SaMindCompany</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-btn
          color="#569AFF"
          block
          onclick="window.open('https://forms.gle/dYVRH93Z2Se6xoHb6', '_blank')"
          >ติดต่อผ่านแบบฟอร์ม</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  created() {
    axios
      .post("/refreshToken", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("refresh Token", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
<style scoped>
:deep(.v-pagination__list) {
  justify-content: end;
}

.custom-placeholder ::placeholder {
  font-size: 11.6px;
}
.create-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: larger;
}

.title {
  font-weight: 500;
}
.text {
  font-family: "Poppins", sans-serif;
}
/* WebKit */
.scroll::-webkit-scrollbar {
  width: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #3c9bf2;
  border-radius: 4px;
}

:deep(.v-pagination__list) {
  justify-content: end;
}
.popupcreateheader {
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.popupheader {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 452px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin: 0px auto;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.createwith {
  height: 280px;
  border: 2px solid #3c9bf2;
}

.dropdown-list {
  position: fixed;
  z-index: 9999;
}

.delete {
  /* height: 150px; */
  height: auto;
}

.create {
  width: 750px;
  height: 450px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button-duplicate {
  float: center;
}
.modal-default-button {
  float: right;
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
