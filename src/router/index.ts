import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import TaskForm from "@/views/TaskForm.vue";
import TaskPage from "@/views/Task.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Success from "@/views/Success.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: Home, meta: { requiresAuth: false } },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-task",
    name: "addTask",
    component: TaskForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/:id",
    name: "taskPage",
    component: TaskPage,
    meta: { requiresAuth: true },
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/tasks/edit/:id",
    name: "editTask",
    component: TaskForm,
    meta: { requiresAuth: true },
    props: (route) => ({ id: route.params.id }),
  },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  {
    path: "/register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/success",
    name: "success",
    component: Success,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
