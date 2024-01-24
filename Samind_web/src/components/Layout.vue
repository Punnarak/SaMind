<template class="layout">
  <!-- lg screen -->
  <v-navigation-drawer color="#5686E1">
    <v-row>
      <v-col>
        <div class="d-flex justify-center py-4">
          <img src="../assets/logo.svg" />
        </div>
        <v-divider :thickness="2" class="dash"></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-account-multiple"
            title="Patients"
            to="/dashboard/patient"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-clipboard-text-outline"
            title="Test"
            to="/dashboard/test"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-calendar"
            title="Calendar"
            to="/dashboard/calendar"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-account-settings"
            title="Referral"
            to="/dashboard/referral"
          ></v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <template v-slot:append>
      <div class="pa-2">
        <v-divider :thickness="2" class="mx-2"></v-divider>
        <v-list-item
          class="mt-2"
          prepend-icon="mdi-message-text"
          title="Support"
          @click="console.log('Support')"
        ></v-list-item>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- smaller screen -->
  <v-navigation-drawer
    color="#5686E1"
    temporary
    v-model="drawer"
    class="d-lg-none"
  >
    <v-row>
      <v-col>
        <div class="d-flex justify-center py-4">
          <img src="../assets/logo.svg" />
        </div>
        <v-divider :thickness="2" class="dash"></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-account-multiple"
            title="Patients"
            to="/dashboard/patient"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-clipboard-text-outline"
            title="Test"
            to="/dashboard/test"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-calendar"
            title="Calendar"
            to="/dashboard/calendar"
          ></v-list-item>
          <v-list-item
            class="mt-2"
            prepend-icon="mdi-account-settings"
            title="Referral"
            to="/dashboard/referral"
          ></v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <template v-slot:append>
      <div class="pa-2">
        <v-divider :thickness="2" class="mx-2"></v-divider>
        <v-list-item
          class="mt-2"
          prepend-icon="mdi-message-text"
          title="Support"
          @click="console.log('Support')"
        ></v-list-item>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- Navbar -->
  <v-app-bar class="nav">
    <div class="d-lg-none">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon color="">mdi-menu</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <span class="ml-3">John Doe</span>
    <v-icon class="ml-3">mdi-account</v-icon>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="ml-3" icon v-bind="props">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="
            this.$router.push({
              path: `/editaccount`,
            })
          "
        >
          <v-icon>mdi-square-edit-outline</v-icon>
          <span class="pl-2">Edit account</span>
        </v-list-item>
        <v-list-item
          @click="
            this.$router.push({
              path: `/`,
            })
          "
        >
          <v-icon>mdi-logout-variant</v-icon>
          <span class="pl-2">Sign out</span>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(null);
</script>

<script>
import Account from "../assets/accountminus.svg";

export default {
  components: {
    Account,
  },
  // Other component options...
};
</script>
<style scoped>
.layout,
.nav {
  z-index: 998;
}

.dash {
  opacity: 0.5;
  stroke: white;
  border-style: dashed;
}

:deep(.v-list-item--nav .v-list-item-title) {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-family: "Nunito", sans-serif;
}

:deep(.v-list-item-title) {
  font-family: "Nunito", sans-serif;
  letter-spacing: 1.5px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-family: "Nunito", sans-serif;
}
</style>
