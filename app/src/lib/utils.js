import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isTokenValid() {
  const token = Cookies.get("tokenAcceso");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

export function removeCookies() {
  Cookies.remove("userId");
  Cookies.remove("tokenAcceso");
  Cookies.remove("tokenRefresco");
  Cookies.remove("email");
  Cookies.remove("nombreUsuario");
  if (Cookies.get("roles") === "Experto") {
    Cookies.remove("expertoId");
  } else {
    Cookies.remove("reclutadorId");
  }
  Cookies.remove("roles");
  Cookies.remove("nombre");
  Cookies.remove("apellido");
  Cookies.remove("fotoPerfil");
  Cookies.remove("profesion");
  Cookies.remove("ubicacion");
  Cookies.remove("estado");
  Cookies.remove("habilidad");
  Cookies.remove("interes");
  Cookies.remove("biografia");
}

export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
