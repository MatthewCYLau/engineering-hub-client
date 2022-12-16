<template>
  <section class="text-gray-600 body-font">
    <div class="bg-white p-6 md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div class="text-center">
        <h3 class="md:text-2xl text-base text-gray-900 text-center">
          Success!
        </h3>
        <p class="text-gray-600 my-2">Thank you for contributing to a task.</p>
        <div class="py-10 text-center">
          <router-link to="/dashboard">
            <button
              class="text-white px-4 mt-8 w-auto h-10 bg-red-500 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            >
              <span class="title-font font-medium">Back to Dashboard</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ components: {} });
</script>
