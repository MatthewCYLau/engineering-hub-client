<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto max-w-7x1">
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            Users
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4" v-for="user in data" :key="user._id">
          <UserCard
            :id="user.id"
            :firstName="user.firstName"
            :lastName="user.lastName"
            :email="user.email"
            :joinedDate="new Date(user.joinedDate)"
            :location="user.location"
            :bio="user.bio"
            :status="user.status"
            :team="user.team"
            :avatar="user.avatar"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useApiWithAuth } from "../modules/api";
import UserCard from "../components/UserCard.vue";
import { useAuth, loadUser } from "../modules/auth";

export default defineComponent({
  components: { UserCard },
  setup() {
    loadUser();
    const { user } = useAuth();
    const { loading, data, get } = useApiWithAuth("/api/users");

    get();
    return { user, data, loading };
  },
  onMounted() {
    // loadUser();
  },
});
</script>
