import NextButton from "@/components/ui/NextButton.jsx";
import GoBackButton from "@/components/ui/GoBackButton.jsx";
import * as z from "zod/v4";
import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import Image from "next/image";

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
    posicion: z.string().min(1, "La posición es requerida").max(100, "La posición no puede exceder los 100 caracteres"),
    foto: z.instanceof(File),
  });

  const formExpertoSchema = z.object({
    nombre: z.string().min(3, "Su nombre debe tener al menos 3 caracteres"),
    apellido: z.string().min(3, "Su apellido debe tener al menos 3 caracteres"),
    email: z.string().email("El email es inválido"),
    ubicacion: z.string().min(1, "La ubicación es requerida"),
    contraseña: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarContraseña: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
    biografia: z.string().min(10, "La biografía debe tener al menos 10 caracteres").max(500, "La biografía no puede exceder los 500 caracteres"),
    posicion: z.string().min(1, "La posición es requerida").max(100, "La posición no puede exceder los 100 caracteres"),
    foto: z.instanceof(File),
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
    posicion: {
      error: false,
      message: "",
    },
    foto: {
      error: false,
      message: "",
    },
  });

  const [formSchema, setFormSchema] = useState(userData.role === "reclutador" ? formReclutadorSchema : formExpertoSchema);

  const isEmailTaken = async (email) => {
    try {
      const response = await api.get(`/users/verify-email?email=${encodeURIComponent(email)}`);

      if (response.status === 200 && response.data === true) {
        return; // Email is available, no action needed
      } else if (response.status === 400 && response.response.data.codigo === "409") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: {
            error: true,
            message: "El email ya está en uso, por favor ingrese otro.",
          },
        }));
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const validateInput = (inputName, value) => {
    const fieldSchema = formSchema.pick({ [inputName]: true });
    const result = fieldSchema.safeParse({ [inputName]: value });

    if (inputName === "email") {
      isEmailTaken(value);
    }

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fieldSchema = formSchema.pick({ foto: true });
    const result = fieldSchema.safeParse({ foto: file });

    if (result.success && file) {
      setFormData((prevData) => ({ ...prevData, foto: file }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        foto: { error: false, message: "" },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, foto: null }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        foto: { error: true, message: "Debe seleccionar una imagen" },
      }));
    }
  };

  const handleSubmit = (formData) => {
    const result = formSchema.safeParse(formData);

    if (result.success) {
      setUserData({ ...userData, ...formData });
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="form-container h-250 flex flex-col justify-center items-center gap-8">
      <title>Trivo | Registro - Paso 2</title>
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary mt-4">¡Cuentanos mas sobre ti!</h1>
      </div>
      <div className="form">
        {userData.role === "reclutador" && currentStep === 2 && (
          <form id="reclutadorForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center max-w-180 w-180">
            <div className="input fotoPerfil flex flex-col justify-center items-center w-full">
              <label htmlFor="userPicture" className="cursor-pointer relative">
                <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-30 h-30 bg-gray-200 shadow-md">
                  <Image src={formData.foto instanceof File ? URL.createObjectURL(formData.foto) : "/imagenes/userDefault.png"} alt="user-avatar" width={850} height={850} className="object-cover" />
                </div>
                <span className="font-medium text-lg">Foto de perfil</span>
                <div className="icon absolute bottom-9 -right-5">
                  <svg className="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="M1.071,7.037l1.82,.828c-.393,.864-.659,1.778-.792,2.718l-1.98-.279c.16-1.129,.48-2.229,.952-3.267Zm3.347,11.483l-1.516,1.305c.744,.864,1.605,1.618,2.562,2.24l1.091-1.676c-.797-.52-1.516-1.148-2.137-1.869ZM.119,13.696c.16,1.129,.48,2.229,.952,3.267l1.82-.828c-.393-.864-.659-1.778-.792-2.718l-1.98,.279ZM2.892,4.187l1.518,1.303c.622-.725,1.344-1.356,2.146-1.879l-1.092-1.676c-.96,.626-1.825,1.383-2.571,2.252Zm8.108,13.813h2V8.889l2.892,2.826,1.397-1.43-3.718-3.634c-.84-.84-2.312-.832-3.134-.008l-3.726,3.642,1.397,1.43,2.892-2.825v9.111ZM12,0c-1.166,0-2.319,.167-3.428,.496l.569,1.918c.924-.274,1.886-.414,2.858-.414,5.514,0,10,4.486,10,10s-4.486,10-10,10c-.973,0-1.934-.14-2.858-.414l-.569,1.918c1.109,.329,2.262,.496,3.428,.496,6.617,0,12-5.383,12-12S18.617,0,12,0Z" />
                  </svg>
                </div>
                <input type="file" id="userPicture" name="userPicture" className="hidden" accept=".jpg,.jpeg,.png,.gif" onChange={(e) => handleImageChange(e)} />
              </label>
              {<span className="text-red-500 text-sm min-h-1 h-1 py-3 flex justify-start items-center">{errors.foto.error ? errors.foto.message : ""}</span>}
            </div>
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
            <div className="input flex flex-col gap-2 posicion">
              <label className="font-medium text-lg" htmlFor="posicion">
                Posición
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="posicion"
                id="posicion"
                value={formData.posicion}
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.posicion.error ? errors.posicion.message : ""}</span>}
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
        )}
        {userData.role === "experto" && currentStep === 2 && (
          <form id="expertoForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center max-w-180 w-180">
            <div className="input fotoPerfil flex flex-col justify-center items-center w-full">
              <label htmlFor="userPicture" className="cursor-pointer relative">
                <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-30 h-30 bg-gray-200 shadow-md">
                  <Image src={formData.foto instanceof File ? URL.createObjectURL(formData.foto) : "/imagenes/userDefault.png"} alt="user-avatar" width={850} height={850} className="object-cover" />
                </div>
                <span className="font-medium text-lg">Foto de perfil</span>
                <div className="icon absolute bottom-9 -right-5">
                  <svg className="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="M1.071,7.037l1.82,.828c-.393,.864-.659,1.778-.792,2.718l-1.98-.279c.16-1.129,.48-2.229,.952-3.267Zm3.347,11.483l-1.516,1.305c.744,.864,1.605,1.618,2.562,2.24l1.091-1.676c-.797-.52-1.516-1.148-2.137-1.869ZM.119,13.696c.16,1.129,.48,2.229,.952,3.267l1.82-.828c-.393-.864-.659-1.778-.792-2.718l-1.98,.279ZM2.892,4.187l1.518,1.303c.622-.725,1.344-1.356,2.146-1.879l-1.092-1.676c-.96,.626-1.825,1.383-2.571,2.252Zm8.108,13.813h2V8.889l2.892,2.826,1.397-1.43-3.718-3.634c-.84-.84-2.312-.832-3.134-.008l-3.726,3.642,1.397,1.43,2.892-2.825v9.111ZM12,0c-1.166,0-2.319,.167-3.428,.496l.569,1.918c.924-.274,1.886-.414,2.858-.414,5.514,0,10,4.486,10,10s-4.486,10-10,10c-.973,0-1.934-.14-2.858-.414l-.569,1.918c1.109,.329,2.262,.496,3.428,.496,6.617,0,12-5.383,12-12S18.617,0,12,0Z" />
                  </svg>
                </div>
                <input type="file" id="userPicture" name="userPicture" className="hidden" accept=".jpg,.jpeg,.png,.gif" onChange={(e) => handleImageChange(e)} />
              </label>
              {<span className="text-red-500 text-sm min-h-1 h-1 py-3 flex justify-start items-center">{errors.foto.error ? errors.foto.message : ""}</span>}
            </div>
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
            <div className="input flex flex-col gap-2 posicion">
              <label className="font-medium text-lg" htmlFor="posicion">
                Posición
              </label>
              <input
                className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary"
                type="text"
                name="posicion"
                id="posicion"
                value={formData.posicion}
                onChange={(e) => validateInput(e.target.name, e.target.value)}
              />
              {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.posicion.error ? errors.posicion.message : ""}</span>}
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
        )}
      </div>
      <div className="buttons flex flex-row-reverse justify-between items-center">
        <div className="next-btn relative">
          <button className=" cursor-pointer" onClick={() => handleSubmit(formData)} disabled={!formSchema.safeParse(formData).success || errors.confirmarContraseña.error || errors.foto.error}>
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
