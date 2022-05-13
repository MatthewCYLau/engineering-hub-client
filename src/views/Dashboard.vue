<template>
  <div><h1 class="p-2 mt-4 font-bold text-xl">Tasks</h1></div>
  <div class="flex flex-wrap">
    <div
      v-for="task in data"
      :key="task.id"
      class="plan relative overflow-hidden flex flex-col m-2 bg-cover bg-center justify-between rounded-md bg-gray-700 border border-gray-900 shadow-lg hover:bg-top transition-all duration-200 p-4 w-64"
    >
      <div class="text-white text-lg mb-2 font-bold">
        {{ task.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useApiWithAuth } from "../modules/api";

export default {
  name: "Dashboard",
  setup() {
    const email = ref("You are not logged in!");
    const { loading, data, get } = useApiWithAuth("/api/tasks");

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
