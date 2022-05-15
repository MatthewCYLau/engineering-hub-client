<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/"
        ><h1 class="text-white text-lg mb-2 font-bold">Home</h1></router-link
      >

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <a href="#" class="nav-link" @click="logoutUser">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth, loadUser } from "../modules/auth";

export default defineComponent({
  setup() {
    const { user, logout } = useAuth();
    const logoutUser = () => logout();
    console.log(user?.value);
    return { user, logoutUser };
  },
  mounted() {
    loadUser();
  },
});
</script>
