import NextButton from "@/components/ui/NextButton.jsx";
import GoBackButton from "@/components/ui/GoBackButton.jsx";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as z from "zod/v4";
import Loader from "@/components/ui/Loader";
import api from "@/lib/api/api";

export default function Step1_RC({ currentStep, setCurrentStep, userData, setUserData }) {
  const router = useRouter();
  const [email, setEmail] = useState(userData.email || "");
  const [loading, setLoading] = useState(false);

  // Update current step to 1 when this component is rendered
  if (currentStep !== 1) {
    setCurrentStep(1);
  }

  const emailSchema = z.email("El email ingresado no es valido.").min(1, "El email es requerido");
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
  });

  const validateEmail = (email) => {
    const result = emailSchema.safeParse(email);
    setEmail(email);
    if (!result.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: {
          error: true,
          message: result.error.issues[0].message,
        },
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: {
          error: false,
          message: "",
        },
      }));
      return true;
    }
  };

  const handleSubmit = async () => {
    // Validate email before proceeding
    setLoading(true);
    if (!validateEmail(email)) {
      console.error("Email validation failed");
      return;
    }

    // Send email to receive the code
    try {
      const response = await api.post("/users/forgot-password", { email }, { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        console.log("Email sent successfully");
        setUserData((prevData) => ({ ...prevData, email: email }));
        setCurrentStep(2); // Move to the next step after successful email submission
        setErrors({
          email: {
            error: false,
            message: "",
          },
        });
      } else if (response.status === 404) {
        setErrors(() => ({
          email: {
            error: true,
            message: "El email ingresado no existe. Por favor, verifica e intenta nuevamente.",
          },
        }));
      } else {
        setErrors(() => ({
          email: {
            error: true,
            message: "Ha ocurrido un error al enviar el codigo. Por favor, inténtalo de nuevo.",
          },
        }));
      }
    } catch (error) {
      console.error("Error sending email (TryCatch):", error);
      setErrors(() => ({
        email: {
          error: true,
          message: "Ha ocurrido un error al enviar el codigo. Por favor, inténtalo de nuevo.",
        },
      }));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="step-container flex flex-col justify-center items-center gap-8 h-full w-full">
        {loading && <Loader />}
        <div className="title flex justify-center items-center flex-col gap-4">
          <h1 className="text-3xl font-semibold text-primary">¿Olvidaste tu contraseña?</h1>
          <p className="font-regular opacity-60 text-md w-3/4">No te preocupes, estamos aquí para ayudarte. Ingresa tu email y te enviaremos un codigo para restablecer tu contraseña.</p>
        </div>
        <form className=" w-full h-auto px-33 py-5">
          <div className="input flex flex-col gap-2 email">
            <label className="font-medium text-lg" htmlFor="email">
              Email
            </label>
            <input
              className="w-auto text-lg h-9 border px-2 border-gray-400 rounded-md shadow-sm outline-primary"
              type="text"
              name="email"
              id="email"
              onChange={(e) => validateEmail(e.target.value)}
              value={email}
            />
            {<span className="text-red-500 text-sm min-h-1 h-1 py-2 flex justify-start items-center">{errors.email.error ? errors.email.message : ""}</span>}
          </div>
        </form>
        <div className="buttons-container flex flex-row">
          <div className="go-backbtn">
            <div className="goback-btn relative">
              <button className=" cursor-pointer" onClick={() => router.push("/auth/login")}>
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
          <div className="next-btn relative">
            <button className=" cursor-pointer" onClick={handleSubmit} disabled={!emailSchema.safeParse(email).success}>
              <div className="text px-10">
                <span className="secondary-text font-light">Continuar</span>
              </div>
              <div className="arrow">
                <svg className="size-8 fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
                </svg>
              </div>
            </button>
          </div>
          {/* <NextButton disabled={!emailSchema.safeParse(email).success} mainText="" secondaryText="Continuar" currentStep={currentStep} setCurrentStep={setCurrentStep} /> */}
        </div>
      </div>
    </>
  );
}
