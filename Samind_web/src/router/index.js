import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/Splash.vue"),
    },
    {
      path: "/signin",
      component: () => import("../views/Signin.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../components/Layout.vue"),
      children: [
        {
          path: "patient",
          component: () => import("../views/Patient.vue"),
        },
        {
          path: "test",
          component: () => import("../views/Test.vue"),
        },
        {
          path: "createtest",
          name: "createtest",
          component: () => import("../views/CreateTest.vue"),
        },
        {
          path: "edittest",
          name: "edittest",
          component: () => import("../views/EditTest.vue"),
        },

        {
          path: "calendar",
          component: () => import("../views/Calendar.vue"),
        },
        {
          path: "booking",
          component: () => import("../views/Booking.vue"),
          props: true,
        },
        {
          path: "patientdashboard",
          component: () => import("../views/PatientDashboard.vue"),
          props: true,
        },
        {
          path: "patienttesthistory",
          component: () => import("../views/TestHistory.vue"),
          props: true,
        },
        {
          path: "referral",
          component: () => import("../views/Referral.vue"),
          props: true,
        },
      ],
    },
  ],
});

export default router;
