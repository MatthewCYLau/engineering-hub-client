<template>
  <div
    class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-95"
  >
    <div class="bg-white rounded-lg w-1/2">
      <div class="flex flex-col items-start p-4">
        <div class="flex items-center w-full">
          <div class="text-gray-900 font-medium text-lg">Confirmation</div>
          <svg
            class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
        </div>
        <hr />
        <div class="">
          {{ message }}
        </div>
        <hr />
        <div class="ml-auto">
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="handleConfirm"
          >
            Confirm
          </button>
          <button
            class="bg-transparent hover:bg-gray-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ml-2"
            @click="handleCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useModal } from "../modules/modal";

export default defineComponent({
  props: {
    onConfirm: {
      type: Function,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { hideModal } = useModal();

    const handleConfirm = (): void => {
      hideModal();
      props["onConfirm"]();
    };

    const handleCancel = (): void => {
      hideModal();
    };
    return { handleCancel, handleConfirm };
  },
});
</script>
