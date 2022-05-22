<template>
  <main>
    <Navigation v-if="shouldRenderNavigation" />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from "vue";
import { useAuth, loadUser } from "./modules/auth";
import { useRoute, useRouter } from "vue-router";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  components: { Navigation },
  setup() {
    const { loading, user } = useAuth();
    const router = useRouter();
    const route = useRoute();

    watch([user], () => {
      if (
        loading.value === false &&
        route.meta.requiresAuth === true &&
        !user?.value
      ) {
        console.log("redirecting home in app.vue");

        router.push({ name: "home" });
      } else if (loading.value !== false) router.push({ name: "login" });
    });

    const shouldRenderNavigation = computed(() => route.meta.requiresAuth);
    return { loading, user, shouldRenderNavigation };
  },
  mounted() {
    loadUser();
  },
});
</script>
>
