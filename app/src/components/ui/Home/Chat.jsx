"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import ChatWindow from "./ChatWindow";
import { createSignalRConnection } from "@/lib/signalr";
import Cookie from "js-cookie";
import SimpleLoader from "../SimpleLoader";
import { isValidURL } from "@/lib/utils";

export default function Chat() {
  const userId = Cookie.get("userId");
  const hub = "http://localhost:5026/hubs/chat";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [connection, setConnection] = useState(null);

  const toggleChatModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsChatOpen(false);
    setSelectedChat(null);
  };

  const getTimeFromDate = (dateRaw) => {
    const date = new Date(dateRaw);
    const time = date.toLocaleTimeString("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return time;
  };

  useEffect(() => {
    if (!connection) {
      // console.error("La conexión SignalR no está disponible", connection);
      return;
    }

    connection.on("RecibirChats", (chats) => {
      // console.log("📦 Lista de chats recibida:", chats);
      setTotalItems(chats.length);
      setChats(chats);
      setIsLoading(false);
    });

    connection.on("RecibirNuevoChat", (chat) => {
      // console.log("Nuevo chat recibido:", chat);
      setChats((prevChats) => {
        const existe = prevChats.some((c) => c.id === chat.id);
        if (existe) return prevChats;
        return [...prevChats, chat];
      });
      setTotalItems((prevTotal) => prevTotal + 1);
    });
  }, [connection]);

  useEffect(() => {
    let connection = null;
    let isMounted = true;

    const initConnection = async () => {
      try {
        connection = createSignalRConnection(userId, hub);
        await connection.start();
        if (isMounted) {
          setConnection(connection);
          setIsLoading(false);
        } else {
          await connection.stop();
        }
      } catch (error) {
        console.error("❌ Error al conectar al hub de chats:", error);
      }
    };

    initConnection();

    return () => {
      isMounted = false;
      if (connection && connection.state === "Connected") {
        connection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("El ID de usuario no está disponible");
      return;
    }

    setIsLoading(true);
    let connection = null;
    console.log("🔗 Conectando al hub de chats...");

    const initConnection = async () => {
      try {
        connection = createSignalRConnection(userId, hub);
        connection.start().then(async () => {
          console.log("✅ Conectado al hub de chats");
          setConnection(connection);
        });
      } catch (error) {
        console.error("❌ Error al conectar al hub de chats:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    initConnection();

    // connection
    //   .start()
    //   .then(async () => {
    //     console.log("✅ Conectado al hub de chats");
    //     try {
    //       setConnection(connection);
    //       // await connection.invoke("ObtenerChats");
    //     } catch (error) {
    //       console.error("Error al conectarse al hub:", error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("❌ Error al conectar al hub:", err);
    //     setIsLoading(false);
    //   });

    return () => {
      if (connection && connection.state === "Connected") {
        connection.stop();
      }
    };
  }, []);

  const openChatWindow = (selectedChat) => {
    setSelectedChat(selectedChat);
    setIsChatOpen(true);
  };

  return (
    <>
      <div
        className={`chat-container shadow-2xl bg-white h-[calc(100vh-5rem)] flex flex-col overflow-hidden transition-[width] duration-400 ease-in-out z-40 absolute top-0 right-0 ${
          isModalOpen ? "w-[60rem] flex flex-row" : "w-[3.75rem]"
        }`}
        // className={`chat-container shadow-2xl bg-white ease-in-out duration-400 w-240 h-[calc(100vh-5rem)] flex flex-col overflow-y-scroll hide-scrollbar z-40 ${
        //   isModalOpen ? "absolute top-0 right-0 max-w-240 flex flex-row" : "max-w-15 w-15 ease-in-out duration-400"
        // }`}
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
                    <button key={chat.id} type="button" onClick={() => openChatWindow(chat)}>
                      <div
                        className={`chat-item py-2 cursor-pointer transition-all border-l-5 border-transparent ${
                          isModalOpen
                            ? "flex justify-start items-center hover:bg-bg-secondary hover:border-l-primary gap-4 px-4 py-4 w-full"
                            : "flex justify-center items-center hover:bg-bg-secondary hover:border-primary"
                        }`}
                      >
                        <div className="user-picture">
                          <div className="user-picture-frame rounded-full overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-200">
                            <Image
                              className="object-cover w-full h-full"
                              src={chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.fotoPerfil || "/imagenes/userDefault.png"}
                              width={50}
                              height={50}
                              alt="user-avatar"
                            />
                          </div>
                        </div>
                        <div className={`description flex-col justify-center items-start w-full ${isModalOpen ? "flex" : "hidden"}`}>
                          <div className="name-time w-full flex flex-row justify-between items-center">
                            <span className="user-name font-medium">{chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.nombreCompleto}</span>
                            <span className="last-message-time text-gray-500 text-sm">{chat.ultimoMensaje ? getTimeFromDate(chat.ultimoMensaje.fechaEnvio) : ""}</span>
                          </div>
                          <div className="last-message">
                            {chat.ultimoMensaje && chat.ultimoMensaje.tipoMensaje === "Imagen" && (
                              <div className="image  flex flex-row justify-start items-center gap-1">
                                <div className="icon">
                                  <svg
                                    className="size-3.5 fill-gray-500 hover:fill-primary transition-all "
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Outline"
                                    viewBox="0 0 24 24"
                                    width="512"
                                    height="512"
                                  >
                                    <path d="M19,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,19,0ZM5,2H19a3,3,0,0,1,3,3V19a2.951,2.951,0,0,1-.3,1.285l-9.163-9.163a5,5,0,0,0-7.072,0L2,14.586V5A3,3,0,0,1,5,2ZM5,22a3,3,0,0,1-3-3V17.414l4.878-4.878a3,3,0,0,1,4.244,0L20.285,21.7A2.951,2.951,0,0,1,19,22Z" />
                                    <path d="M16,10.5A3.5,3.5,0,1,0,12.5,7,3.5,3.5,0,0,0,16,10.5Zm0-5A1.5,1.5,0,1,1,14.5,7,1.5,1.5,0,0,1,16,5.5Z" />
                                  </svg>
                                </div>
                                <span className="text-gray-500 text-sm">Imagen</span>
                              </div>
                            )}
                            {chat.ultimoMensaje && chat.ultimoMensaje.tipoMensaje === "Archivo" && (
                              <div className="file flex flex-row justify-start items-center gap-1">
                                <div className="icon">
                                  <svg
                                    className="size-3.5 fill-gray-500 hover:fill-primary transition-all"
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    id="Capa_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 511.201 511.201"
                                    width="100"
                                    height="100"
                                  >
                                    <g>
                                      <path d="M496.108,203.908c-8.331-8.328-21.835-8.328-30.165,0L233.58,437.274c-41.656,41.661-109.197,41.666-150.859,0.011   s-41.666-109.197-0.011-150.859L307.756,60.463c25.193-24.792,65.715-24.467,90.507,0.726c24.507,24.904,24.512,64.86,0.011,89.77   L173.228,376.922c-8.433,8.078-21.733,8.078-30.165,0c-8.328-8.331-8.328-21.835,0-30.165l200.363-201.28   c8.185-8.475,7.951-21.98-0.524-30.165c-8.267-7.985-21.374-7.985-29.641,0l-200.363,201.28   c-24.996,24.991-24.999,65.514-0.008,90.51c0.003,0.003,0.005,0.005,0.008,0.008c25.331,24.172,65.186,24.172,90.517,0   l225.024-225.984c41.122-42.183,40.261-109.715-1.922-150.837C385.087-10.1,319.014-10.095,277.591,30.298L52.545,256.26   c-58.321,58.321-58.321,152.879,0,211.2s152.879,58.321,211.2,0l232.363-233.301c8.353-8.309,8.39-21.816,0.081-30.17   C496.162,203.962,496.135,203.935,496.108,203.908z" />
                                    </g>
                                  </svg>
                                </div>
                                <span className="text-gray-500 text-sm">Archivo</span>
                              </div>
                            )}
                            {chat.ultimoMensaje && chat.ultimoMensaje.tipoMensaje === "Texto" && <span className="text-gray-500 text-sm">{chat.ultimoMensaje.contenido}</span>}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
            {isChatOpen && isModalOpen ? (
              <ChatWindow chat={selectedChat} isChatOpen={isChatOpen} setChats={setChats} />
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
