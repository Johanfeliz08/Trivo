import * as z from "zod/v4";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import api from "@/lib/api/api";

export default function Step3_RC({ currentStep, setCurrentStep, userData, setUserData }) {
  const [formData, setFormData] = useState({
    contraseña: "",
    confirmarContraseña: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    contraseña: {
      error: false,
      message: "",
    },
    confirmarContraseña: {
      error: false,
      message: "",
    },
  });

  const formSchema = z.object({
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
  });

  const validateInput = (inputName, value) => {
    const fieldSchema = formSchema.pick({ [inputName]: true });
    const result = fieldSchema.safeParse({ [inputName]: value });

    setFormData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));

    if (!result.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inputName]: {
          error: true,
          message: result.error.issues[0].message,
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [inputName]: {
          error: false,
          message: "",
        },
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(`/users/modify-password?email=${userData.email}`, {
        contrasena: formData.contraseña,
        confirmacionDeContrasena: formData.confirmarContraseña,
      });

      if (response.status === 200) {
        setErrors({
          contraseña: { error: false, message: "" },
          confirmarContraseña: { error: false, message: "" },
        });
        setShowModal(true);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmarContraseña: {
            error: true,
            message: "Ha ocurrido un error al reestablecer la contraseña.",
          },
        }));
      }
    } catch (error) {
      console.error("Ha ocurrido un error al reestablecer la contraseña:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmarContraseña: {
          error: true,
          message: "Ha ocurrido un error al reestablecer la contraseña.",
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container h-190 flex flex-col justify-center items-center gap-8">
      {showModal && <Modal message="Su contraseña ha sido reestablecida satisfactoriamente, por favor inicie sesion." redirectTo="/auth/login" type="success" />}
      {isLoading && <Loader />}
      <title>Trivo | Confirmar contraseña</title>
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Configura tu nueva contraseña!</h1>
      </div>
      <div className="form">
        <form id="resetPasswordForm" action="" className="flex flex-col gap-4 justify-center items-center max-w-220 w-220">
          <div className="input flex flex-col gap-2 contraseña w-1/2">
            <label className="font-medium text-lg" htmlFor="contraseña">
              Contraseña
            </label>
            <input
              className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary px-2"
              type="password"
              name="contraseña"
              id="contraseña"
              onChange={(e) => validateInput(e.target.name, e.target.value)}
              value={formData.contraseña}
            />
            {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.contraseña.error ? errors.contraseña.message : ""}</span>}
          </div>
          <div className="input flex flex-col gap-2 confirmarContraseña w-1/2">
            <label className="font-medium text-lg" htmlFor="confirmarContraseña">
              Confirmar Contraseña
            </label>
            <input
              className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary px-2"
              type="password"
              name="confirmarContraseña"
              id="confirmarContraseña"
              onChange={(e) => {
                if (e.target.value === formData.contraseña) {
                  setFormData((prevData) => ({ ...prevData, confirmarContraseña: e.target.value }));
                  setErrors((prevErrors) => ({ ...prevErrors, confirmarContraseña: { error: false, message: "" } }));
                } else {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmarContraseña: { error: true, message: "Las contraseñas deben coincidir" },
                  }));
                }
              }}
            />
            {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.confirmarContraseña.error ? errors.confirmarContraseña.message : ""}</span>}
          </div>
        </form>
      </div>
      <div className="buttons flex flex-row-reverse justify-center items-center max-w-220 w-220">
        <div className="submit-btn relative w-1/2">
          <button
            className="cursor-pointer w-full flex justify-center items-center bg-primary text-white h-14 rounded-xl shadow-lg border border-transparent hover:bg-bg-secondary hover:text-primary hover:border-primary duration-400 ease-in-out"
            onClick={() => handleSubmit(formData)}
            disabled={!formSchema.safeParse(formData).success || errors.confirmarContraseña.error}
          >
            <div className="text px-10">
              <span className="secondary-text font-light">Cambiar contraseña</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
