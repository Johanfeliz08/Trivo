import "@/app/styles/globals.css";
import Image from "next/image";

export const metadata = {
  title: "Trivo | Admin Login",
  description: "Inicio de sesión del  personal administrativo de Trivo",
};

export default function AdminAuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body className="bg-bg-secondary flex justify-center items-center h-screen w-screen overflow-hidden relative">
        <div className="bg-logo">
          <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute top-0 right-0 w-60 h-60 opacity-20" />
        </div>
        {children}
      </body>

      <div className="bg-logo">
        <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute bottom-0 -left-10 w-60 h-60 opacity-20" />
      </div>
    </html>
  );
}
