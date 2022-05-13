<template>
  {{ message }}
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useApi } from "../modules/api";

export default {
  name: "Dashboard",
  setup() {
    const message = ref("You are not logged in!");
    const store = useStore();

    onMounted(async () => {
      try {
        // const response = await useApi.get("api/tasks");

        message.value = "foo";
      } catch (e) {
        await store.dispatch("setAuth", false);
      }
    });

    return {
      message,
    };
  },
};
</script>
