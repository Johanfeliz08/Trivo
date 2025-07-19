import { useState } from "react";
import Image from "next/image";
import ChatWindow from "./ChatWindow"; // Assuming ChatWindow is in the same directory

export default function Chat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const toggleChatModal = () => {
    setIsModalOpen(!isModalOpen);
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

  return (
    <>
      <div
        className={`chat-container shadow-2xl bg-white ease-in-out duration-400 w-240 h-[calc(100vh-5rem)] flex flex-col overflow-y-scroll hide-scrollbar z-40 ${
          isModalOpen ? "absolute top-0 right-0 max-w-240 flex flex-row" : "max-w-15 w-15 ease-in-out duration-400"
        }`}
      >
        <div className={`chats-bar hide-scrollbar overflow-y-scroll h-full ${isModalOpen ? "h-24 w-1/2 border-r border-gray-200" : ""}`}>
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
          <div className="chats flex flex-col gap-1">
            {mockData.map((chat) => {
              return (
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
              );
            })}
          </div>
        </div>
        {isChatOpen ? (
          <ChatWindow chatId={selectedChatId} />
        ) : (
          <div className={`empty-chat justify-center items-center w-full h-full ${isModalOpen ? "flex flex-col" : "hidden"}`}>
            <span className="text-gray-500 text-sm">Selecciona un chat para comenzar a chatear.</span>
          </div>
        )}
      </div>
    </>
  );
}
