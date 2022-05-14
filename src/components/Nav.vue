<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="user">
          <li class="nav-item">
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
