import axios from "../axios.js";
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
          path: "managelibrary",
          component: () => import("../views/ManageLibrary.vue"),
        },
        {
          path: "managepatient",
          component: () => import("../views/ManagePatient.vue"),
        },
        {
          path: "patient",
          component: () => import("../views/Patient.vue"),
        },
        {
          path: "managetherapist",
          component: () => import("../views/ManageTherapist.vue"),
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
          path: "testresult",
          name: "testresult",
          component: () => import("../views/TestResult.vue"),
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
        {
          path: "/editaccount",
          component: () => import("../views/EditAccount.vue"),
          props: true,
        },
        {
          path: "/support",
          component: () => import("../views/Support.vue"),
          props: true,
        },
      ],
      meta: { authRequired: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    const res = await axios.post("/refreshToken");
    const isSignedIn = res.status == 200;
    if (to.meta.authRequired && !isSignedIn) {
      return next("/signin");
    }
    if (isSignedIn) {
      if (to.path == "/" || to.path == "/signin") {
        return next("/dashboard/managepatient");
      }
    }
  } catch (err) {
    if (to.path == "/signin" || to.path == "/") return next();
    return next("/signin");
  }
  return next();
});

export default router;
