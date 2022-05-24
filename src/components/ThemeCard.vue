<template>
  <div class="flex flex-col items-center group gap-2" @click="onClick(name)">
    <img
      class="rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300"
      src="https://picsum.photos/seed/b/150/150"
    />
    <p class="text-gray-500 group-hover:text-gray-300 font-semibold">
      {{ name }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
});
</script>
