<template>
  <div class="h-screen flex">
    <div
      class="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-600 i justify-around items-center"
    >
      <div>
        <h1 class="text-white font-bold text-xl font-sans">Engineering Hub</h1>
        <p class="text-white mt-1">
          Create, read, update, and delete your tasks
        </p>
      </div>
    </div>
    <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
      <div class="flex-1">
        <div>
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign Up!</h1>

          <p class="mt-3 text-gray-500 dark:text-gray-300">
            Sign up to create your account
          </p>
        </div>

        <div class="mt-8">
          <form @submit.prevent="submit">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >Email Address</label
              >
              <div
                class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none w-full"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="hello@example.com"
                  v-model="email"
                />
              </div>
            </div>
            <div>
              <label
                for="firstName"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >First Name</label
              >
              <div
                class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
              >
                <input
                  class="pl-2 outline-none border-none w-full"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Jon"
                  v-model="firstName"
                />
              </div>
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >Last Name</label
              >
              <div
                class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
              >
                <input
                  class="pl-2 outline-none border-none w-full"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Doe"
                  v-model="lastName"
                />
              </div>
            </div>
            <div>
              <label
                for="joinedDate"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >Joined Date</label
              >
              <div
                class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
              >
                <input
                  class="pl-2 outline-none border-none w-full"
                  type="date"
                  name="joinedDate"
                  id="joinedDate"
                  placeholder="01/10/2021"
                  v-model="joinedDate"
                />
              </div>
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-200"
                  >Password</label
                >
              </div>

              <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none w-full"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="block w-full bg-indigo-600 hover:bg-indigo-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p class="mt-6 text-sm text-center text-gray-400">
            Already has an account?
            <router-link to="/login"
              ><span
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Login</span
              ></router-link
            >
          </p>
          <p class="mt-6 text-sm text-center text-gray-400">
            Back to
            <router-link to="/"
              ><span
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Home</span
              ></router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../modules/api";

interface LoginPayload {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  joinedDate?: Date;
}

const transformDateToDdMmYyyy = (joinedDate: Date): string => {
  const dateParts = joinedDate.toString().split("-");
  const dd = dateParts[2];
  const mm = dateParts[1];
  const yyyy = dateParts[0];
  return dd + "/" + mm + "/" + yyyy;
};

export default defineComponent({
  setup() {
    const { loading, data, post } = useApi("api/users");

    const router = useRouter();

    const payload = reactive<LoginPayload>({
      email: undefined,
      password: undefined,
      firstName: undefined,
      lastName: undefined,
      joinedDate: undefined,
    });

    const submit = () => {
      const transformedPayload = {
        ...payload,
        joinedDate:
          payload.joinedDate && transformDateToDdMmYyyy(payload.joinedDate),
      };
      post(transformedPayload).then(() => {
        localStorage.setItem("token", data.value.token);
        router.push({ name: "dashboard" });
      });
    };

    return {
      loading,
      submit,
      ...toRefs(payload),
    };
  },
});
</script>
