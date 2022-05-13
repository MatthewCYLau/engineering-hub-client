<template>
  {{ data.currentUser.email }}
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useApi, useApiWithAuth } from "../modules/api";

export default {
  name: "Dashboard",
  setup() {
    const email = ref("You are not logged in!");
    const { loading, data, get } = useApiWithAuth("/api/auth");

    get();
    const store = useStore();

    onMounted(async () => {
      try {
        // const response = await useApi.get("api/tasks");

        email.value = "foo";
      } catch (e) {
        await store.dispatch("setAuth", false);
      }
    });

    return { email, data, loading };
  },
};
</script>
