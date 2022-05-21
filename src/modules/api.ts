import axios, { AxiosRequestConfig } from "axios";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useApiWithAuth = (endpoint: string) => {
  const token = localStorage.getItem("token") || "";
  return useApi(endpoint, token);
};

export const useApi = (endpoint: string, accessToken?: string) => {
  const router = useRouter();
  const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:8081/",
    headers: {
      "x-auth-token": accessToken ? accessToken : "",
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

  const del = () => {
    loading.value = true;
    error.value = undefined;

    return api
      .delete(endpoint)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;

        throw e;
      })
      .finally(() => (loading.value = false));
  };

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
    del,
  };
};

// export default api
