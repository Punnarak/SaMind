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
          component: () => import("../views/CreateTest.vue"),
        },
        {
          path: "edittest/:id",
          name: "edittest",
          component: () => import("../views/EditTest.vue"),
          props: true,
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
      ],
    },
  ],
});

export default router;
