import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5026/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para agregar token (si tienes autenticación)
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("tokenAcceso"); // o de donde lo tengas
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
