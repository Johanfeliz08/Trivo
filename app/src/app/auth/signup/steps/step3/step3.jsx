import { useEffect, useState } from "react";
import interesesData from "@/lib/mock_data/intereses.json";
import categoriasInteresesData from "@/lib/mock_data/categoriaIntereses.json";
import NextButton from "@/components/ui/next-button.jsx";
import GoBackButton from "@/components/ui/goback-button.jsx";
import InteresesPage from "./InteresesPage";
import CategoriaInteresesPage from "./CategoriaInteresesPage";
export default function Step3({ currentStep, setCurrentStep, formData, setFormData }) {
  // Numero del paso general
  if (currentStep !== 3) {
    setCurrentStep(3);
  }

  // Controlar el paso actual interno del componente
  // 1 - Seleccionar categoria de intereses
  // 2 - Seleccionar intereses
  const [currentInternalStep, setCurrentInternalStep] = useState(1);

  // Categoria de intereses
  let categoriasIntereses = [];
  categoriasInteresesData.map((categoriaInteres) => {
    categoriasIntereses.push(categoriaInteres);
  });

  return (
    <>
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Dinos en qué te gustaría colaborar!</h1>
      </div>

      {currentInternalStep === 1 && <CategoriaInteresesPage categoriasIntereses={categoriasIntereses} formData={formData} setFormData={setFormData} />}

      {currentInternalStep === 2 && <InteresesPage formData={formData} setFormData={setFormData} />}

      <div className="buttons flex flex-row-reverse justify-between items-center">
        <div className="next-btn relative">
          <button
            className=" cursor-pointer"
            onClick={() => {
              if (currentInternalStep === 1) {
                setCurrentInternalStep(currentInternalStep + 1);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
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
    </>
  );
}
