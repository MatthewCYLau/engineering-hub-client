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
          <router-link to="/add-task">
            <button
              class="text-white px-4 mt-8 w-auto h-10 bg-indigo-500 rounded-full hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            >
              <svg
                viewBox="0 0 20 20"
                enable-background="new 0 0 20 20"
                class="w-6 h-6 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
              <span class="title-font font-medium">Add task</span>
            </button>
          </router-link>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4" v-for="task in data" :key="task.id">
          <router-link :to="'/tasks/' + task._id">
            <div class="bg-white p-6 rounded-lg">
              <img
                class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6"
                src="https://kuyou.id/content/images/ctc_2020021605150668915.jpg"
                alt="Image Size 720x400"
              />
              <h3
                class="tracking-widest text-indigo-500 text-xs font-medium title-font"
              >
                {{ `${task.owner.firstName} ${task.owner.lastName}` }}
              </h3>
              <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                {{ task.name }}
              </h2>
              <p class="leading-relaxed text-base">
                {{ task.description }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
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
