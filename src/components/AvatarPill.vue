<template>
  <div class="flex items-center">
    <div class="flex-shrink-0 w-10 h-10">
      <img
        class="w-full h-full rounded-full"
        :src="require(`@/assets/${avatar}.png`)"
        alt="avatar"
      />
    </div>
    <div class="ml-3">
      <p class="text-gray-900 whitespace-no-wrap">
        {{ `${firstName} ${lastName}` }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
});
</script>
