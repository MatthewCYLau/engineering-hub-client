<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <form @submit.prevent="submit">
        <h1 class="font-bold text-center text-2xl mb-5">Engineering Hub</h1>

        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div class="px-5 py-7">
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >E-mail</label
            >

            <input
              aria-label="Email address"
              name="email"
              type="email"
              class="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
              placeholder="Email address"
              v-model="email"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >First name</label
            >

            <input
              aria-label="First name"
              name="firstName"
              type="text"
              class="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
              placeholder="First name"
              v-model="firstName"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Last name</label
            >

            <input
              aria-label="Last name"
              name="lastName"
              type="text"
              class="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
              placeholder="Last name"
              v-model="lastName"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Password</label
            >
            <input
              aria-label="Password"
              name="password"
              type="password"
              class="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm w-full"
              placeholder="Password"
              v-model="password"
            />
            <label class="font-semibold text-sm text-gray-600 pb-1 block"
              >Joined Date</label
            >
            <div class="-mt-px mb-4">
              <input
                aria-label="Joined Date"
                name="joinedDate"
                type="date"
                class="appearance-none rounded-lg  relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Joined Date"
                v-model="joinedDate"
              />
            </div>

            <button
              type="submit"
              class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span class="inline-block mr-2">Sign Up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4 inline-block"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="py-5">
          <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap">
              <button
                class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <router-link to="/"
                  ><span class="inline-block ml-1"
                    >Back to home</span
                  ></router-link
                >
              </button>
            </div>
          </div>
        </div>
      </form>
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
