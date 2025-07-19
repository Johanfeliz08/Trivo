export default function Loader({ message }) {
  return (
    <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] w-screen h-screen">
      <div className="spinner-container bg-bg-secondary flex flex-col justify-center items-center p-20 rounded-2xl shadow-lg">
        <div className="spinner w-13 h-13 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        <p className="text-primary font-regular text-lg mt-4">{message ? message : "Estamos procesando su solicitud..."}</p>
      </div>
    </div>
  );
}
