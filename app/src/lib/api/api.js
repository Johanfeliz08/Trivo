import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5026/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para agregar token (si tienes autenticación)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o de donde lo tengas
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
  (error) => {
    if (error.response) {
      // Puedes manejar errores por código
      if (error.response.status === 401) {
        console.error("No autorizado. Redirigiendo...");
        // redirigir al login si aplica
      }
    } else {
      console.error("Error de red o servidor caído.");
    }
    return Promise.reject(error);
  }
);

export default api;
