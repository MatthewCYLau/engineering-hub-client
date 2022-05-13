import axios, { AxiosRequestConfig } from "axios";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth, AUTH_TOKEN } from "./auth";

export const useApiWithAuth = (endpoint: string) => {
  const { user } = useAuth();

  return useApi(endpoint, user?.value ? user.value[AUTH_TOKEN] : undefined);
};

export const useApi = (endpoint: string, access_token?: string) => {
  const router = useRouter();
  const api = axios.create({
    baseURL: "http://localhost:8081/",
    headers: {
      "x-auth-token": access_token ? `Bearer ${access_token}` : "",
    },
  });

  const data = ref();
  const loading = ref(false);
  const error = ref();

  const post = (payload?: Record<string, any>) => {
    loading.value = true;
    error.value = undefined;

    return api
      .post(endpoint, payload)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const get = (config?: AxiosRequestConfig) => {
    loading.value = true;
    error.value = undefined;

    return api
      .get(endpoint, config)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

  // @ts-ignore
  // const del = () => {
  //   loading.value = true;
  //   error.value = undefined;

  //   return api
  //     .delete(endpoint)
  //     .then((res) => (data.value = res.data))
  //     .catch((e) => {
  //       error.value = e;

  //       throw e;
  //     })
  //     .finally(() => (loading.value = false));
  // };

  watch([error], () => {
    // If 401 Unauthorised, force user to buy a new subscription
    if (error.value.response.status === 401 && router) {
      router.push("/login");
    }
  });

  return {
    loading,
    data,
    error,
    get,
    post,
  };
};

// export default api
