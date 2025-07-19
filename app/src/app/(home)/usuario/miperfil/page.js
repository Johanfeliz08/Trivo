"use client";

import ProfileBanner from "@/components/ui/Usuario/MiPerfil/ProfileBanner";
import AboutMe from "@/components/ui/Usuario/MiPerfil/AboutMe";
import Skills from "@/components/ui/Usuario/MiPerfil/Skills";
import Interests from "@/components/ui/Usuario/MiPerfil/Interests";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import Loader from "@/components/ui/Loader";
// import api from "@/lib/api/api";
// import Modal from "@/components/ui/Modal";

export default function MiPerfilPage() {
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({
  //   general: {
  //     error: false,
  //     message: "Error al cargar sus datos. Por favor, intente nuevamente.",
  //   },
  // });

  // const fetchUserData = async () => {
  //   try {
  //     setLoading(true);
  //     const userId = Cookies.get("userId");
  //     if (userId) {
  //       const response = await api.get(`/users/profile/${userId}`);
  //       if (response.status === 200) {
  //         setUserData(response.data);
  //       }
  //     }
  //   } catch (error) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       general: {
  //         error: true,
  //         message: "Error al cargar sus datos. Por favor, intente nuevamente.",
  //       },
  //     }));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fetch user data when the component mounts
  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  return (
    <>
      <div className="MiPerfil-container w-full h-full xl:p-10 z-5">
        <div className="miperfil bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title">
              <h1 className="text-3xl font-semibold text-primary">Mi Perfil</h1>
            </div>
            <button type="button" className="close-btn" onClick={() => window.history.back()}>
              <div className="icon cursor-pointer">
                <svg className="size-10 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18,6a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,7.414,18L12,13.414,16.586,18A1,1,0,0,0,18,16.586L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </div>
            </button>
          </div>
          <div className="content w-full h-full flex flex-col items-start justify-start px-20 py-10 overflow-scroll hide-scrollbar">
            <ProfileBanner />
            <div className="details grid grid-cols-2 gap-4 w-full">
              <AboutMe />
              <Skills />
              <Interests />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
