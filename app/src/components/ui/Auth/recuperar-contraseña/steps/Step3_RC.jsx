import GoBackButton from "@/components/ui/GoBackButton.jsx";
import * as z from "zod/v4";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Step3_RC({ currentStep, setCurrentStep }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    contraseña: "",
    confirmarContraseña: "",
  });

  const formSchema = z.object({
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
  });

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

  return (
    <div className="form-container h-190 flex flex-col justify-center items-center gap-8">
      {/* <title>Trivo | Registro - Paso 2</title> */}
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Ingresa tu nueva contraseña!</h1>
      </div>
      <div className="form">
        <form id="resetPasswordForm" action="" className="flex flex-col gap-4 justify-center items-center max-w-180 w-180">
          <div className="input flex flex-col gap-2 contraseña">
            <label className="font-medium text-lg" htmlFor="contraseña">
              Contraseña
            </label>
            <input
              className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
              type="password"
              name="contraseña"
              id="contraseña"
              onChange={(e) => validateInput(e.target.name, e.target.value)}
              value={formData.contraseña}
            />
            {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.contraseña.error ? errors.contraseña.message : ""}</span>}
          </div>
          <div className="input flex flex-col gap-2 confirmarContraseña">
            <label className="font-medium text-lg" htmlFor="confirmarContraseña">
              Confirmar Contraseña
            </label>
            <input
              className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
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
      <div className="buttons flex flex-row-reverse justify-between items-center">
        <div className="next-btn relative">
          <button className=" cursor-pointer" onClick={() => handleSubmit(formData)} disabled={!formSchema.safeParse(formData).success || errors.confirmarContraseña.error}>
            <div className="text px-10">
              <span className="main-text font-semibold"></span>
              <span className="secondary-text font-light">Continuar</span>
            </div>
            <div className="arrow">
              <svg className="size-8 fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
              </svg>
            </div>
          </button>
        </div>
        <GoBackButton mainText="" secondaryText="Volver" currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
}
