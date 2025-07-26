"use client";

import Image from "next/image";
import * as z from "zod/v4";
import { useState } from "react";
import api from "@/lib/api/api";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";

export default function AdminAuthPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const loginAuthSchema = z.object({
    email: z.string().email("El correo no es válido").min(1, "El correo es requerido"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 2000);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="adminAuthPage">
        <div className="login-container bg-white h-180 w-180 flex flex-col justify-center items-center rounded-2xl shadow-lg relative">
          <div className="logo p-10 absolute top-0 left-0">
            <Image width={104} height={40} className="h-10 w-26 aspect-video" src="/logos/logotipo_pc.png" alt="LogoTipo Trivo" />
          </div>
          <div className="form-container">
            <div className="title">
              <h1 className="text-3xl font-semibold text-center text-primary">Iniciar sesión</h1>
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
          </div>
        </div>
      </div>
    </>
  );
}
