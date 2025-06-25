import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  return (
    <div className="login-container relative flex flex-row justify-center items-center bg-white w-full h-full shadow-xl rounded-2xl">
      <div className="left-column flex flex-col gap-8  justify-center items-center w-3/4 h-full">
        <div className="logo p-10 absolute top-0 left-0">
          <a href="#home">
            <Image width={104} height={40} className="h-10 w-26 aspect-video" src="/logos/logotipo_pc.png" alt="LogoTipo Trivo" />
          </a>
        </div>
        <div className="content-container flex flex-col gap-8 w-130 max-w-130">
          <div className="title flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl font-semibold text-primary">Iniciar sesión</h1>
            <p className="font-regular opacity-60 text-md">
              ¡Bienvenid@ de vuelta! Selecione el metodo con el <br /> que desea iniciar sesion:
            </p>
          </div>
          <div className="auth flex flex-col justify-center items-center">
            <div className="auth-button">
              <button className="flex flex-row justify-center items-center gap-2 bg-white border border-gray-200 rounded-lg px-7 py-1 hover:border-primary hover:cursor-pointer hover:transition-all">
                <div className="icon">
                  <svg className="size-8 fill-[#0A66C2]" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 16 16" fill="none">
                    <path d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z" />
                  </svg>
                </div>
                <span className="text font-medium text-lg">LinkedIn</span>
              </button>
            </div>
          </div>
          <div className="login-form flex flex-col gap-8">
            <div className="continue-withemail flex flex-row justify-between items-center gap-6">
              <div className="h-[1px] w-[150px] bg-gray-300"></div>
              <span className="text-regular text-md opacity-60">o continua con email</span>
              <div className="h-[1px] w-[150px] bg-gray-300"></div>
            </div>
            <form action="" className="flex flex-col gap-4 justify-center items-center">
              <div className="input flex flex-col gap-2">
                <label className="font-medium text-lg" htmlFor="email">
                  Email
                </label>
                <input className="w-130 text-lg h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="text" name="email" id="email" />
              </div>
              <div className="input flex flex-col gap-2">
                <label className="font-medium text-lg" htmlFor="password">
                  Contraseña
                </label>
                <input className="w-130 text-md h-9 border border-gray-400 rounded-md shadow-sm outline-primary" type="password" name="password" id="password" />
              </div>
            </form>
            <div className="form-actions flex flex-row justify-between items-center">
              <div className="rememberme flex flex-row justify-center items-center">
                <Checkbox className={"checked:bg-primary"} id="rememberme" />
                <label htmlFor="rememberme" className="ml-2 opacity-70 font-regular hover:underline hover:cursor-pointer">
                  Recuérdame
                </label>
              </div>
              <div className="forgot-password">
                <a href="#" className="font-semibold text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="submit-button flex justify-center items-center">
              <button
                type="button"
                className="bg-primary font-semibold text-md text-white w-130 h-11 rounded-md hover:bg-bg-secondary hover:text-primary border border-white hover:border-primary transition-all hover:transition-all hover:duration-500 duration:500"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="signup flex flex-row justify-center items-center gap-2">
              <span className="text-regular text-md opacity-60">
                ¿Aun no tienes una cuenta? <br />
              </span>
              <a href="#" className="font-semibold text-primary hover:underline">
                Regístrate ahora
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="right-column bg-[url(/imagenes/login1.jpg)] bg-cover bg-no-repeat bg-center w-1/2 h-full border rounded-tr-2xl rounded-br-2xl relative flex flex-col justify-start items-center">
        <div
          className="absolute rounded-tr-2xl rounded-br-2xl inset-0 pointer-events-none z-1"
          style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 100%)" }}
        ></div>
        <div className="logo relative z-2 py-10">
          <Image width={104} height={40} className="h-10 w-26 aspect-video" src="/logos/logotipo_w.png" alt="LogoTipo Trivo" />
        </div>
      </div>
    </div>
  );
}
