"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/CheckBox";
import * as z from "zod/v4";
import { useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/ui/Loader";
import api from "@/lib/api/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const loginAuthSchema = z.object({
    email: z.string().email("El correo no es válido").min(1, "El correo es requerido"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    contraseña: {
      error: false,
      message: "",
    },
    general: {
      error: false,
      message: "",
    },
  });

  const validateInput = (name, value) => {
    const field = loginAuthSchema.pick({ [name]: true });
    const result = field.safeParse({ [name]: value });

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (!result.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: {
          error: true,
          message: result.error.issues[0].message,
        },
        general: { error: false, message: "" },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: {
          error: false,
          message: "",
        },
        general: { error: false, message: "" },
      }));
    }
  };

  const isFormValid = loginAuthSchema.safeParse(formData).success;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const userCredentials = {
        email: formData.email,
        contrasena: formData.contraseña,
      };

      const response = await api.post(`/users/auth`, userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const EXPIRE_TIME = 30 / (24 * 60); // 30 minutes in days
        Cookies.set("tokenAcceso", response.data.tokenAcceso, { path: "/", expires: EXPIRE_TIME });
        Cookies.set("tokenRefresco", response.data.tokenRefresco, { expires: 7 });

        // Decode JWT TOken
        const token = response.data.tokenAcceso;
        const decodedToken = jwtDecode(token);
        Cookies.set("userId", decodedToken.sub, { path: "/", expires: EXPIRE_TIME });
        Cookies.set("email", decodedToken.email, { path: "/", expires: EXPIRE_TIME });
        Cookies.set("nombreUsuario", decodedToken.nombreUsuario, { path: "/", expires: EXPIRE_TIME });
        Cookies.set("roles", decodedToken.roles, { path: "/", expires: EXPIRE_TIME });

        if (decodedToken.roles === "Experto") {
          Cookies.set("expertoId", decodedToken.expertoId, { path: "/", expires: EXPIRE_TIME });
        } else {
          Cookies.set("reclutadorId", decodedToken.reclutadorId, { path: "/", expires: EXPIRE_TIME });
        }

        router.push("/feed");
      } else {
        setErrors({
          email: {
            error: false,
            message: "",
          },
          contraseña: {
            error: false,
            message: "",
          },
          general: {
            error: true,
            message: "El email o contraseña ingresados son incorrectos. Por favor, inténtalo de nuevo.",
          },
        });
      }
    } catch (error) {
      const errorData = error.response.data;
      if (errorData.codigo === "409") {
        setErrors({
          email: {
            error: false,
            message: "",
          },
          contraseña: {
            error: false,
            message: "",
          },
          general: {
            error: true,
            message: "El email o contraseña ingresados son incorrectos. Por favor, inténtalo de nuevo.",
          },
        });
      } else if (errorData.codigo === "404") {
        setErrors({
          email: {
            error: false,
            message: "",
          },
          contraseña: {
            error: false,
            message: "",
          },
          general: {
            error: true,
            message: "El email o contraseña ingresados son incorrectos. Por favor, inténtalo de nuevo.",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Trivo | Inicio de sesión</title>
      {loading && <Loader />}
      <div className="logo p-10 absolute top-0 left-0">
        <a href="#home">
          <Image width={104} height={40} className="h-10 w-26 aspect-video" src="/logos/logotipo_pc.png" alt="LogoTipo Trivo" />
        </a>
      </div>
      <div className="content-container flex flex-col gap-8 w-130 max-w-130">
        <div className="title flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-semibold text-primary">Iniciar sesión</h1>
          <p className="font-regular opacity-60 text-md">
            ¡Bienvenid@ de vuelta! Selecione el metodo con el <br /> que desea iniciar sesion:
          </p>
        </div>
        <div className="auth flex flex-col justify-center items-center">
          <div className="auth-button">
            <button className="flex flex-row justify-center items-center gap-2 bg-white border border-gray-200 rounded-lg px-7 py-1 hover:border-primary hover:cursor-pointer hover:transition-all">
              <div className="icon">
                <svg className="size-8 fill-[#0A66C2]" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16" fill="none">
                  <path d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z" />
                </svg>
              </div>
              <span className="text font-medium text-lg">LinkedIn</span>
            </button>
          </div>
        </div>
        <div className="login-form flex flex-col gap-8">
          <div className="continue-withemail flex flex-row justify-between items-center gap-6">
            <div className="h-[1px] w-[150px] bg-gray-300"></div>
            <span className="text-regular text-md opacity-60">o continua con email</span>
            <div className="h-[1px] w-[150px] bg-gray-300"></div>
          </div>
          <form action="" className="flex flex-col gap-4 justify-center items-center">
            <div className="input flex flex-col gap-2">
              <label className="font-medium text-lg" htmlFor="email">
                Email
              </label>
              <input
                className="w-130 text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary px-2"
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  validateInput(e.target.name, e.target.value);
                }}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.email.error ? errors.email.message : ""}</span>}
            </div>
            <div className="input flex flex-col gap-2">
              <label className="font-medium text-lg" htmlFor="contraseña">
                Contraseña
              </label>
              <input
                className="w-130 text-md h-9 border border-gray-400 rounded-md shadow-sm outline-primary px-2"
                type="password"
                name="contraseña"
                id="contraseña"
                value={formData.contraseña}
                onChange={(e) => {
                  validateInput(e.target.name, e.target.value);
                }}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.contraseña.error ? errors.contraseña.message : ""}</span>}
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.general.error ? errors.general.message : ""}</span>}
            </div>
          </form>
          <div className="form-actions flex flex-row justify-between items-center">
            <div className="rememberme flex flex-row justify-center items-center">
              <Checkbox className={"checked:bg-primary"} id="rememberme" />
              <label htmlFor="rememberme" className="ml-2 opacity-70 font-regular hover:underline hover:cursor-pointer">
                Recuérdame
              </label>
            </div>
            <div className="forgot-password">
              <a href="/auth/recuperar-contrasena" className="font-semibold text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div className="login-btn flex justify-center items-center">
            <button
              type="button"
              className="bg-primary cursor-pointer font-semibold text-md text-white w-130 h-11 rounded-md hover:bg-bg-secondary hover:text-primary border border-white hover:border-primary transition-all hover:transition-all hover:duration-500 duration:500 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="signup flex flex-row justify-center items-center gap-2">
            <span className="text-regular text-md opacity-60">
              ¿Aun no tienes una cuenta? <br />
            </span>
            <a href="/auth/signup" className="font-semibold text-primary hover:underline">
              Regístrate ahora
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
