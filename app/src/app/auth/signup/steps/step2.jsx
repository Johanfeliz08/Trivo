import NextButton from "@/components/ui/next-button.jsx";
import GoBackButton from "@/components/ui/goback-button.jsx";
import * as z from "zod/v4";
import { useState } from "react";

export default function Step2({ currentStep, setCurrentStep, userData, setUserData }) {
  // Update the current step to 2 if it's not already set
  if (currentStep !== 2) {
    setCurrentStep(2);
  }

  if (userData.role === "") {
    setCurrentStep(1); // If the role is not selected, redirect to step 1
    return null; // Prevent rendering this step if role is not selected
  }

  // Handle form data
  const [formData, setFormData] = useState({ ...userData, nombreEmpresa: "" });
  const [errors, setErrors] = useState({
    nombreEmpresa: {
      error: false,
      message: "",
    },
    nombre: {
      error: false,
      message: "",
    },
    apellido: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    ubicacion: {
      error: false,
      message: "",
    },
    contraseña: {
      error: false,
      message: "",
    },
    confirmarcontraseña: {
      error: false,
      message: "",
    },
    biografia: {
      error: false,
      message: "",
    },
  });

  // Define the schema for the form validation
  const formSchema = z.object({
    nombreEmpresa: z.string().min(5, "El nombre de la empresa debe tener al menos 5 caracteres").max(100, "El nombre de la empresa no puede exceder los 100 caracteres"),
    nombre: z.string().min(3, "Su nombre debe tener al menos 3 caracteres"),
    apellido: z.string().min(3, "Su apellido debe tener al menos 3 caracteres"),
    email: z.string().email("El email es inválido"),
    ubicacion: z.string().min(1, "La ubicación es requerida"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarcontraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
  });

  const validateInput = (inputName, value) => {
    const fieldSchema = formSchema.pick({ [inputName]: true });
    const result = fieldSchema.safeParse({ [inputName]: value });

    setFormData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));

    if (!result.success) {
      console.log(result.error.issues[0].message);
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

  const handleSubmit = (formData) => {
    const result = formSchema.safeParse(formData);
    if (result.success) {
      setUserData({ ...userData, ...formData });
      setCurrentStep(3);
    }
  };

  return (
    <div className="reclutador-form-container h-190 min-h-190 max-h-190 flex flex-col justify-center items-center gap-8">
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Cuentanos mas sobre ti!</h1>
      </div>
      <div className="form">
        {userData.role === "reclutador" && currentStep === 2 && (
          <form id="reclutadorForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center">
            <div className="input flex flex-col gap-2 nombreEmpresa">
              <label className="font-medium text-lg" htmlFor="nombreEmpresa">
                Nombre de la Empresa
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="nombreEmpresa"
                id="nombreEmpresa"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.nombreEmpresa.error ? <span className="text-red-500">{errors.nombreEmpresa.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 nombre">
              <label className="font-medium text-lg" htmlFor="nombre">
                Nombre del representante
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="nombre"
                id="nombre"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.nombre.error ? <span className="text-red-500">{errors.nombre.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 apellido">
              <label className="font-medium text-lg" htmlFor="apellido">
                Apellido del representante
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="apellido"
                id="apellido"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.apellido.error ? <span className="text-red-500">{errors.apellido.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 email">
              <label className="font-medium text-lg" htmlFor="email">
                Email coorporativo
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="email"
                id="email"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.email.error ? <span className="text-red-500">{errors.email.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 ubicacion">
              <label className="font-medium text-lg" htmlFor="ubicacion">
                Ubicación
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="ubicacion"
                id="ubicacion"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.ubicacion.error ? <span className="text-red-500">{errors.ubicacion.message}</span> : ""}
            </div>
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
              />
              {errors.contraseña.error ? <span className="text-red-500">{errors.contraseña.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 confirmarContraseña">
              <label className="font-medium text-lg" htmlFor="confirmarcontraseña">
                Confirmar Contraseña
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="password"
                name="confirmarcontraseña"
                id="confirmarcontraseña"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.confirmarcontraseña.error ? <span className="text-red-500">{errors.confirmarcontraseña.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 biografia">
              <label className="font-medium text-lg" htmlFor="biografia">
                Biografía
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="biografia"
                id="biografia"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.biografia.error ? <span className="text-red-500">{errors.biografia.message}</span> : ""}
            </div>
          </form>
        )}
        {userData.role === "experto" && currentStep === 2 && (
          <form id="expertoForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center">
            <div className="input flex flex-col gap-2 nombre">
              <label className="font-medium text-lg" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="nombre"
                id="nombre"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.nombre.error ? <span className="text-red-500">{errors.nombre.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 apellido">
              <label className="font-medium text-lg" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="apellido"
                id="apellido"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.apellido.error ? <span className="text-red-500">{errors.apellido.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 email">
              <label className="font-medium text-lg" htmlFor="email">
                Email
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="email"
                id="email"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.email.error ? <span className="text-red-500">{errors.email.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 ubicacion">
              <label className="font-medium text-lg" htmlFor="ubicacion">
                Ubicación
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="ubicacion"
                id="ubicacion"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.ubicacion.error ? <span className="text-red-500">{errors.ubicacion.message}</span> : ""}
            </div>
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
              />
              {errors.contraseña.error ? <span className="text-red-500">{errors.contraseña.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 confirmarContraseña">
              <label className="font-medium text-lg" htmlFor="confirmarcontraseña">
                Confirmar Contraseña
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="password"
                name="confirmarcontraseña"
                id="confirmarcontraseña"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.confirmarcontraseña.error ? <span className="text-red-500">{errors.confirmarcontraseña.message}</span> : ""}
            </div>
            <div className="input flex flex-col gap-2 biografia">
              <label className="font-medium text-lg" htmlFor="biografia">
                Biografía
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="biografia"
                id="biografia"
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {errors.biografia.error ? <span className="text-red-500">{errors.biografia.message}</span> : ""}
            </div>
          </form>
        )}
      </div>
      <div className="buttons flex flex-row-reverse justify-between items-center">
        <NextButton mainText="" secondaryText="Continuar" currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <GoBackButton mainText="" secondaryText="Volver" currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
  );
}
