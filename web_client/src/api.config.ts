import axios from "axios";

export const refreshInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/api/v1/",
});

refreshInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("refresh_token")}`;
    return config
  }
)

refreshInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
   const originalRequest = {...error.config};
   originalRequest._isRetry = true; 
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config?._isRetry
    ) {
      try {
        const resp = await instance.get("/api/refresh");
        localStorage.setItem("token", resp.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/api/v1/",
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
   const originalRequest = {...error.config};
   originalRequest._isRetry = true;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config?._isRetry
    ) {
      try {
        const resp = await instance.get("/api/refresh");
        localStorage.setItem("token", resp.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);