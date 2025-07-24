"use client";

import { useState } from "react";
import Step1 from "@/components/ui/Auth/recuperar-contraseña/steps/Step1_RC.jsx";
import Step2 from "@/components/ui/Auth/recuperar-contraseña/steps/Step2_RC.jsx";
import Step3 from "@/components/ui/Auth/recuperar-contraseña/steps/Step3_RC.jsx";

export default function RecuperarContraseñaPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    email: "",
    contraseña: "",
    confirmContraseña: "",
  });

  return (
    <>
      <title>Trivo | Recuperar contraseña</title>
      <div className="flex flex-col justify-between items-center h-full w-full overflow-auto gap-8 hide-scrollbar">
        <div className="progress-bar flex flex-row justify-center items-center w-full py-5">
          <div className="step-1 w-1/4 flex flex-row justify-center items-center">
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 1 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`line bg-gray-300 h-0.5 w-full ${currentStep > 1 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
          <div className="step-2 w-1/4 flex flex-row justify-center items-center">
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 2 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`line h-0.5 w-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`dot rounded-full h-4 w-4 ${currentStep >= 3 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
        </div>

        {/* Render the steps */}
        {currentStep === 1 && <Step1 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
        {currentStep === 2 && <Step2 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
        {currentStep === 3 && <Step3 currentStep={currentStep} setCurrentStep={setCurrentStep} userData={userData} setUserData={setUserData} />}
      </div>
    </>
  );
}
