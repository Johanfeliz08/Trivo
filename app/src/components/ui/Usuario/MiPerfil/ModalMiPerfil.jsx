"use client";

import ProfileBanner from "@/components/ui/Usuario/MiPerfil/ProfileBanner";
import AboutMe from "@/components/ui/Usuario/MiPerfil/AboutMe";
import Skills from "@/components/ui/Usuario/MiPerfil/Skills";
import Interests from "@/components/ui/Usuario/MiPerfil/Interests";

export default function ModalMiPerfil({ userId, isPerfilModalOpen, setIsPerfilModalOpen }) {
  return (
    <>
      <div className={`modalMiPerfil w-full h-full xl:p-10 z-100 absolute ${isPerfilModalOpen ? "modalPerfilOpen" : ""} transition-opacity duration-300 ease-in-out`}>
        <div className="miperfil bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title">
              <h1 className="text-3xl font-semibold text-primary">Perfil</h1>
            </div>
            <div className="close-btn">
              <button type="button" className="cursor-pointer" onClick={() => setIsPerfilModalOpen(false)}>
                <div className="icon cursor-pointer">
                  <svg className="size-10 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="content w-full h-full flex flex-col items-start justify-start px-20 py-10 overflow-scroll hide-scrollbar">
            <ProfileBanner userIdProp={userId} />
            <div className="details grid grid-cols-2 gap-4 w-full">
              <AboutMe userIdProp={userId} />
              <Skills userIdProp={userId} />
              <Interests userIdProp={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
