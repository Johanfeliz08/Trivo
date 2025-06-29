import NextButton from "@/components/ui/next-button.jsx";
import GoBackButton from "@/components/ui/goback-button.jsx";
import * as z from "zod/v4";
import { useState, useEffect } from "react";

export default function Step2({ currentStep, setCurrentStep, userData, setUserData }) {
  // Update the current step to 2 if it's not already set
  if (currentStep !== 2) {
    setCurrentStep(2);
  }

  if (userData.role === "") {
    setCurrentStep(1); // If the role is not selected, redirect to step 1
    return null; // Prevent rendering this step if role is not selected
  }

  // Define the form schemas for each role
  const formReclutadorSchema = z.object({
    nombreEmpresa: z.string().min(5, "El nombre de la empresa debe tener al menos 5 caracteres").max(100, "El nombre de la empresa no puede exceder los 100 caracteres"),
    nombre: z.string().min(3, "Su nombre debe tener al menos 3 caracteres"),
    apellido: z.string().min(3, "Su apellido debe tener al menos 3 caracteres"),
    email: z.string().email("El email es inválido"),
    ubicacion: z.string().min(1, "La ubicación es requerida"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
    biografia: z.string().min(10, "La biografía debe tener al menos 10 caracteres").max(500, "La biografía no puede exceder los 500 caracteres"),
  });

  const formExpertoSchema = z.object({
    nombre: z.string().min(3, "Su nombre debe tener al menos 3 caracteres"),
    apellido: z.string().min(3, "Su apellido debe tener al menos 3 caracteres"),
    email: z.string().email("El email es inválido"),
    ubicacion: z.string().min(1, "La ubicación es requerida"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
    biografia: z.string().min(10, "La biografía debe tener al menos 10 caracteres").max(500, "La biografía no puede exceder los 500 caracteres"),
  });

  // Handle form data
  const [formData, setFormData] = useState(() => ({
    ...userData,
    nombreEmpresa: userData.nombreEmpresa ?? "",
    confirmarContraseña: "",
  }));

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
    confirmarContraseña: {
      error: false,
      message: "",
    },
    biografia: {
      error: false,
      message: "",
    },
  });

  const [formSchema, setFormSchema] = useState(userData.role === "reclutador" ? formReclutadorSchema : formExpertoSchema);

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

  const handleSubmit = (formData) => {
    const result = formSchema.safeParse(formData);

    if (result.success) {
      setUserData({ ...userData, ...formData });
      setCurrentStep(currentStep + 1);
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div className="form-container h-190 flex flex-col justify-center items-center gap-8">
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Cuentanos mas sobre ti!</h1>
      </div>
      <div className="form">
        {userData.role === "reclutador" && currentStep === 2 && (
          <form id="reclutadorForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center max-w-180 w-180">
            <div className="input flex flex-col gap-2 nombreEmpresa">
              <label className="font-medium text-lg" htmlFor="nombreEmpresa">
                Nombre de la Empresa
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="nombreEmpresa"
                id="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.nombreEmpresa.error ? errors.nombreEmpresa.message : ""}</span>}
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
                value={formData.nombre}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.nombre.error ? errors.nombre.message : ""}</span>}
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
                value={formData.apellido}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.apellido.error ? errors.apellido.message : ""}</span>}
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
                value={formData.email}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.email.error ? errors.email.message : ""}</span>}
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
                value={formData.ubicacion}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.ubicacion.error ? errors.ubicacion.message : ""}</span>}
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
                value={formData.biografia}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.biografia.error ? errors.biografia.message : ""}</span>}
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
                onChange={(e) => validateInput(e.target.name, e.target.value)}
                value={formData.confirmarContraseña}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.confirmarContraseña.error ? errors.confirmarContraseña.message : ""}</span>}
            </div>
          </form>
        )}
        {userData.role === "experto" && currentStep === 2 && (
          <form id="expertoForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center max-w-180 w-180">
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
                value={formData.nombre}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.nombre.error ? errors.nombre.message : ""}</span>}
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
                value={formData.apellido}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.apellido.error ? errors.apellido.message : ""}</span>}
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
                value={formData.email}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.email.error ? errors.email.message : ""}</span>}
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
                value={formData.ubicacion}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.ubicacion.error ? errors.ubicacion.message : ""}</span>}
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
                value={formData.biografia}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.biografia.error ? errors.biografia.message : ""}</span>}
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
                onChange={(e) => validateInput(e.target.name, e.target.value)}
                value={formData.confirmarContraseña}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.confirmarContraseña.error ? errors.confirmarContraseña.message : ""}</span>}
            </div>
          </form>
        )}
      </div>
      <div className="buttons flex flex-row-reverse justify-between items-center">
        <div className="next-btn relative">
          <button className=" cursor-pointer" onClick={() => handleSubmit(formData)} disabled={!formSchema.safeParse(formData).success}>
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
