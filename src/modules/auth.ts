import { reactive, toRefs, watch } from "vue";
import { useApi } from "./api";

const AUTH_KEY = "token";
export const AUTH_TOKEN = "access_token";

interface User {
  id: string;
  email: string;
  dateOfBirth: Date;
  firstName: string;
  lastName: string;
  [AUTH_TOKEN]: string;
}

interface AuthState {
  loading: boolean;
  user?: User;
  error?: Error;
}

const state = reactive<AuthState>({
  loading: false,
  user: undefined,
  error: undefined,
});

export const loadUser = () => {
  // Read access token from local storage?
  const token = window.localStorage.getItem(AUTH_KEY);
  if (token) {
    const { loading, error, data, get } = useApi("/api/auth");
    state.loading = true;

    get({ headers: { "x-auth-token": token } });

    watch([loading], () => {
      if (error.value) {
        window.localStorage.removeItem(AUTH_KEY);
      } else if (data.value) {
        state.user = data.value;
      }

      state.loading = false;
    });
  }
};

export const useAuth = () => {
  const setUser = (payload: User): void => {
    state.user = payload;
    state.error = undefined;
  };

  const logout = (): Promise<void> => {
    window.localStorage.removeItem(AUTH_KEY);
    return Promise.resolve((state.user = undefined));
  };

  return {
    setUser,
    logout,
    ...toRefs(state),
  };
};
