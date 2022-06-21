<template>
  <div class="flex justify-center">
    <div class="bg-gray-100 p-4 rounded-xl my-4 shadow-md w-50">
      <h3 class="font-semibold text-lg mb-1">{{ header }}</h3>
      <p class="leading-tight text-justify">{{ body }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    header: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
});
</script>
