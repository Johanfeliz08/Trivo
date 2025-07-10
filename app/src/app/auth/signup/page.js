"use client";

import Step1 from "@/components/ui/Auth/SignUp/steps/step1.jsx";
import Step2 from "@/components/ui/Auth/SignUp/steps/step2.jsx";
import Step3 from "@/components/ui/Auth/SignUp/steps/step3/step3.jsx";
import Step4 from "@/components/ui/Auth/SignUp/steps/step4.jsx";
import { useState } from "react";

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    usuarioId: "",
    nombre: "",
    apellido: "",
    biografia: "",
    email: "",
    contraseña: "",
    nombreUsuario: "",
    ubicacion: "",
    cuentaConfirmada: false,
    role: "reclutador", // Default role
    categoriasIntereses: [],
    intereses: [],
    fotoPerfil: "",
    estadoUsuario: "",
  });

  return (
    <>
      <title>Trivo | Registrate</title>
      <div className="flex flex-col justify-between items-center h-full w-full overflow-auto gap-8 hide-scrollbar">
        <div className="progress-bar flex flex-row justify-center items-center w-full py-5">
          <div className="step-1 w-1/4 flex flex-row justify-center items-center">
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 1 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`line bg-gray-300 h-0.5 w-full ${currentStep > 1 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
          <div className="step-2 w-1/4 flex flex-row justify-center items-center">
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`line h-0.5 w-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
          <div className="step-3 w-1/4 flex flex-row justify-center items-center">
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`line h-0.5 w-full ${currentStep >= 4 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 4 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
        </div>

        {/* Render the steps */}
        {currentStep === 1 && <Step1 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
        {currentStep === 2 && <Step2 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
        {currentStep === 3 && <Step3 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
        {currentStep === 4 && <Step4 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
      </div>
    </>
  );
}
