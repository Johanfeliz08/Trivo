export default function UserCardSkeleton({ className }) {
  return (
    <div
      className={`user-card flex flex-col justify-end items-start 2xl:w-120 2xl:max-w-120 2xl:h-160 2xl:max-h-160 xl:w-80 xl:max-w-80 xl:h-100 xl:max-h-100 rounded-2xl  bg-gray-200  animate-pulse ${className}`}
    >
      <div
        className="gradient absolute rounded-2xl z-10 2xl:w-120 2xl:h-160 xl:w-80 xl:h-100"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(124,58,237,0.4) 70.19%, #7C3AED 88.94%)",
        }}
      ></div>

      {/* Imagen simulada */}
      <div className="absolute w-full h-full bg-gray-300 rounded-2xl z-0" />

      {/* Información del usuario */}
      <div className="user-info 2xl:p-10 xl:p-7 flex flex-col relative z-20 w-full">
        <div className="h-6 2xl:w-3/4 xl:w-2/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 2xl:w-1/2 xl:w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
