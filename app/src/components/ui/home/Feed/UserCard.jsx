import Image from "next/image";
export default function UserCard({ user, className }) {
  return (
    <>
      <div className={`user-card flex flex-col justify-end items-start w-120 h-160 rounded-2xl ${className}`}>
        <div
          className="gradient w-full h-full absolute top-0 left-0 rounded-2xl z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(124,58,237,0.4) 70.19%, #7C3AED 88.94%)`,
            backgroundPosition: "50%",
          }}
        ></div>
        <div className="image">
          <Image src={user.imagen} alt={user.nombre} layout="fill" className="object-cover rounded-2xl" />
        </div>
        <div className="user-info p-10 flex flex-col relative z-20">
          <h3 className="user-name text-white font-bold text-2xl">{user.nombre}</h3>
          <p className="user-occupation text-white font-semibold">{user.ocupacion}</p>
          <p className="user-description text-white font-light text-justify mt-1">{user.descripcion}</p>
        </div>
      </div>
    </>
  );
}
