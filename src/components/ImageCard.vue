<template>
  <div
    class="flex flex-col items-center group gap-2 group-hover:border-2 group-hover:border-gray-300 p-1"
    @click="onClick(name)"
    :class="{ 'border-2 border-indigo-500 rounded-md': isSelected }"
  >
    <img
      class="rounded border-2 border-transparent w-20 h-20"
      :src="require(`@/assets/${name}.png`)"
    />
    <p class="text-gray-500 group-hover:text-gray-700 font-semibold">
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
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
