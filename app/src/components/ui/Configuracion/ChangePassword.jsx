import { useState } from "react";
import * as zod from "zod";

export default function ChangePassword() {
  const formSchema = zod.object({
    currentPassword: zod.string().min(6).max(100),
    newPassword: zod.string().min(6).max(100),
    confirmNewPassword: zod.string().min(6).max(100),
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: {
      error: false,
      message: "La contraseña actual es incorrecta.",
    },
    newPassword: {
      error: false,
      message: "La nueva contraseña debe tener al menos 6 caracteres.",
    },
    confirmNewPassword: {
      error: false,
      message: "Las contraseñas no coinciden.",
    },
  });

  return (
    <div className="change-password-container w-full h-full xl:p-10 z-5">
      <div className="title">
        <h2 className="text-2xl font-semibold text-primary">Cambiar Contraseña</h2>
      </div>
      <div className="content">
        <p className="text-gray-600 mt-4">Aquí puedes cambiar tu contraseña. Asegúrate de que sea segura y fácil de recordar.</p>
        <form className="mt-6 flex flex-col gap-4">
          <div className="mb-4">
            <label htmlFor="currentPassword" className="text-sm font-medium flex flex-col gap-2">
              Contraseña Actual
              <input
                type="password"
                id="currentPassword"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-primary focus:ring-primary focus:outline-primary"
                required
                onChange={(e) => {
                  setFormData({ ...formData, currentPassword: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-sm font-medium flex flex-col gap-2">
              Nueva Contraseña
              <input
                type="password"
                id="newPassword"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-primary focus:ring-primary focus:outline-primary"
                required
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="text-sm font-medium flex flex-col gap-2">
              Confirmar Nueva Contraseña
              <input
                type="password"
                id="confirmNewPassword"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-primary focus:ring-primary focus:outline-primary"
                required
                onChange={(e) => {
                  setFormData({ ...formData, confirmNewPassword: e.target.value });
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 border border-primary bg-bg-secondary text-primary hover:bg-primary hover:text-white shadow-md rounded-md transition-all duration-400 ease-linear cursor-pointer"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
