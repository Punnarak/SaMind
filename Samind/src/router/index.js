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
          path: "calendar",
          component: () => import("../views/Calendar.vue"),
        },
      ],
    },
  ],
});

export default router;
