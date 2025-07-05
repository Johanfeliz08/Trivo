import * as z from "zod/v4";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api/api";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";

export default function Step4({ currentStep, setCurrentStep, userData, setUserData }) {
  const router = useRouter();

  const digitSchema = z.string().regex(/^\d{1}$/, "Debe ser un número de un solo dígito");

  const confirmationCodeSchema = z.object({
    firstDigit: digitSchema,
    secondDigit: digitSchema,
    thirdDigit: digitSchema,
    fourthDigit: digitSchema,
    fifthDigit: digitSchema,
    sixthDigit: digitSchema,
  });

  const [confirmationCode, setConfirmationCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    fourthDigit: "",
    fifthDigit: "",
    sixthDigit: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isCodeValid = confirmationCodeSchema.safeParse(confirmationCode).success;

  const [currentDigit, setCurrentDigit] = useState(1);
  const [errors, setErrors] = useState({
    confirmationCode: {
      error: false,
      message: "",
    },
  });

  const firstDigitRef = useRef(null);
  const secondDigitRef = useRef(null);
  const thirdDigitRef = useRef(null);
  const fourthDigitRef = useRef(null);
  const fifthDigitRef = useRef(null);
  const sixthDigitRef = useRef(null);

  const digitsRefs = [firstDigitRef, secondDigitRef, thirdDigitRef, fourthDigitRef, fifthDigitRef, sixthDigitRef];

  useEffect(() => {
    digitsRefs[currentDigit - 1].current?.focus();
  }, [currentDigit]);

  const handleConfirmationCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const parsedCode = confirmationCodeSchema.safeParse(confirmationCode);
      if (!parsedCode.success) {
        setErrors({
          confirmationCode: {
            error: true,
            message: "El codigo de confirmación no es válido. Por favor, verifique e intente nuevamente.",
          },
        });
        return;
      }

      const code = Object.values(parsedCode.data).join("");
      const res = await api.post(`/users/confirm-account?usuarioId=${userData.usuarioId}&&codigo=${code}`);

      if (res.status === 200) {
        setErrors({
          confirmationCode: {
            error: false,
            message: "",
          },
        });

        setShowModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors({
          confirmationCode: {
            error: true,
            message: "Código de confirmación inválido. Por favor, inténtalo de nuevo.",
          },
        });
        setCurrentDigit(1);
        setConfirmationCode({
          firstDigit: "",
          secondDigit: "",
          thirdDigit: "",
          fourthDigit: "",
          fifthDigit: "",
          sixthDigit: "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="step-container flex flex-col justify-center items-center gap-18 h-full w-full">
        {isLoading && <Loader />}
        {showModal && <Modal message="Su cuenta ha sido creada satisfactoriamente, por favor inicie sesion." redirectTo="/auth/login" type="success" />}

        <div className="title flex justify-center items-center flex-col gap-4">
          <h1 className="text-3xl font-semibold text-primary">¡Confirma tu cuenta!</h1>
          <p className="font-regular opacity-60 text-md w-1/2 text-justify">
            Te hemos enviado un correo electrónico con un código de confirmación. Revisa tu bandeja de entrada (y la carpeta de spam, por si acaso).
          </p>
        </div>

        <div className="confirmation-code flex flex-col justify-center items-center gap-4">
          <form action="" className="flex flex-row justify-center items-center gap-4">
            <div className="first-digit">
              <input
                id="firstDigit"
                type="text"
                maxLength="1"
                className={`w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary
                    `}
                ref={firstDigitRef}
                autoFocus
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, firstDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(1);
                  } else {
                    setCurrentDigit(2);
                  }
                }}
                value={confirmationCode.firstDigit}
              />
            </div>
            <div className="second-digit">
              <input
                id="secondDigit"
                type="text"
                maxLength="1"
                className="w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ref={secondDigitRef}
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, secondDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(1);
                  } else {
                    setCurrentDigit(3);
                  }
                }}
                value={confirmationCode.secondDigit}
              />
            </div>
            <div className="third-digit">
              <input
                id="thirdDigit"
                type="text"
                maxLength="1"
                className="w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ref={thirdDigitRef}
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, thirdDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(2);
                  } else {
                    setCurrentDigit(4);
                  }
                }}
                value={confirmationCode.thirdDigit}
              />
            </div>
            <div className="fourth-digit">
              <input
                id="fourthDigit"
                type="text"
                maxLength="1"
                className="w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ref={fourthDigitRef}
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, fourthDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(3);
                  } else {
                    setCurrentDigit(5);
                  }
                }}
                value={confirmationCode.fourthDigit}
              />
            </div>
            <div className="fifth-digit">
              <input
                id="fifthDigit"
                type="text"
                maxLength="1"
                className="w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ref={fifthDigitRef}
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, fifthDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(4);
                  } else {
                    setCurrentDigit(6);
                  }
                }}
                value={confirmationCode.fifthDigit}
              />
            </div>
            <div className="sixth-digit">
              <input
                id="sixthDigit"
                type="text"
                maxLength="1"
                className="w-18 h-18 text-center text-4xl bg-bg-secondary text-primary border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                ref={sixthDigitRef}
                onChange={(e) => {
                  setConfirmationCode({ ...confirmationCode, sixthDigit: e.target.value });
                }}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    setCurrentDigit(5);
                  } else {
                    setCurrentDigit(6);
                  }
                }}
                value={confirmationCode.sixthDigit}
              />
            </div>
          </form>
          <div className="no-data flex justify-center items-center">
            <p className="text-center text-red-500">{errors.confirmationCode ? errors.confirmationCode.message : ""}</p>
          </div>
        </div>

        <div className="buttons flex flex-row-reverse justify-between items-center">
          <div className="next-btn relative">
            <button className="cursor-pointer" onClick={handleConfirmationCode} disabled={!isCodeValid}>
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
              className="cursor-pointer"
              onClick={() => {
                setCurrentStep(currentStep - 1);
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
    </>
  );
}
