<template>
  <div id="app">
    <img
      src="../assets/hospital.png"
      alt="Image description"
      class="hospital"
    />
    <img src="../assets/avatar.png" alt="Image description" class="avatar" />
    <img src="../assets/sun.png" alt="Image description" class="sun" />
    <div class="contain1">
      <h1 class="label1">SaMind</h1>
      <h2 class="label2">Website for Psychiatrist</h2>
      <button class="sign-in-button" @click="this.$router.push('/signin')">
        Sign In
      </button>
    </div>
  </div>
</template>

<style>
html,
body {
  background-color: #bed8ff; /* สีพื้นหลังสีฟ้า */
  overflow: hidden;
  width: 1440px;
  height: 850px;
}
.avatar {
  display: flex;
  position: absolute;
  width: 1350px;
  /* height: 503px; */
  flex-shrink: 0;

  margin-left: 7.5%;
  margin-top: 9.2%;
  z-index: 1;
}
.hospital {
  display: flex;
  position: absolute;
  width: 712px;
  height: 578px;
  flex-shrink: 0;

  margin-top: -2%;
  margin-left: 12.5%;
  z-index: -1;
}
.sun {
  display: flex;
  position: absolute;
  height: 65vh;
  /* width: 60vh; */
  margin-left: -27%;
  margin-top: -5.2%;
  z-index: -1;
}
.contain1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 70vh;
  margin-left: -180%;
}
.label1 {
  color: #231e1f;
  font-family: "Nunito";
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: 84px;
  letter-spacing: 3.84px;

  margin-bottom: 0px;
}
.label2 {
  color: #1c1c1c;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 100% */
  letter-spacing: 0.96px;

  margin-bottom: 60px;
}
.sign-in-button {
  display: flex;
  width: 150px;
  padding: 10px 10px;
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
</style>
