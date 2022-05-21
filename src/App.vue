<template>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useAuth, loadUser } from "./modules/auth";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {  },
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

    return { loading, user };
  },
  mounted() {
    loadUser();
  },
});
</script>
>
