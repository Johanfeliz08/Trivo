"use client";

import { useState } from "react";
import GeneralSettings from "@/components/ui/Configuracion/GeneralSettings";
import ChangePassword from "@/components/ui/Configuracion/ChangePassword";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      <title>Trivo | Configuración</title>
      <div className="settings-container w-full h-full xl:p-10 z-5">
        <div className="settings bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title">
              <h1 className="text-3xl font-semibold text-primary">Configuración</h1>
            </div>
            <button type="button" className="close-btn">
              <div className="icon cursor-pointer">
                <svg className="size-10 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18,6a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,7.414,18L12,13.414,16.586,18A1,1,0,0,0,18,16.586L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </div>
            </button>
          </div>
          <div className="content w-full h-full flex flex-row items-start justify-start overflow-scroll hide-scrollbar">
            <div className="menu border-r border-gray-200 w-1/4 h-full overflow-scroll hide-scrollbar">
              <nav className="settings-nav w-full h-full">
                <ul className="flex flex-col p-8 gap-4">
                  <li>
                    <button type="button" className="text-gray-400 font-light hover:text-primary transition-all cursor-pointer" onClick={() => setActiveTab("general")}>
                      General
                    </button>
                  </li>
                  <li>
                    <button type="button" className="text-gray-400 font-light hover:text-primary transition-all cursor-pointer" onClick={() => setActiveTab("changePassword")}>
                      Cambiar Contraseña
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="settings-detail">{activeTab === "general" && <GeneralSettings />}</div>
            <div className="settings-detail">{activeTab === "changePassword" && <ChangePassword />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
