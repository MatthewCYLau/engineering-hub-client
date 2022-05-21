<template>
  <Navigation />
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
              class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
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
            <div>
              <button
                @click="contributeTask"
                class="text-white px-4 mt-8 w-auto h-10 bg-green-500 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none mr-4"
              >
                <span class="title-font font-medium">Contribute</span>
              </button>
              <button
                @click="deleteTask"
                class="text-white px-4 mt-8 w-auto h-10 bg-red-500 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              >
                <span class="title-font font-medium">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            Contributors
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <TableComponent />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useApiWithAuth } from "../modules/api";
import Navigation from "../components/Navigation.vue";
import TableComponent from "../components/Table.vue";
import { useAuth, loadUser } from "../modules/auth";

interface ContributeTaskPayload {
  userId: string;
}

export default defineComponent({
  components: { Navigation, TableComponent },
  props: ["id"],
  setup(props) {
    const router = useRouter();
    loadUser();
    const { user } = useAuth();
    const { loading, data, get } = useApiWithAuth(`/api/tasks/${props.id}`);
    get();

    const deleteTask = () => {
      const { del } = useApiWithAuth(`/api/tasks/${props.id}`);
      del().then(() => {
        router.push({ name: "dashboard" });
      });
    };

    const contributeTask = () => {
      const { post } = useApiWithAuth(`/api/tasks/${props.id}/contributors`);
      const paylod: ContributeTaskPayload = {
        userId: user?.value?.id || "",
      };
      post(paylod).then(() => {
        router.push({ name: "dashboard" });
      });
    };
    return { user, data, loading, deleteTask, contributeTask };
  },

  onMounted() {
    // loadUser();
  },
});
</script>
