<template>
  <Nav />
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto max-w-7x1">
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            Engineering Tasks
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4" v-for="task in data" :key="task.id">
          <div class="bg-white p-6 rounded-lg">
            <img
              class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6"
              src="https://kuyou.id/content/images/ctc_2020021605150668915.jpg"
              alt="Image Size 720x400"
            />
            <h3
              class="tracking-widest text-indigo-500 text-xs font-medium title-font"
            >
              {{ task.owner.email }}
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              {{ task.description }}
            </h2>
            <p class="leading-relaxed text-base">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="flex flex-wrap">
    <div
      v-for="task in data"
      :key="task.id"
      class="plan relative overflow-hidden flex flex-col m-2 bg-cover bg-center justify-between rounded-md bg-gray-700 border border-gray-900 shadow-lg hover:bg-top transition-all duration-200 p-4 w-64"
    >
      <div class="text-white text-lg mb-2 font-bold">
        {{ task.name }}
      </div>
    </div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useApiWithAuth } from "../modules/api";
import Nav from "../components/Nav.vue";
import { useAuth, loadUser } from "../modules/auth";

export default defineComponent({
  components: { Nav },
  setup() {
    loadUser();
    const { user } = useAuth();
    const { loading, data, get } = useApiWithAuth("/api/tasks");

    get();
    const initials = computed(() => user?.value && user.value.email);
    return { user, data, loading, initials };
  },
  onMounted() {
    // loadUser();
  },
});
</script>
