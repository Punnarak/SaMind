<template>
  <div>
    <nav class="navbar">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div class="menu-bar">
      <h1 class="logo">SaMind</h1>
      <h1 class="line">-----------------------------------------</h1>
      <ul>
        <li>
          <img
            src="../assets/patientsicon.png"
            alt="Image description"
            class="patienticon"
          /><a href="/patient" class="topic">Patients</a>
        </li>
        <li><a href="/test" class="topic">Test</a></li>
        <li><a href="#" class="topic">Calendar</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
};
</script>

<style scoped>
.logo {
  color: #fff;
  font-family: "Nunito";
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 14.8px;
  padding-top: 5px;
  text-align: center;

  margin-bottom: -10px;
}
.line {
  color: #fff;
  font-family: "Nunito";
  font-size: 15px;

  margin-bottom: 20px;
}
.menu-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--icon, #5686e1);

  width: 262px;
  height: 100vh;
  flex-shrink: 0;

  /* Added styles to position the menu on the left side */
  position: fixed;
  left: 0;
  top: 0;
}

.menu-bar ul {
  list-style: none;
  padding-left: 20px;
}

.menu-bar li {
  margin-bottom: 10px;
}

.menu-bar a {
  width: 99px;
  height: 23px;
  flex-shrink: 0;

  color: var(--color-light-white, #fff);
  font-family: "Nunito";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 160% */
  letter-spacing: 1.5px;
}

/* Styles for Navbar */
.navbar {
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #f0f0f0; /* Set your desired background color */
  padding: 20px; /* Adjust padding as needed height * width*/
  width: calc(100% - 99px);
  position: fixed;
  top: 0;
  left: 99px;

  z-index: -1;
}

.navbar ul {
  list-style: none;
  display: flex;

  margin: 0;
  padding: 0;
  justify-content: right;
}

.navbar li {
  margin-left: 15px; /* Adjust margin as needed */
  display: inline-block;
}

.navbar a {
  text-decoration: none;
  color: #333; /* Set your desired text color */
}

.navbar a:hover {
  color: #555; /* Set your desired hover text color */
}

.menu-bar a:hover {
  width: 244px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(190, 216, 255, 0.37);
}

.patienticon {
  margin-right: 20px;
  position: fixed;
}
.topic {
  margin-left: 40px;
}
</style>
