<template>
  <div class="testview">
    <div class="testbg">
      <h1 class="testlabel">TEST LIST</h1>
    </div>
    <menu-bar></menu-bar>
  </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue";

export default {
  name: "App",
  components: {
    "menu-bar": MenuBar,
  },
};
</script>

<style>
.testbg {
  position: absolute;
  background: white;
  width: 240vh;
  height: 100vh;
  top: 50px;
  left: 99px;
  z-index: -1;
}
.testlabel {
  color: #000;
  font-family: "Poppins";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.6px;
  position: absolute;
  top: 50px;
  left: 200px;
  z-index: 2;
}
</style>
