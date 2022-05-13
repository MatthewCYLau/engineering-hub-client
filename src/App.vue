<template>
  <Nav />
  <Header />

  <main class="form-signin">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useAuth } from "./modules/auth";
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";

import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: { Nav, Header },
  setup() {
    const { authenticating, user } = useAuth();
    const router = useRouter();
    const route = useRoute();

    watch([user], () => {
      if (
        authenticating.value === false &&
        route.meta.requiresAuth === true &&
        user?.value
      ) {
        console.log("redirecting home in app.vue");

        router.push({ name: "home" });
      } else if (authenticating.value !== false) router.push({ name: "login" });
    });

    return { authenticating, user };
  },
});
</script>
>
