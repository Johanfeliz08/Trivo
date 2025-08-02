"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import Cookies from "js-cookie";
import api from "@/lib/api/api";
import SimpleLoader from "../../SimpleLoader";

export default function ProfileBanner({ userIdProp }) {
  const userId = userIdProp ? userIdProp : Cookies.get("userId");
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    posicion: "",
    estado: "",
    ubicacion: "",
    fotoPerfil: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [errors, setErrors] = useState({
    general: {
      error: false,
      message: "Error al cargar sus datos. Por favor, intente nuevamente.",
    },
  });

  const hasEditPermission = userIdProp === Cookies.get("userId") ? true : false;

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      if (userId) {
        const response = await api.get(`/users/profile/${userId}`);
        if (response.status === 200) {
          setUserData(response.data);
        }
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: {
          error: true,
          message: "Error al cargar sus datos. Por favor, intente nuevamente.",
        },
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {openUploadImage && <UploadImage setOpenUploadImage={setOpenUploadImage} />}
      <title>Trivo | Mi Perfil</title>
      <div className="profile-header w-full">
        {isLoading && <SimpleLoader />}
        <div className="banner w-full xl:h-50 2xl:h-70 bg-gradient-to-r from-[#472187] to-[#7C3AED] flex items-center justify-center rounded-2xl">
          <div className="logo">
            <Image src={"/logos/isotipo_w.png"} width={800} height={800} alt="Trivo Isotipo" className="2xl:size-60 xl:size-40 opacity-20" />
          </div>
        </div>
        <div className="user-info">
          <div className="user-profile-container flex flex-row relative">
            <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-30 h-30 bg-gray-200 relative -top-20 left-10">
              <Image
                src={userData.fotoPerfil != "" && userData.fotoPerfil !== null ? userData.fotoPerfil : "/imagenes/userDefault.png"}
                width={850}
                height={850}
                alt="user-avatar"
                className="object-cover"
              />
            </div>
            <div className={`edit-btn flex justify-center items-center relative z-50 bottom-10 -right-8`}>
              <button type="button" className="flex flex-row justify-center items-center" onClick={() => setOpenUploadImage(!openUploadImage)}>
                <div className="icon flex justify-center items-center hover:bg-bg-secondary hover:rounded-full p-2 cursor-pointer transition-all ease-in-out duration-300">
                  <svg className="size-5 fill-primary " xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="M22.994,5.195c-.011-.067-.277-1.662-1.378-2.774-1.111-1.09-2.712-1.355-2.779-1.366-.119-.021-.239,.005-.342,.068-.122,.075-3.047,1.913-9.049,7.886C3.12,15.305,1.482,17.791,1.415,17.894c-.045,.07-.073,.15-.079,.233l-.334,4.285c-.011,.146,.042,.289,.145,.393,.094,.094,.221,.146,.354,.146,.013,0,.026,0,.039-.001l4.306-.333c.083-.006,.162-.033,.232-.078,.103-.066,2.6-1.697,8.924-7.991,6.002-5.974,7.848-8.886,7.923-9.007,.064-.103,.089-.225,.07-.344ZM14.295,13.838c-5.54,5.514-8.14,7.427-8.661,7.792l-3.59,.278,.278-3.569c.368-.521,2.292-3.109,7.828-8.619,1.773-1.764,3.278-3.166,4.518-4.264,.484,.112,1.721,.468,2.595,1.326,.868,.851,1.23,2.046,1.346,2.526-1.108,1.24-2.525,2.75-4.314,4.531Zm5.095-5.419c-.236-.681-.669-1.608-1.427-2.352-.757-.742-1.703-1.166-2.396-1.397,1.807-1.549,2.902-2.326,3.292-2.59,.396,.092,1.362,.375,2.05,1.049,.675,.682,.963,1.645,1.058,2.042-.265,.388-1.039,1.469-2.577,3.247Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="user-details relative -top-18 left-10">
            <h2 className="text-xl font-semibold">
              {userData.nombre} {userData.apellido}
            </h2>
            <h3 className="text-md font-regular">
              {userData.posicion ? userData.posicion : "Sin profesión"} {userData.nombreEmpresa ? ` en ${userData.nombreEmpresa}` : ""}
            </h3>
            <p className="flex flex-row gap-2 text-gray-500">
              {/* Recordar volver a poner "Sin estado como condicion else, en este momento esta propiedad no llega el frontend" */}
              <span className="status">{userData.estado ? userData.estado : "Disponible"}</span>
              <span>-</span>
              <span className="location">{userData.ubicacion ? userData.ubicacion : "Sin ubicación"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
