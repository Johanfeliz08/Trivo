"use client";

import "../styles/globals.css";
import Menu from "./menu";
import TopBar from "./topBar";
import Chat from "./chat";

export default function HomeLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex justify-center items-center w-screen h-screen px-32 py-12">
        <TopBar />
        <div className="horizontal-container">
          <Menu />
          <main>{children}</main>
          <Chat />
        </div>
      </body>
    </html>
  );
}
