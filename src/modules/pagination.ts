import { reactive, toRefs } from "vue";

interface PaginationState {
  itemsCount: number;
}

const state = reactive<PaginationState>({
  itemsCount: 0,
});

export const usePagination = () => {
  const setItemsCount = (count: number): void => {
    state.itemsCount = count;
  };

  return {
    setItemsCount,
    ...toRefs(state),
  };
};
