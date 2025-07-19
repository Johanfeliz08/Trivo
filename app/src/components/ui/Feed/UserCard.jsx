import Image from "next/image";
export default function UserCard({ user, className }) {
  return (
    <>
      <div className={` user-card flex flex-col justify-end items-start 2xl:w-120 2xl:max-w-120 2xl:h-160 2xl:max-h-160 xl:w-80 xl:max-w-80 xl:h-100 xl:max-h-100 rounded-2xl ${className}`}>
        <div
          className="gradient 2xl:w-120 2xl:max-w-120 2xl:h-160 2xl:max-h-160 xl:w-80 xl:max-w-80 xl:h-100 xl:max-h-100 absolute rounded-2xl z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(124,58,237,0.4) 70.19%, #7C3AED 88.94%)`,
            backgroundPosition: "50%",
          }}
        ></div>
        <div className="image w-full h-full 2xl:max-w-120 2xl:h-160 absolute">
          <Image src={user.fotoPerfil ? user.FotoPerfil : "/imagenes/userDefault.png"} alt={user.nombre} layout="fill" className="object-cover rounded-2xl 2xl:max-w-120 2xl:h-160" />
        </div>
        <div className="user-info 2xl:p-10 xl:p-7 flex flex-col relative z-20">
          <h3 className="user-name text-white font-bold 2xl:text-2xl xl:text-sm">{user.nombre}</h3>
          <p className="user-occupation text-white font-semibold xl:text-xs">{user.ocupacion ? user.ocupacion : "Sin ocupación"}</p>
          <p className="user-description text-white font-light text-justify mt-1 xl:text-xs">{user.Biografia ? user.Biografia : "Sin biografía"}</p>
        </div>
      </div>
    </>
  );
}
