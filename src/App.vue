<template>
  <Nav />
  <Header />

  <main class="form-signin">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useAuth, loadUser } from "./modules/auth";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";

import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: { Nav, Header },
  setup() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const route = useRoute();

    watch([user], () => {
      if (
        loading.value === false &&
        route.meta.requiresAuth === true &&
        user?.value?.id
      ) {
        console.log("redirecting home in app.vue");

        router.push({ name: "home" });
      } else if (loading.value !== false) router.push({ name: "login" });
    });

    return { loading, user };
  },
  mounted() {
    loadUser();
  },
});
</script>
>
