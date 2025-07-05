import "../styles/globals.css";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex justify-center items-center w-screen h-screen ">
        <div className="login-container relative flex flex-row justify-center items-center bg-white w-full h-full shadow-xl rounded-2xl">
          <div className="left-column flex flex-col gap-8  justify-center items-center w-3/4 h-full p-5">{children}</div>

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
      </body>
    </html>
  );
}
