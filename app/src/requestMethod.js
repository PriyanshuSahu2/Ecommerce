import axios from "axios";

export const BASE_URL = "https://markethub-backend.onrender.com/api";
export const IMAGE_BASE_URL = "https://markethub-backend.onrender.com/images";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.accessToken;
    config.headers["token"] = `Bearer ${TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
