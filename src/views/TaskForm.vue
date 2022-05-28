<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto max-w-7x1">
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            {{ pageHeader }}
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="lg:w-1/2 sm:w-full sm:px-6 lg:px-8">
          <div class="mt-8">
            <form
              @submit.prevent="submit"
              class="p-6 flex flex-col justify-center"
            >
              <div class="flex flex-col">
                <label for="name" class="hidden">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  v-model="name"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div class="flex flex-col mt-2">
                <label for="description" class="hidden">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  v-model="description"
                  placeholder="Description"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-row flex-wrap gap-5 mt-8 mb-2">
                <ImageCard
                  v-for="(theme, index) in themes"
                  :key="index"
                  :name="theme"
                  :onClick="selecTheme"
                  :isSelected="theme === selectedTheme"
                />
              </div>
              <button
                type="submit"
                class="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import ImageCard from "../components/ImageCard.vue";
import { useApiWithAuth } from "../modules/api";
import { useAuth } from "../modules/auth";

interface CreateTaskPayload {
  name?: string;
  description?: string;
  theme?: string;
}

export default defineComponent({
  components: { ImageCard },
  props: ["id"],
  setup(props) {
    // loadUser();
    const { user } = useAuth();
    const { loading, data, post } = useApiWithAuth("/api/tasks");
    const { put } = useApiWithAuth(`/api/tasks/${props.id}`);

    const router = useRouter();

    const payload = reactive<CreateTaskPayload>({
      name: undefined,
      description: undefined,
      theme: "Engineering",
    });

    const themes: string[] = ["Engineering", "Writing", "Reading"];

    const route = useRoute();
    const path = computed(() => route.path);
    const isEditMode = path.value.includes("edit");

    if (isEditMode) {
      const { get } = useApiWithAuth(`/api/tasks/${props.id}`);
      get().then((res) => {
        payload.name = res.name;
        payload.description = res.description;
        payload.theme = res.theme;
      });
    }

    const submit = () => {
      if (isEditMode) {
        put(payload).then(() => {
          router.push({ name: "dashboard" });
        });
      } else {
        post(payload).then(() => {
          router.push({ name: "dashboard" });
        });
      }
    };
    const selecTheme = (theme: string) => {
      payload.theme = theme;
    };

    const selectedTheme = computed(() => payload.theme);
    const pageHeader = isEditMode ? "Edit Task" : "Add Task";

    return {
      user,
      data,
      loading,
      submit,
      themes,
      selecTheme,
      selectedTheme,
      isEditMode,
      pageHeader,
      ...toRefs(payload),
    };
  },
  onMounted() {
    // loadUser();
  },
});
</script>
