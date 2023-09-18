<template>
  <div id="app" class="whitebg">
    <div class="contain2">
      <h1 class="label3">SaMind</h1>
      <h1 class="label4">Sign in</h1>
      <div class="inputlayout">
        <h1 class="labelin">Email</h1>
        <input type="text" class="input" />
        <h1 class="labelin">Password</h1>
        <input type="text" class="input" />
      </div>
      <button class="sign-in-button2" @click="this.$router.push('/patient')">
        Sign In
      </button>
    </div>
    <img src="../assets/avatar2.png" alt="Image description" class="avatar2" />
  </div>
</template>

<style>
html,
body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bed8ff;
  overflow: hidden;
  width: 100vw;
  /* Use viewport units for width */
  height: 100vh;
  /* Use viewport units for height */
  margin: 0;
  /* Remove default margin */
  z-index: -1;
}
.avatar2 {
  display: flex;
  position: absolute;
  width: 755px;
  flex-shrink: 0;

  margin-left: -27%;
  margin-top: 0.8%;
  z-index: -1;
}
.contain2 {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 630px;
  height: 516px;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  /* margin-bottom: 100px; */
  position: relative;
}
.label3 {
  width: 629px;

  color: #569aff;
  text-align: center;
  font-family: "Nunito";
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 2.2px;
  margin-bottom: -10px;
}
.label4 {
  width: 629px;

  color: #000;
  text-align: center;
  font-family: "Nunito";
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 30px;
}
.labelinlayout {
  display: flex;
  justify-content: flex-start;
}
.labelin {
  width: 152.88px;
  height: 14.237px;
  flex-shrink: 0;

  color: #569aff;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 87.5% */

  margin-bottom: 20px;
}
.input {
  width: 439px;
  height: 54px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid #569aff;

  margin-bottom: 40px;
}
.sign-in-button2 {
  display: flex;
  width: 439px;
  height: 54px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */

  border-radius: 10px;
  border: 1px solid rgba(86, 154, 255, 0.52);
  background: #569aff;

  color: var(--color-p-10, #f1f3ff);
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}
</style>
