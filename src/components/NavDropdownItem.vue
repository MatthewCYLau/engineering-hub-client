<template>
  <a
    :href="href"
    class="block px-4 py-2 text-sm text-gray-700"
    role="menuitem"
    tabindex="-1"
    :id="id"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    href: {
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
