import { useState } from "react";
import InteresesPage from "./InteresesPage";
import CategoriaInteresesPage from "./CategoriaInteresesPage";
import api from "@/lib/api/api";
import Loader from "@/components/ui/Loader";

export default function Step3({ currentStep, setCurrentStep, userData, setUserData }) {
  // Numero del paso general
  if (currentStep !== 3) {
    setCurrentStep(3);
  }

  // Controlar el paso actual interno del componente
  // 1 - Seleccionar categoria de intereses
  // 2 - Seleccionar intereses
  const [currentInternalStep, setCurrentInternalStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Set the comun data of both roles
      const formData = new FormData();
      formData.append("Nombre", userData.nombre);
      formData.append("Apellido", userData.apellido);
      formData.append("Biografia", userData.biografia);
      formData.append("Email", userData.email);
      formData.append("Contrasena", userData.contraseña);
      formData.append("NombreUsuario", userData.nombre + userData.apellido + Math.floor(Math.random() * 1000));
      formData.append("Ubicacion", userData.ubicacion);

      if (userData.intereses.length > 0) {
        userData.intereses.forEach((interes) => {
          formData.append("Intereses", interes);
        });
      }

      formData.append("Foto", "");

      // Create first the user
      const resUsuario = await api.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // If the user was created successfully, we can continue with the next steps which is assign the role
      if (resUsuario.status === 200) {
        const data = resUsuario.data;
        setUserData({
          ...userData,
          usuarioId: data.valor.usuarioId,
        });

        try {
          if (data.valor.usuarioId !== "") {
            if (userData.role === "reclutador") {
              const reclutadorData = {
                nombreEmpresa: userData.nombreEmpresa,
                usuarioId: data.valor.usuarioId,
              };

              const resReclutador = await api.post(`/recruiters`, reclutadorData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });

              // If the recruiter was created successfully, we can continue to the next step
              if (resReclutador.status === 200) {
                setCurrentStep(currentStep + 1);
              } else {
                console.error("Error al crear el reclutador:", resReclutador.statusText);
              }
            } else if (userData.role === "experto") {
              expertoData = {
                usuarioId: data.valor.usuarioId,
                disponibleParaProyectos: true,
                contratado: false,
              };

              const restExperto = await api.post(`/experts`, expertoData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });

              // If the expert was created successfully, we can continue to the next step
              if (restExperto.status === 200) {
                setCurrentStep(currentStep + 1);
              } else {
                console.error("Error al crear el experto:", restExperto.statusText);
              }
            }
          } else {
            console.error("Error al crear el reclutador o experto: usuarioId no encontrado");
          }
        } catch (error) {
          console.error("Error al crear el reclutador o experto:", error);
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-190  max-h-190 flex flex-col justify-center items-center gap-8">
      <title>Trivo | Registro - Paso 3</title>
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Dinos en qué te gustaría colaborar!</h1>
      </div>

      {isLoading && <Loader />}

      {currentInternalStep === 1 && <CategoriaInteresesPage userData={userData} setUserData={setUserData} />}

      {currentInternalStep === 2 && <InteresesPage userData={userData} setUserData={setUserData} />}

      <div className="buttons flex flex-row-reverse justify-between items-center">
        <div className="next-btn relative">
          <button
            className=" cursor-pointer"
            onClick={() => {
              if (currentInternalStep === 1) {
                setCurrentInternalStep(currentInternalStep + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={currentInternalStep === 1 ? userData.categoriasIntereses.length === 0 : userData.intereses.length === 0}
          >
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
        <div className="goback-btn relative">
          <button
            className=" cursor-pointer"
            onClick={() => {
              if (currentInternalStep === 1) {
                setCurrentStep(currentStep - 1);
              } else {
                setCurrentInternalStep(currentInternalStep - 1);
              }
            }}
          >
            <div className="arrow">
              <svg className="size-8 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
              </svg>
            </div>
            <div className="text px-10">
              <span className="main-text font-semibold"></span>
              <span className="secondary-text font-light">Volver</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
