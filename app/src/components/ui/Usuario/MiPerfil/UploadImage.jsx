import { useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api/api";
import SimpleLoader from "../../SimpleLoader";

export default function UploadImage({ setOpenUploadImage }) {
  const userId = Cookies.get("userId");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    general: {
      error: false,
      message: "Ha ocurrido un error al subir la imagen. Por favor, intente nuevamente.",
    },
  });

  const handleUpdateImage = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrors({ general: { error: false } });
    const formData = new FormData();
    formData.append("FotoPerfil", selectedFile);

    try {
      const response = await api.put(`/users/${userId}/profile-photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setOpenUploadImage(false);
        window.location.reload(); // Reload to reflect changes
      } else {
        console.error("Ha ocurrido un errror:", response.data);
        setErrors({ ...errors, general: { error: true } });
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      setErrors({ ...errors, general: { error: true } });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  const isInputValid = selectedFile ? true : false;

  return (
    <>
      <div className="modal-container border-dashed border-2 border-primary overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col justify-center items-center bg-[rgba(238,235,255,.9)] w-120 h-120 rounded-2xl">
        {isLoading && <SimpleLoader />}
        <button type="button" className="close-btn absolute top-2 right-2" onClick={() => setOpenUploadImage(false)}>
          <div className="icon cursor-pointer">
            <svg className="size-7 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18,6a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,7.414,18L12,13.414,16.586,18A1,1,0,0,0,18,16.586L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
            </svg>
          </div>
        </button>
        <div className="file-input w-full h-full flex flex-col items-center justify-center">
          <label htmlFor="file-upload" className=" p-20 flex flex-col items-center justify-center cursor-pointer gap-6">
            <div className="icon">
              <svg className="size-25 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                <path d="M18.348,7.23c-1.311-3.151-4.395-5.23-7.848-5.23C5.813,2,2,5.813,2,10.5c0,.551,.053,1.097,.157,1.633-1.347,1.032-2.157,2.646-2.157,4.367,0,3.032,2.243,5.5,5,5.5h11.5c4.136,0,7.5-3.364,7.5-7.5,0-3.467-2.344-6.436-5.652-7.27Zm-3.055,7.062l-2.293-2.293v6h-2v-6l-2.293,2.293-1.414-1.414,3.293-3.293c.779-.779,2.049-.779,2.828,0l3.293,3.293-1.414,1.414Z" />
              </svg>
            </div>
            <div className="text flex justify-center items-center flex-col gap-1 text-center">
              <p className="text-primary font-semibold">Sube tu foto de perfil</p>
              <p className="text-gray-500">Formatos permitidos: JPG, PNG</p>
              <span className="text-gray-500 text-xs">Haga click en cualquier parte para seleccionar un archivo</span>
            </div>
            {/* <span className="bg-primary text-white border-2 border-transparent rounded-2xl px-5 py-2 hover:bg-white hover:text-primary hover:border-primary transition-colors duration-500">
              Buscar Archivo
            </span> */}
            <div className="selected-file flex flex-col items-center gap-2 cursor-pointer">
              <p className="flex flex-col justify-center items-center text-sm cursor-pointer">
                <span className="cursor-pointer">Archivo seleccionado:</span>
                <span className=" text-gray-500">{selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}</span>
              </p>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                accept="image/png, image/jpeg"
                className="text-primary w-50 opacity-0 absolute"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
            <div className="save-btn">
              <button
                type="button"
                className="bg-primary cursor-pointer text-white border-2 border-transparent rounded-2xl px-5 py-2 hover:bg-white hover:text-primary hover:border-primary transition-colors duration-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-500"
                onClick={handleUpdateImage}
                disabled={!isInputValid}
              >
                Guardar Cambios
              </button>
            </div>
            {errors.general.error && <div className="error-message text-red-500 text-sm mt-2">{errors.general.message}</div>}
          </label>
        </div>
      </div>
    </>
  );
}
