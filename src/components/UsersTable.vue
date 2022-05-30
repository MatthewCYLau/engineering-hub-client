<template>
  <div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                v-for="(column, index) in columns"
                :key="index"
              >
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="datum in data" :key="datum.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <AvatarPill
                  :avatar="datum.avatar"
                  :firstName="datum.firstName"
                  :lastName="datum.lastName"
                />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ datum.email }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0 opacity-50 rounded-full"
                    :class="{
                      'bg-green-200': datum.status === 'Active',
                      'bg-red-200': datum.status === 'Busy',
                    }"
                  ></span>
                  <span class="relative">{{ datum.status }}</span>
                </span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <svg
                  @click="action"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  v-if="currentUserId === datum.id"
                >
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M8 9h8v10H8z" opacity=".3"></path>
                  <path
                    d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
                  ></path>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AvatarPill from "../components/AvatarPill.vue";

export default defineComponent({
  components: { AvatarPill },
  props: {
    columns: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    currentUserId: {
      type: String,
      required: true,
    },
  },
});
</script>
