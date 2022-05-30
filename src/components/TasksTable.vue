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
            <tr
              v-for="datum in data"
              :key="datum._id"
              @click="redirect(datum._id)"
              class="cursor-pointer"
            >
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ datum.name }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ datum.description }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <template
                  v-for="contributor in datum.contributors"
                  :key="contributor.id"
                >
                  <AvatarPill
                    :avatar="contributor.avatar"
                    :firstName="contributor.firstName"
                    :lastName="contributor.lastName"
                    class="mb-2"
                  />
                </template>
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
import { useRouter } from "vue-router";
import AvatarPill from "../components/AvatarPill.vue";

export default defineComponent({
  components: { AvatarPill },
  setup() {
    const router = useRouter();
    const redirect = (taskId: string) =>
      router.push({ path: `/tasks/${taskId}` });
    return { redirect };
  },
  props: {
    columns: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
});
</script>
