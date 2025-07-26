"use client";

import "@/app/styles/globals.css";
import AdminMenu from "@/components/ui/Admin/AdminMenu";
import Image from "next/image";

export default function AdminDashboardLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Trivo | Admin Dashboard</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body className="flex flex-col w-screen h-screen relative">
        <div className="horizontal-container relative flex flex-row justify-between w-screen h-screen">
          <AdminMenu />
          <main className="flex justify-center w-full items-center h-full relative bg-bg-secondary overflow-scroll hide-scrollbar">{children}</main>
          <div className="bg-logo">
            <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute top-0 right-0 w-60 h-60 opacity-20" />
          </div>
          <div className="bg-logo">
            <Image src="/logos/isotipo_pc.png" alt="Trivo Isotipo" width={800} height={800} className="absolute bottom-0 -left-10 w-60 h-60 opacity-20" />
          </div>
        </div>
      </body>
    </html>
  );
}
