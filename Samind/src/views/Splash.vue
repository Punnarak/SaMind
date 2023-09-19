<template>
  <v-main>
    <v-row class="px-10 above-images" style="margin-top: 10%">
      <v-col class="pl-10" cols="12" md="6" sm="12">
        <div class="title">SaMind</div>
        <div class="subtitle">Website for Psychiatrist</div>

        <v-btn
          color="#3C9BF2"
          rounded="xl"
          size="large"
          min-width="140px"
          to="/signin"
          class="text-capitalize"
          style="margin-top: 40px"
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
          top: 30px;
          left: 180px;
          width: 550px;
          z-index: 0;
        "
      />
      <img
        src="../assets/splash/avatar.svg"
        style="
          position: absolute;
          bottom: 0px;
          right: -550px;
          width: 1600px;
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
}

.v-btn {
  font-size: 18px;
  font-weight: 600;
  font-family: "Inter", sans-serif;
}

.above-images {
  z-index: 1;
}
</style>
