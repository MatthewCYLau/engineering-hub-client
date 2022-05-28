<template>
  <div class="flex flex-col">
    <label for="select" class="font-semibold block py-2">Select Input:</label>

    <div class="relative">
      <div
        class="h-10 bg-white flex border border-gray-200 rounded items-center"
      >
        <input
          :value="selectedOption"
          name="select"
          id="select"
          class="px-4 appearance-none outline-none text-gray-800 w-full"
          readonly
        />
        <label
          for="show_more"
          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
          @click="showDropdown = !showDropdown"
        >
          <svg
            class="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </label>
      </div>
      <div
        class="absolute rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200"
        v-if="showDropdown"
      >
        <div
          class="cursor-pointer group"
          v-for="option in options"
          :key="option"
          @click="
            onClick(option);
            showDropdown = !showDropdown;
          "
        >
          <a
            class="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
            :class="{ 'border-blue-600 ': selectedOption === option }"
            >{{ option }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
    selectedOption: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
});
</script>
