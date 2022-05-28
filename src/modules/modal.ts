import { reactive, toRefs } from "vue";

interface ConfirmState {
  isModalVisible: boolean;
}

const state = reactive<ConfirmState>({
  isModalVisible: false,
});

export const useModal = () => {
  const toggleModal = (): void => {
    state.isModalVisible = true;
  };

  const hideModal = (): void => {
    state.isModalVisible = false;
  };

  return {
    toggleModal,
    hideModal,
    ...toRefs(state),
  };
};
