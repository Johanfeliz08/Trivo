import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { createSignalRConnection } from "@/lib/signalr";
import SimpleLoader from "@/components/ui/SimpleLoader";
import ChatMessageBar from "@/components/ui/Home/Chat/ChatMessageBar";
import { isValidURL } from "@/lib/utils";

export default function ChatWindow({ chat, setChats }) {
  const userId = Cookie.get("userId");
  const hub = "http://localhost:5026/hubs/chat";
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState(null);

  const messagesContainerRef = useRef(null);

  const getTimeFromDate = (dateRaw) => {
    const date = new Date(dateRaw);
    const time = date.toLocaleTimeString("es-DO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return time;
  };

  const sortMessagesByTime = (messages) => {
    return messages.sort((a, b) => new Date(a.fechaEnvio) - new Date(b.fechaEnvio));
  };

  const orderChatsByDate = (chats) => {
    return chats.sort((a, b) => new Date(b.fechaEnvio) - new Date(a.fechaEnvio)).reverse();
  };

  const getFileName = (url) => {
    const match = url.match(/\/([^\/?#]+)$/);
    const fileName = match ? match[1] : null;
    return fileName;
  };

  const makeFileDownload = (url) => {
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  useEffect(() => {
    if (!connection) {
      return;
    }

    connection.on("RecibirMensajesDelChat", (chatId, messages) => {
      // console.log(`📨 Mensajes del chat ${chatId}:`, messages);
      setMessages(sortMessagesByTime(messages));
      setIsLoading(false);
    });

    connection.on("RecibirMensajePrivado", (mensaje) => {
      // console.log("📬 Mensaje privado recibido:", mensaje);
      setMessages((prevMessages) => {
        const existe = prevMessages.some((m) => m.mensajeId === mensaje.mensajeId);
        if (existe) return prevMessages;
        return [...prevMessages, mensaje];
      });
    });

    // connection.on("RecibirChats", (chats) => {
    //   setChats(chats);
    // });
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
    setMessages([]);
    console.log("🔗 Conectando al hub de mensajes...");

    const initConnection = async () => {
      try {
        connection = createSignalRConnection(userId, hub);
        connection.start().then(async () => {
          console.log("✅ Conectado al hub de mensajes");
          setConnection(connection);
          await connection.invoke("ObtenerMensajesChat", chat.id, 1, 100);
        });
      } catch (error) {
        console.error("❌ Error al conectar al hub de mensajes:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    initConnection();

    return () => {
      if (connection && connection.state === "Connected") {
        connection.stop();
      }
    };
  }, [chat]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={`chat flex flex-col w-full`}>
        <div className="header flex flex-row justify-start items-center gap-4 p-5 border-b border-gray-200 w-full h-26">
          <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-15 h-15 bg-gray-200">
            <Image
              className="object-cover w-full h-full"
              src={chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.fotoPerfil || "/imagenes/userDefault.png"}
              width={50}
              height={50}
              alt="user-avatar"
            />
          </div>
          <div className="chat-name">
            <span className="text-primary font-medium text-2xl">{chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.nombreCompleto}</span>
          </div>
        </div>
        <div className="messages-container w-full h-full py-10 bg-bg-secondary overflow-scroll hide-scrollbar scroll-smooth" ref={messagesContainerRef}>
          <div className="messages w-full  flex flex-col justify-start items-center gap-15 relative">
            {isLoading ? (
              <SimpleLoader />
            ) : messages.length > 0 ? (
              messages.map((message) => {
                return message.emisorId === userId ? (
                  <div className={`message currentUser flex flex-row-reverse justify-start items-start gap-4 relative 2xl:translate-x-40`} key={message.mensajeId}>
                    <div className="user-profile">
                      <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-200">
                        <Image
                          className="object-cover w-full h-full"
                          src={chat.participantes.filter((p) => p.usuarioId === userId)[0]?.fotoPerfil || "/imagenes/userDefault.png"}
                          width={50}
                          height={50}
                          alt="user-avatar"
                        />
                      </div>
                    </div>
                    <div className="content">
                      <div className="message-header flex flex-row-reverse justify-start items-center gap-4 w-auto">
                        <div className="user-name">
                          <span className="font-semibold text-md">Tu</span>
                        </div>
                        <div className="time">
                          <span className="text-gray-500 text-sm">{getTimeFromDate(message.fechaEnvio)}</span>
                        </div>
                      </div>
                      <div className="text-white bg-primary py-4 px-6 rounded-b-lg rounded-tl-lg shadow-md mt-2">
                        {message.tipoMensaje === "Imagen" && (
                          <div className="image-container mt-2">
                            <Image src={message.contenido} alt="image" width={200} height={200} />
                          </div>
                        )}
                        {message.tipoMensaje === "Archivo" && (
                          <div className="file flex flex-row justify-start items-center gap-3">
                            <div className="icon">
                              <svg className="size-4 fill-white" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.201 511.201" width="100" height="100">
                                <g>
                                  <path d="M496.108,203.908c-8.331-8.328-21.835-8.328-30.165,0L233.58,437.274c-41.656,41.661-109.197,41.666-150.859,0.011   s-41.666-109.197-0.011-150.859L307.756,60.463c25.193-24.792,65.715-24.467,90.507,0.726c24.507,24.904,24.512,64.86,0.011,89.77   L173.228,376.922c-8.433,8.078-21.733,8.078-30.165,0c-8.328-8.331-8.328-21.835,0-30.165l200.363-201.28   c8.185-8.475,7.951-21.98-0.524-30.165c-8.267-7.985-21.374-7.985-29.641,0l-200.363,201.28   c-24.996,24.991-24.999,65.514-0.008,90.51c0.003,0.003,0.005,0.005,0.008,0.008c25.331,24.172,65.186,24.172,90.517,0   l225.024-225.984c41.122-42.183,40.261-109.715-1.922-150.837C385.087-10.1,319.014-10.095,277.591,30.298L52.545,256.26   c-58.321,58.321-58.321,152.879,0,211.2s152.879,58.321,211.2,0l232.363-233.301c8.353-8.309,8.39-21.816,0.081-30.17   C496.162,203.962,496.135,203.935,496.108,203.908z" />
                                </g>
                              </svg>
                            </div>
                            <a href={`${message.contenido}`} target="_blank" className="text-white hover:underline">
                              <span className="text-sm">{getFileName(message.contenido)}</span>
                            </a>
                            <a href={`${makeFileDownload(message.contenido)}`} className="">
                              <svg
                                className="size-4 fill-white cursor-pointer hover:fill-gray-400 transition-all"
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"
                              >
                                <path d="M9.878,18.122a3,3,0,0,0,4.244,0l3.211-3.211A1,1,0,0,0,15.919,13.5l-2.926,2.927L13,1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1l-.009,15.408L8.081,13.5a1,1,0,0,0-1.414,1.415Z" />
                                <path d="M23,16h0a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V17a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v4a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V17A1,1,0,0,0,23,16Z" />
                              </svg>
                            </a>
                          </div>
                        )}
                        {message.tipoMensaje === "Texto" && <p className="">{message.contenido}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`message externalUser flex flex-row justify-start items-start gap-4 relative 2xl:-translate-x-40`} key={message.mensajeId}>
                    <div className="user-profile">
                      <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-200">
                        <Image
                          className="object-cover w-full h-full"
                          src={chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.fotoPerfil || "/imagenes/userDefault.png"}
                          width={50}
                          height={50}
                          alt="user-avatar"
                        />
                      </div>
                    </div>
                    <div className="content">
                      <div className="message-header flex flex-row justify-start items-center gap-4 w-auto">
                        <div className="user-name">
                          <span className="font-semibold text-md">{chat.participantes.filter((p) => p.usuarioId !== userId)[0]?.nombreCompleto}</span>
                        </div>
                        <div className="time">
                          <span className="text-gray-500 text-sm">{getTimeFromDate(message.fechaEnvio)}</span>
                        </div>
                      </div>
                      <div className="text bg-white py-4 px-6 rounded-b-lg rounded-tr-lg shadow-md mt-2">
                        {message.tipoMensaje === "Imagen" && (
                          <div className="image-container mt-2">
                            <Image src={message.contenido} alt="image" width={200} height={200} />
                          </div>
                        )}
                        {message.tipoMensaje === "Archivo" && (
                          <div className="file flex flex-row justify-start items-center gap-3">
                            <div className="icon">
                              <svg className="size-4 fill-black" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.201 511.201" width="100" height="100">
                                <g>
                                  <path d="M496.108,203.908c-8.331-8.328-21.835-8.328-30.165,0L233.58,437.274c-41.656,41.661-109.197,41.666-150.859,0.011   s-41.666-109.197-0.011-150.859L307.756,60.463c25.193-24.792,65.715-24.467,90.507,0.726c24.507,24.904,24.512,64.86,0.011,89.77   L173.228,376.922c-8.433,8.078-21.733,8.078-30.165,0c-8.328-8.331-8.328-21.835,0-30.165l200.363-201.28   c8.185-8.475,7.951-21.98-0.524-30.165c-8.267-7.985-21.374-7.985-29.641,0l-200.363,201.28   c-24.996,24.991-24.999,65.514-0.008,90.51c0.003,0.003,0.005,0.005,0.008,0.008c25.331,24.172,65.186,24.172,90.517,0   l225.024-225.984c41.122-42.183,40.261-109.715-1.922-150.837C385.087-10.1,319.014-10.095,277.591,30.298L52.545,256.26   c-58.321,58.321-58.321,152.879,0,211.2s152.879,58.321,211.2,0l232.363-233.301c8.353-8.309,8.39-21.816,0.081-30.17   C496.162,203.962,496.135,203.935,496.108,203.908z" />
                                </g>
                              </svg>
                            </div>
                            <a href={`${message.contenido}`} target="_blank" className="text-black hover:underline">
                              <span className="text-sm">{getFileName(message.contenido)}</span>
                            </a>
                            <a href={`${makeFileDownload(message.contenido)}`} className="">
                              <svg
                                className="size-4 fill-black cursor-pointer hover:fill-gray-400 transition-all"
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"
                              >
                                <path d="M9.878,18.122a3,3,0,0,0,4.244,0l3.211-3.211A1,1,0,0,0,15.919,13.5l-2.926,2.927L13,1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1l-.009,15.408L8.081,13.5a1,1,0,0,0-1.414,1.415Z" />
                                <path d="M23,16h0a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V17a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v4a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V17A1,1,0,0,0,23,16Z" />
                              </svg>
                            </a>
                          </div>
                        )}
                        {message.tipoMensaje === "Texto" && <p className="">{message.contenido}</p>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <span className="text-gray-500 text-sm">No hay mensajes en este chat.</span>
              </>
            )}
          </div>
        </div>
        {/* <div className="message-bar bg-bg-secondary flex items-center flex-col">
          <div className="file-info-container bg-primary w-full">
            {message.file && (
              <div className="px-4 py-2 flex flex-row gap-3 justify-between items-center">
                <div className="file-info">
                  <span className="text-white font-bold">Archivo seleccionado: </span>
                  <span className="text-white">{message.file?.name}</span>
                </div>
                <span>
                  <button
                    type="button"
                    className="text-white hover:underline flex items-center justify-center"
                    onClick={() => {
                      setMessage((prev) => ({ ...prev, file: null }));
                    }}
                  >
                    <div className="icon flex items-center justify-center">
                      <svg
                        className="size-5 fill-white opacity-65 hover:opacity-100 transition-all cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="512"
                        height="512"
                      >
                        <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                        <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                        <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                      </svg>
                    </div>
                  </button>
                </span>
              </div>
            )}
          </div>
          <div className="bar-container bg-white w-full flex flex-row justify-between items-center gap-5 px-4 py-2">
            <input
              type="text"
              placeholder="Escribir un mensaje nuevo."
              id="message"
              name="message"
              className="w-full py-5 px-3 outline-none"
              value={message.message}
              onChange={(e) => {
                handleMessage(e.target.value);
              }}
            />
            <div className="attachment">
              <label htmlFor="file" className="cursor-pointer flex items-center justify-center">
                <div className="icon">
                  <svg
                    className="size-6 fill-gray-500 hover:fill-primary transition-all"
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
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </label>
            </div>
            <div className="send-btn">
              <button type="button" className="flex items-center justify-center fill-primary disabled:fill-gray-500" disabled={!isMessageValid()}>
                <div className="icon">
                  <svg className="size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div> */}
        <ChatMessageBar chat={chat} />
      </div>
    </>
  );
}
