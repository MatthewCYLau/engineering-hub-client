<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto max-w-7x1">
      <div class="flex flex-wrap w-full mb-4 p-4">
        <div class="w-full mb-6 lg:mb-0">
          <h1
            class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900"
          >
            Edit Profile
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
              <div class="flex flex-col mb-6">
                <label for="email" class="font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  v-model="email"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-col mb-6">
                <label for="firstName" class="font-bold">First name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  v-model="firstName"
                  placeholder="First name"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-col mb-6">
                <label for="firstName" class="font-bold">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  v-model="lastName"
                  placeholder="First name"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-col mb-6">
                <label for="name" class="font-bold">Bio</label>
                <textarea
                  type="text"
                  name="bio"
                  id="bio"
                  v-model="bio"
                  placeholder="Bio"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-col mb-6">
                <label for="team" class="font-bold">Team</label>
                <input
                  type="text"
                  name="team"
                  id="team"
                  v-model="team"
                  placeholder="Team"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-col mb-6">
                <label for="location" class="font-bold">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  v-model="location"
                  placeholder="Location"
                  class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div class="flex flex-row flex-wrap gap-5 mt-8 mb-2">
                <ImageCard
                  v-for="(avatar, index) in avatars"
                  :key="index"
                  :name="avatar"
                  :onClick="selectAvatar"
                  :isSelected="avatar === selectedAvatar"
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
import { useRouter } from "vue-router";
import ImageCard from "../components/ImageCard.vue";
import { useApiWithAuth } from "../modules/api";
import { useAuth } from "../modules/auth";

type Status = "Active" | "Busy";

type Avatar = "man" | "woman" | "user";

interface EditProfilePayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: Status;
  bio?: string;
  team?: string;
  location?: string;
  avatar?: Avatar | undefined;
}

export default defineComponent({
  components: { ImageCard },
  setup() {
    const { user } = useAuth();
    const payload = reactive<EditProfilePayload>({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      status: undefined,
      bio: undefined,
      team: undefined,
      location: undefined,
      avatar: undefined,
    });

    const userId = computed(() => user?.value?.id);
    const { get } = useApiWithAuth("/api/users/me");
    const { put } = useApiWithAuth(`/api/users/${userId.value}`);
    const router = useRouter();
    const avatars: Avatar[] = ["man", "woman", "user"];

    get().then((res) => {
      payload.email = res.email;
      payload.firstName = res.firstName;
      payload.lastName = res.lastName;
      payload.status = res.status;
      payload.bio = res.bio;
      payload.team = res.team;
      payload.location = res.location;
      payload.avatar = res.avatar;
    });

    const submit = () => {
      put(payload).then(() => {
        router.push({ name: "dashboard" });
      });
    };
    const selectAvatar = (avatar: Avatar) => {
      payload.avatar = avatar;
    };
    const selectedAvatar = computed(() => payload.avatar);

    return {
      user,
      avatars,
      submit,
      selectAvatar,
      selectedAvatar,
      ...toRefs(payload),
    };
  },
  onMounted() {
    // loadUser();
  },
});
</script>
