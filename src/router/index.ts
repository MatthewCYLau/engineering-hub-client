import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import AddTask from "@/views/AddTask.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: Home, meta: { requiresAuth: false } },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-task",
    name: "addTask",
    component: AddTask,
    meta: { requiresAuth: true },
  },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  {
    path: "/register",
    component: Register,
    meta: {
      requiresAuth: {
        path: "/login",
        component: Login,
        meta: { requiresAuth: false },
      },
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
