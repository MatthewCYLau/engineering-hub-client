import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import AvailabilityForm from "@/views/AvailabilityForm.vue";
import EditProfile from "@/views/EditProfile.vue";
import AvailabilityPage from "@/views/Availability.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
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
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/edit",
    name: "editProfile",
    component: EditProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-availability",
    name: "addAvailability",
    component: AvailabilityForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/availabilities/:id",
    name: "availabilityPage",
    component: AvailabilityPage,
    meta: { requiresAuth: true },
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/availabilities/edit/:id",
    name: "editAvailability",
    component: AvailabilityForm,
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
