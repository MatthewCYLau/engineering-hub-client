<template>
  <Nav />
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto max-w-7x1">
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            Task
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="bg-white p-6 rounded-lg">
            <img
              class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6"
              src="https://kuyou.id/content/images/ctc_2020021605150668915.jpg"
              alt="Image Size 720x400"
            />
            <h3
              class="tracking-widest text-indigo-500 text-xs font-medium title-font"
            >
              {{ `${data.owner.firstName} ${data.owner.lastName}` }}
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
              {{ data.name }}
            </h2>
            <p class="leading-relaxed text-base">
              {{ data.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useApiWithAuth } from "../modules/api";
import Nav from "../components/Nav.vue";
import { useAuth, loadUser } from "../modules/auth";

export default defineComponent({
  components: { Nav },
  props: ["id"],
  setup(props) {
    loadUser();
    const { user } = useAuth();
    const { loading, data, get } = useApiWithAuth(`/api/tasks/${props.id}`);

    get();
    return { user, data, loading };
  },
  onMounted() {
    // loadUser();
  },
});
</script>