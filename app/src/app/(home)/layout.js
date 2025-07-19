"use client";

import "../styles/globals.css";
import Menu from "@/components/ui/Home/Menu";
import TopBar from "@/components/ui/Home/TopBar";
import Chat from "@/components/ui/Home/Chat";
import Image from "next/image";
import api from "@/lib/api/api";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "@/components/ui/Modal";
import { isTokenValid } from "@/lib/utils";

export default function HomeLayout({ children }) {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    biografia: "",
    fotoPerfil: "",
    ubicacion: "",
    habilidad: [],
    interes: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    general: {
      error: false,
      message: "Error al cargar los datos del usuario. Por favor, vuelva a iniciar sesión.",
    },
  });

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const userId = Cookies.get("userId");
      setLoading(true);

      if (userId) {
        const response = await api.get(`/users/profile/${userId}`);
        if (response.status === 200) {
          Cookies.set("nombre", response.data.nombre);
          Cookies.set("apellido", response.data.apellido);
          Cookies.set("fotoPerfil", response.data.fotoPerfil);
          setUserData(response.data);
        }
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: {
          error: true,
          message: "Error al cargar los datos del usuario. Por favor, vuelva a iniciar sesión.",
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  // Feth de user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <html lang="es">
      <head>
        <title>Trivo | Home</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body className="flex flex-col w-full h-full relative">
        {loading && <Loader />}
        {errors.general.error && <Modal message={errors.general.message} redirectTo="/auth/login" type="error" logout={true} />}
        <TopBar userData={userData} />
        <div className="horizontal-container relative flex flex-row justify-between w-full h-full">
          <Menu />

          <main className="flex justify-center w-full items-center h-[calc(100vh-5rem)] relative bg-bg-secondary">{children}</main>
          <div className="bg-logo">
            <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute top-0 right-0 w-60 h-60 opacity-20" />
          </div>
          <div className="bg-logo">
            <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute bottom-0 -left-10 w-60 h-60 opacity-20" />
          </div>
          <Chat />
        </div>
      </body>
    </html>
  );
}
