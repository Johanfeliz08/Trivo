import { useState } from "react";
import * as z from "zod/v4";
import api from "@/lib/api/api";
import Cookie from "js-cookie";
import Image from "next/image";

export default function MessageBar({ chat }) {
  const [message, setMessage] = useState({
    message: "",
    file: null,
    image: null,
  });

  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const messageSchema = z
    .object({
      message: z.string().optional(),
      file: z.instanceof(File).optional().or(z.literal(null)),
      image: z.instanceof(File).optional().or(z.literal(null)),
    })
    .refine((data) => (data.message && data.message.trim().length > 0) || data.file instanceof File || data.image instanceof File, {
      message: "Debes escribir un mensaje o subir un archivo.",
    });

  const handleFileChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      file: e.target.files[0],
      image: null, // Reset image if file is selected
    }));
  };

  const handleImageChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      image: e.target.files[0],
      file: null, // Reset file if image is selected
    }));
  };

  const handleMessageChange = (message) => {
    setMessage((prev) => ({
      ...prev,
      message: message,
    }));
  };

  const isMessageValid = () => {
    const result = messageSchema.safeParse(message);
    return result.success;
  };

  const sendFile = async (chatId, emisorId, receptorId, file) => {
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("emisorId", emisorId);
    formData.append("receptorId", receptorId);
    formData.append("archivo", file);

    try {
      const response = await api.post(`/messages/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage((prevMessage) => ({
          ...prevMessage,
          file: null,
        }));
        console.log("Archivo enviado exitosamente:", response.data);
      } else {
        console.error("Error al enviar el archivo:", response);
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
    }
  };

  const sendImage = async (chatId, emisorId, receptorId, image) => {
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("emisorId", emisorId);
    formData.append("receptorId", receptorId);
    formData.append("imagen", image);

    try {
      const response = await api.post(`/messages/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage((prevMessage) => ({
          ...prevMessage,
          image: null,
        }));
        console.log("Imagen enviada exitosamente:", response.data);
      } else {
        console.error("Error al enviar la imagen:", response);
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  const sendMessage = async (chatId, emisorId, receptorId, contenido) => {
    try {
      const response = await api.post(`/messages`, {
        chatId,
        emisorId,
        receptorId,
        contenido,
      });

      if (response.status === 200) {
        setMessage((prevMessage) => ({
          ...prevMessage,
          message: "",
        }));
        console.log("Mensaje enviado exitosamente:", response.data);
      } else {
        console.error("Error al enviar el mensaje:", response);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleSendMessage = async () => {
    const chatId = chat.id;
    const emisorId = Cookie.get("userId");
    const receptorId = chat.participantes.find((p) => p.usuarioId !== emisorId)?.usuarioId;

    if (!isMessageValid()) {
      console.error("Mensaje no válido:", messageSchema.safeParse(message).error);
      return;
    }

    if (!chatId || !emisorId || !receptorId) {
      console.error("Faltan datos necesarios para enviar el mensaje.");
      return;
    }

    setIsMessageLoading(true);

    if (message.file) {
      await sendFile(chatId, emisorId, receptorId, message.file);
    }

    if (message.image) {
      await sendImage(chatId, emisorId, receptorId, message.image);
    }

    if (message.message) {
      await sendMessage(chatId, emisorId, receptorId, message.message);
    }

    setIsMessageLoading(false);
  };

  return (
    <div className="message-bar bg-bg-secondary flex items-center flex-col ">
      <div className="file-info-container bg-primary w-full relative">
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
        {message.image && (
          <div className="px-4 py-2 flex flex-row gap-3 justify-between items-center">
            <div className="image-preview absolute border flex justify-center overflow-hidden items-center bg-[rgba(255,255,255,0.5)] w-full h-50 -top-25 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image src={URL.createObjectURL(message.image)} alt={message.image.name} width={200} height={200} />
            </div>
            <div className="image-info">
              <span className="text-white font-bold">Imagen seleccionada: </span>
              <span className="text-white">{message.image?.name}</span>
            </div>
            <span>
              <button
                type="button"
                className="text-white hover:underline flex items-center justify-center"
                onClick={() => {
                  setMessage((prev) => ({ ...prev, image: null }));
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
            handleMessageChange(e.target.value);
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
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </label>
        </div>
        <div className="image">
          <label htmlFor="image" className="cursor-pointer flex items-center justify-center">
            <div className="icon">
              <svg className="size-6 fill-gray-500 hover:fill-primary transition-all " xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z" />
              </svg>
            </div>
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </label>
        </div>
        <div className="send-btn">
          <button type="button" className="flex items-center justify-center fill-primary disabled:fill-gray-500" onClick={() => handleSendMessage()} disabled={!isMessageValid()}>
            <div className="icon">
              <svg className="size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
