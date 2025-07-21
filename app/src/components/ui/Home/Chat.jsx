"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import ChatWindow from "./ChatWindow";
import { createSignalRConnection } from "@/lib/signalr";
import Cookie from "js-cookie";
import SimpleLoader from "../SimpleLoader";
import { set } from "zod/v4";

export default function Chat() {
  const userId = Cookie.get("userId");
  const hub = "http://localhost:5026/hubs/chat";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const toggleChatModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsChatOpen(false);
    setSelectedChatId(null);
  };

  const openChatWindow = (chatId) => {
    setSelectedChatId(chatId);
    setIsChatOpen(true);
  };

  const mockData = [
    {
      id: 1,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 2,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 3,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 4,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 5,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 6,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 7,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
    {
      id: 8,
      name: "Misael Gomez",
      lastMessage: "Hola, ¿cómo estás?",
      time: "10:04 PM",
      avatar: "/imagenes/user.jpg",
    },
  ];

  useEffect(() => {
    if (!userId) {
      console.error("El ID de usuario no está disponible");
      return;
    }

    setIsLoading(true);
    console.log("🔗 Conectando al hub de chats...");

    const connection = createSignalRConnection(userId, hub);

    connection.start().then(async () => {
      console.log("✅ Conectado al hub de chats");

      // Listen for chats received
      connection.on("RecibirChats", (chats) => {
        console.log("📦 Lista de chats recibida:", chats);
        setTotalItems(chats.totalElementos);
        setTotalPages(chats.totalPaginas);
        setCurrentPage(chats.paginaActual);
        setChats(chats.elementos);
        setIsLoading(false);
      });

      connection.on("RecibirMensajesDelChat", (chatId, mensajes) => {
        console.log(`📨 Mensajes del chat ${chatId}:`, mensajes);
      });

      connection.on("RecibirMensajePrivado", (mensaje) => {
        console.log("📬 Mensaje privado recibido:", mensaje);
      });

      try {
        // Fetch initial chats
        await connection.invoke("ObtenerChatsUsuario", currentPage, pageSize);
      } catch (error) {
        console.error("Error al obtener chats:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    });

    // Limpieza al desmontar
    return () => {
      connection.stop();
    };
  }, []);

  return (
    <>
      <div
        className={`chat-container shadow-2xl bg-white ease-in-out duration-400 w-240 h-[calc(100vh-5rem)] flex flex-col overflow-y-scroll hide-scrollbar z-40 ${
          isModalOpen ? "absolute top-0 right-0 max-w-240 flex flex-row" : "max-w-15 w-15 ease-in-out duration-400"
        }`}
      >
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <>
            <div className={`chats-bar hide-scrollbar overflow-y-scroll h-full relative ${isModalOpen ? "h-24 w-1/2 border-r border-gray-200" : ""}`}>
              <div className={`header flex flex-row justify-start items-center gap-4 ${isModalOpen ? "p-5 border-b border-gray-200" : ""}`}>
                <button
                  className={`cursor-pointer flex gap-4 hover:bg-bg-secondary   ${
                    isModalOpen ? "justify-start max-w-15 rounded-lg" : "border-l-5 border-transparent hover:border-primary transition-all justify-center"
                  } items-center w-full h-16 px-4`}
                  onClick={toggleChatModal}
                  aria-label="Toggle Chat"
                  title="Abrir/Cerrar Chat"
                >
                  <div className="icon">
                    <svg className="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer_1" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M19.5,2H4.5C2.019,2,0,4.019,0,6.5v11c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V6.5c0-2.481-2.019-4.5-4.5-4.5ZM1,17.5V6.5c0-1.93,1.57-3.5,3.5-3.5h3.5V21h-3.5c-1.93,0-3.5-1.57-3.5-3.5Zm22,0c0,1.93-1.57,3.5-3.5,3.5H9V3h10.5c1.93,0,3.5,1.57,3.5,3.5v11ZM6,10.5c0,.276-.224,.5-.5,.5H3.5c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h2c.276,0,.5,.224,.5,.5Zm0,4c0,.276-.224,.5-.5,.5H3.5c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h2c.276,0,.5,.224,.5,.5ZM3,6.5c0-.276,.224-.5,.5-.5h2c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5H3.5c-.276,0-.5-.224-.5-.5Z" />
                    </svg>
                  </div>
                </button>
                {isModalOpen && <span className="text-primary font-medium text-2xl">Mensajes</span>}
              </div>
              <div className="chats flex flex-col gap-1 overflow-hidden">
                {isLoading ? (
                  <SimpleLoader />
                ) : totalItems === 0 ? (
                  <div className="nochats-message gap-2 flex flex-col justify-center items-center w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  absolute">
                    <svg className="size-8 fill-gray-400" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                      <path d="m20.414,19h1.723l-.137-14c0-1.654-1.346-3-3-3H5c-.451,0-.892.102-1.293.293L1.457.043.043,1.457l22.5,22.5,1.414-1.414-3.543-3.543Zm-1.414-15c.552,0,1,.448,1,1.01l.117,11.99h-1.617v.086L5.414,4h13.586Zm-4.972,14.27l1.42,1.42-2.267,1.874c-.327.292-.747.439-1.172.439-.433,0-.869-.153-1.218-.463l-3.016-2.54H2V6.242l2,2v8.758h4.506l3.495,2.945,2.027-1.676Z" />
                    </svg>
                    <span className={`text-gray-400 px-10 text-center ${isModalOpen ? "block" : "hidden"}`}>Aún no tienes ninguna conversación.</span>
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button key={chat.id} type="button" onClick={() => openChatWindow(chat.id)}>
                      <div
                        className={`chat-item py-2 cursor-pointer transition-all border-l-5 border-transparent ${
                          isModalOpen
                            ? "flex justify-start items-center hover:bg-bg-secondary hover:border-l-primary gap-4 px-4 py-4 w-full"
                            : "flex justify-center items-center hover:bg-bg-secondary hover:border-primary"
                        }`}
                      >
                        <div className="user-picture">
                          <div className="user-picture-frame rounded-full overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-200">
                            <Image className="object-cover w-full h-full" src={chat.avatar} width={50} height={50} alt="user-avatar" />
                          </div>
                        </div>
                        <div className={`description flex-col justify-center items-start w-full ${isModalOpen ? "flex" : "hidden"}`}>
                          <div className="name-time w-full flex flex-row justify-between items-center">
                            <span className="user-name font-medium">{chat.name}</span>
                            <span className="last-message-time text-gray-500 text-sm">{chat.time}</span>
                          </div>
                          <div className="last-message">
                            <span className="text-gray-500 text-sm">{chat.lastMessage}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
            {isChatOpen && isModalOpen ? (
              <ChatWindow chatId={selectedChatId} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
            ) : (
              <div className={`empty-chat justify-center items-center w-full h-full ${isModalOpen ? "flex flex-col" : "hidden"}`}>
                <span className="text-gray-500 text-sm">Selecciona un chat para comenzar a chatear.</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
