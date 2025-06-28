import NextButton from "@/components/ui/next-button.jsx";

export default function Step1({ currentStep, setCurrentStep, userData, setUserData }) {
  // Update current step to 1 when this component is rendered
  if (currentStep !== 1) {
    setCurrentStep(1);
  }

  return (
    <>
      <div className="step-container flex flex-col justify-center items-center gap-8 h-full w-full">
        <div className="title flex justify-center items-center flex-col gap-4">
          <h1 className="text-3xl font-semibold text-primary">¡Empieza a colaborar ya!</h1>
          <p className="font-regular opacity-60 text-md w-3/4">Elige el rol que deseas desempeñar dentro de Trivo y empieza a conectar con las oportunidades adecuadas.</p>
        </div>
        <div className="options flex flex-col gap-8">
          <div className="option w-150 max-w-150">
            <input type="radio" id="reclutador" name="role" value="reclutador" className="hidden" onChange={(e) => setUserData({ ...userData, role: e.target.value })} />
            <label
              htmlFor="reclutador"
              className={`bg-bg-secondary flex flex-row justify-center items-center border-2 w-full p-5 gap-5 rounded-2xl shadow-md h-36 min-h-36 max-h-36 ${
                userData.role === "reclutador" ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="icon bg-white rounded-full flex justify-center items-center w-30 h-20">
                <svg className="size-8 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1">
                  <path d="m18 11.051v-2.551c0-1.93-1.57-3.5-3.5-3.5h-2v-4.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v4.5h-2c-1.93 0-3.5 1.57-3.5 3.5v2.551c-1.692.245-3 1.691-3 3.449v9c0 .276.224.5.5.5s.5-.224.5-.5v-9c0-1.378 1.122-2.5 2.5-2.5h11c1.378 0 2.5 1.122 2.5 2.5v9c0 .276.224.5.5.5s.5-.224.5-.5v-9c0-1.758-1.308-3.204-3-3.449zm-11-.051v-2.5c0-1.378 1.122-2.5 2.5-2.5h5c1.378 0 2.5 1.122 2.5 2.5v2.5zm4 5.5v2c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5zm0 4.5v2.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.5c0-.276.224-.5.5-.5s.5.224.5.5zm3-4.5v2c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5zm0 4.5v2.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.5c0-.276.224-.5.5-.5s.5.224.5.5zm3-4.5v2c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5zm0 4.5v2.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.5c0-.276.224-.5.5-.5s.5.224.5.5zm-9-4.5v2c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5zm0 4.5v2.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-2.5c0-.276.224-.5.5-.5s.5.224.5.5z" />
                </svg>
              </div>
              <div className="text flex flex-col gap-1">
                <h2 className="font-semibold text-primary text-lg">Empresa</h2>
                <p className="font-light text-sm">Encuentra expertos validados, gestiona tus proyectos con agilidad y obtén resultados sin complicaciones.</p>
              </div>
            </label>
          </div>
          <div className="option w-150 max-w-150">
            <input type="radio" id="experto" name="role" value="experto" className="hidden" onChange={(e) => setUserData({ ...userData, role: e.target.value })} />
            <label
              htmlFor="experto"
              className={`bg-bg-secondary flex flex-row justify-center border-2 items-center w-full p-5 gap-5 rounded-2xl shadow-md h-36 min-h-36 max-h-36 ${
                userData.role === "experto" ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="icon bg-white rounded-full flex justify-center items-center w-35 h-20">
                <svg className="size-8 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M12.003,11.774c3.5-.021,5.307-1.83,5.372-5.396-.06-3.446-1.967-5.356-5.378-5.378-3.452,.021-5.372,2.066-5.372,5.378,0,3.462,1.921,5.375,5.378,5.396Zm-.006-9.774c2.855,.019,4.328,1.498,4.378,4.378-.055,2.982-1.446,4.379-4.372,4.396-2.93-.017-4.321-1.411-4.378-4.387,.055-2.934,1.487-4.369,4.372-4.387Z" />
                  <path d="M11.997,14.294c-5.259,.033-8.089,2.867-8.185,8.197-.005,.276,.215,.504,.491,.509h.009c.272,0,.495-.218,.5-.491,.086-4.825,2.438-7.186,7.184-7.215,4.689,.03,7.109,2.458,7.191,7.215,.005,.276,.255,.505,.509,.491,.276-.005,.496-.232,.491-.509-.091-5.252-2.997-8.164-8.19-8.197Z" />
                </svg>
              </div>
              <div className="text flex flex-col gap-1">
                <h2 className="font-semibold text-primary text-lg">Experto</h2>
                <p className="font-light text-sm">Muestra tus habilidades, accede a oportunidades reales y trabaja con empresas que confían en el talento independiente.</p>
              </div>
            </label>
          </div>
        </div>
        <div className="buttons-container">
          <NextButton mainText="" secondaryText="Continuar" currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </>
  );
}
