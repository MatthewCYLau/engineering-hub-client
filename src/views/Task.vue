<template>
  <Modal
    v-if="isModalVisible"
    :onConfirm="deleteTask"
    :message="'Are you sure you want to delete this task?'"
  />
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
      <div class="flex flex-wrap -m-4" v-if="data">
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="bg-white p-6 rounded-lg">
            <img
              class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded object-center mb-6"
              :src="require(`@/assets/${data.theme}.png`)"
              alt="Task"
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
                v-if="
                  !contributors
                    .map((contributor) => contributor.id)
                    .includes(user.id)
                "
                @click="contributeTask"
                class="text-white px-4 mt-8 w-auto h-10 bg-green-500 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none mr-4"
              >
                <span class="title-font font-medium">Contribute</span>
              </button>
              <router-link :to="'/tasks/edit/' + props.id">
                <button
                  v-if="user.id === data.owner.id"
                  class="text-white px-4 mt-8 w-auto h-10 bg-yellow-500 rounded-full hover:bg-yellow-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none mr-4"
                >
                  <span class="title-font font-medium">Edit</span>
                </button>
              </router-link>
              <button
                v-if="user.id === data.owner.id"
                @click="toggleModal"
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
      <TableComponent
        v-if="data"
        :columns="['Name', 'Email', 'Status', 'Action']"
        :data="contributors"
        :action="removeContributor"
        :currentUserId="currentUserId"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import { useApiWithAuth } from "../modules/api";
import { useModal } from "../modules/modal";
import TableComponent from "../components/Table.vue";
import Modal from "../components/Modal.vue";
import { useAuth, loadUser } from "../modules/auth";

interface ContributeTaskPayload {
  userId: string;
}

export default defineComponent({
  components: { TableComponent, Modal },
  props: ["id"],
  setup(props) {
    const router = useRouter();
    loadUser();
    const { user } = useAuth();
    const { toggleModal, isModalVisible } = useModal();
    const { loading, data, get } = useApiWithAuth(`/api/tasks/${props.id}`);
    const currentUserId = computed(() => user?.value && user.value.id);

    get();

    const contributors = ref();

    watchEffect(
      () => data.value && (contributors.value = data.value.contributors)
    );

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
        contributors.value = [
          ...contributors.value,
          {
            id: user?.value?.id,
            email: user?.value?.email,
            firstName: user?.value?.firstName,
            lastName: user?.value?.lastName,
            status: user?.value?.status,
            avatar: user?.value?.avatar,
          },
        ];
      });
    };

    const removeContributor = () => {
      const { del } = useApiWithAuth(
        `/api/tasks/${props.id}/contributors/${currentUserId.value}`
      );
      del().then(() => {
        contributors.value = contributors.value.filter(
          (contributor: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
          }) => contributor.id !== user?.value?.id
        );
      });
    };
    return {
      user,
      data,
      loading,
      deleteTask,
      contributeTask,
      removeContributor,
      currentUserId,
      contributors,
      props,
      isModalVisible,
      toggleModal,
    };
  },

  onMounted() {
    // loadUser();
  },
});
</script>
