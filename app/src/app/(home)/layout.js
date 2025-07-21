"use client";

import "../styles/globals.css";
import Menu from "@/components/ui/Home/Menu";
import TopBar from "@/components/ui/Home/TopBar";
import Chat from "@/components/ui/Home/Chat";
import Image from "next/image";

export default function HomeLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Trivo | Home</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body className="flex flex-col w-full h-full relative">
        <TopBar />
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
