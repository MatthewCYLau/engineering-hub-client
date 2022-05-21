<template>
  <main>
    <Nav v-if="shouldRenderNav" />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useAuth, loadUser } from "./modules/auth";
import { useRoute, useRouter } from "vue-router";
import Nav from "./components/Nav.vue";

export default defineComponent({
  components: { Nav },
  setup() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const route = useRoute();

    watch([user], () => {
      console.log(route.meta);
      if (
        loading.value === false &&
        route.meta.requiresAuth === true &&
        !user?.value
      ) {
        console.log("redirecting home in app.vue");

        router.push({ name: "home" });
      } else if (loading.value !== false) router.push({ name: "login" });
    });

    console.log(route.meta);
    const shouldRenderNav = route.meta.requiresAuth;

    return { loading, user, shouldRenderNav };
  },
  mounted() {
    loadUser();
  },
});
</script>
>
