import NextButton from "@/components/ui/next-button.jsx";
import GoBackButton from "@/components/ui/goback-button.jsx";
export default function Step2({ currentStep, setCurrentStep, formData, setFormData }) {
  if (formData.role === "") {
    // If the role is not selected, redirect to step 1
    setCurrentStep(1);
    return null; // Prevent rendering this step if role is not selected
  }

  return (
    <div className="reclutador-form-container h-full flex flex-col justify-center items-center gap-8">
      <div className="title">
        <h1 className="text-3xl font-semibold text-primary">¡Cuentanos mas sobre ti!</h1>
      </div>
      <div className="form">
        {formData.role === "reclutador" && currentStep === 2 && (
          <form id="reclutadorForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center">
            <div className="input flex flex-col gap-2 nombreEmpresa">
              <label className="font-medium text-lg" htmlFor="nombreEmpresa">
                Nombre de la Empresa
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="nombreEmpresa" id="nombreEmpresa" />
            </div>
            <div className="input flex flex-col gap-2 nombre">
              <label className="font-medium text-lg" htmlFor="nombre">
                Nombre del representante
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="nombre" id="nombre" />
            </div>
            <div className="input flex flex-col gap-2 apellido">
              <label className="font-medium text-lg" htmlFor="apellido">
                Apellido del representante
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="apellido" id="apellido" />
            </div>
            <div className="input flex flex-col gap-2 emailCooporativo">
              <label className="font-medium text-lg" htmlFor="emailCooporativo">
                Email Corporativo
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="emailCooporativo" id="emailCooporativo" />
            </div>
            <div className="input flex flex-col gap-2 ubicacion">
              <label className="font-medium text-lg" htmlFor="ubicacion">
                Ubicación
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="ubicacion" id="ubicacion" />
            </div>
            <div className="input flex flex-col gap-2 contraseña">
              <label className="font-medium text-lg" htmlFor="contraseña">
                Contraseña
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="password" name="contraseña" id="contraseña" />
            </div>
            <div className="input flex flex-col gap-2 confirmarContraseña">
              <label className="font-medium text-lg" htmlFor="confirmarcontraseña">
                Confirmar Contraseña
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="password" name="confirmarcontraseña" id="confirmarcontraseña" />
            </div>
            <div className="input flex flex-col gap-2 biografia">
              <label className="font-medium text-lg" htmlFor="biografia">
                Biografía
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="biografia" id="biografia" />
            </div>
          </form>
        )}
        {formData.role === "experto" && currentStep === 2 && (
          <form id="expertoForm" action="" className=" grid grid-cols-2 gap-4 justify-center items-center">
            <div className="input flex flex-col gap-2 nombre">
              <label className="font-medium text-lg" htmlFor="nombre">
                Nombre
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="nombre" id="nombre" />
            </div>
            <div className="input flex flex-col gap-2 apellido">
              <label className="font-medium text-lg" htmlFor="apellido">
                Apellido
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="apellido" id="apellido" />
            </div>
            <div className="input flex flex-col gap-2 email">
              <label className="font-medium text-lg" htmlFor="email">
                Email
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="email" id="email" />
            </div>
            <div className="input flex flex-col gap-2 ubicacion">
              <label className="font-medium text-lg" htmlFor="ubicacion">
                Ubicación
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="ubicacion" id="ubicacion" />
            </div>
            <div className="input flex flex-col gap-2 contraseña">
              <label className="font-medium text-lg" htmlFor="contraseña">
                Contraseña
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="password" name="contraseña" id="contraseña" />
            </div>
            <div className="input flex flex-col gap-2 confirmarContraseña">
              <label className="font-medium text-lg" htmlFor="confirmarcontraseña">
                Confirmar Contraseña
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="password" name="confirmarcontraseña" id="confirmarcontraseña" />
            </div>
            <div className="input flex flex-col gap-2 biografia">
              <label className="font-medium text-lg" htmlFor="biografia">
                Biografía
              </label>
              <input className="w-auto text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="biografia" id="biografia" />
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
