import { createRouter, createWebHistory } from "vue-router";
import PatientView from "../views/PatientView.vue";
import FirstView from "../views/FirstView.vue";
import SigninView from "../views/SigninView.vue";
import TestView from "../views/TestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "first",
      component: FirstView,
    },
    {
      path: "/signin",
      name: "signin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SigninView,
    },
    {
      path: "/patient",
      name: "patient",
      component: PatientView,
    },
    {
      path: "/test",
      name: "test",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TestView,
    },
  ],
});

export default router;
