<template>
  <v-main>
    <v-row class="px-10 above-images" style="margin-top: 10%">
      <v-col
        class="pl-10"
        cols="12"
        md="6"
        sm="12"
        style="margin-left: 50px; margin-bottom: -90px"
      >
        <div class="title">SaMind</div>
        <div class="subtitle">Website for Psychiatrist</div>

        <v-btn
          color="#3C9BF2"
          rounded="xl"
          size="large"
          min-width="140px"
          to="/signin"
          class="text-capitalize"
          style="margin-top: 60px"
        >
          Sign in
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-none d-md-block">
      <img
        src="../assets/splash/sun.svg"
        style="
          position: absolute;
          top: 35px;
          left: 250px;
          width: 450px;
          z-index: 0;
        "
      />
      <img
        src="../assets/splash/avatar.svg"
        style="
          position: absolute;
          bottom: -60px;
          right: -580px;
          /* width: 1600px; */
          z-index: 1;
        "
      />
      <img
        src="../assets/splash/hospital.png"
        style="
          position: absolute;
          right: 0px;
          bottom: 80px;
          /* width: 550px; */
          z-index: 0;
        "
      />
    </div>
  </v-main>
</template>

<script setup></script>

<style scoped>
.v-main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bed8ff;
  overflow: hidden;
  position: relative;
}

.title {
  font-size: 96px;
  font-weight: 700;
  font-family: "Nunito", sans-serif;
}

.subtitle {
  font-size: 24px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  margin-top: -30px;
}

.v-btn {
  display: flex;
  width: 150px;
  padding: 25px 90px;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */

  border-color: #3c9bf2;
  border-radius: 100px;
  background: #3c9bf2;

  color: var(--color-p-10, #f1f3ff);
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}

.above-images {
  z-index: 1;
}
</style>
