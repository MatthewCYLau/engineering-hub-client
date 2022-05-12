<template>
  {{ message }}
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { api } from "../modules/api";

export default {
  name: "Home",
  setup() {
    const message = ref("You are not logged in!");
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await api.get("api/tasks");

        console.log(response.data);

        message.value = `Hi ${response.data.currentUser.id}`;

        await store.dispatch("setAuth", true);
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
