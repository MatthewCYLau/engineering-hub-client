<template>
  <router-link :to="'/availabilities/' + id">
    <div class="bg-white p-6 rounded-lg">
      <img
        class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded object-center mb-6"
        :src="require(`@/assets/${theme}.png`)"
        alt="Availability"
      />
      <h3
        class="tracking-widest text-red-500 text-xs font-medium title-font"
      >
        {{ `${firstName} ${lastName}` }}
      </h3>
      <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
        {{ name }}
      </h2>
      <p class="leading-relaxed text-base">
        {{ description }}
      </p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
});
</script>
