"use client";

import "../styles/globals.css";
import Menu from "../../components/ui/home/menu";
import TopBar from "../../components/ui/home/topBar";
import Chat from "../../components/ui/home/chat";

export default function HomeLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col w-full h-full">
        <TopBar />
        <div className="horizontal-container relative flex flex-row justify-between w-full h-full">
          <Menu />
          <main className="flex justify-center items-center h-[calc(100vh-5rem)]">{children}</main>
          <Chat />
        </div>
      </body>
    </html>
  );
}
