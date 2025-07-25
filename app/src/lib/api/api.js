import axios from "axios";
import Cookies from "js-cookie";
import redirectToLogin from "../redirect";
import { isTokenValid } from "../utils";
import { removeCookies } from "../utils";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5026/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const publicPaths = ["/users/auth", "/users", "/recruiters", "/experts", "/users/confirm-account", "/category-interests/pagination", "/interests/by-categories"];
    const requestPath = new URL(config.url, config.baseURL).pathname;
    // console.log("Request Path:", requestPath);

    const isPublicPath = publicPaths.some((path) => requestPath === path);
    // console.log("Is Public Path:", isPublicPath + "." + requestPath);
    // const isPublicPath = publicPaths.some((path) => requestPath === path || requestPath.startsWith(`${path}/`));

    if (!isPublicPath) {
      if (!isTokenValid()) {
        removeCookies();
        redirectToLogin();
        throw new axios.Cancel("Token expirado o inválido");
      }

      const token = Cookies.get("tokenAcceso");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => error
);

export default api;
