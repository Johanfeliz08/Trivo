import Image from "next/image";

export default function ProfileBanner({ user }) {
  return (
    <>
      <div className="profile-header w-full">
        <div className="banner w-full xl:h-50 2xl:h-70 bg-gradient-to-r from-[#472187] to-[#7C3AED] flex items-center justify-center rounded-2xl">
          <div className="logo">
            <Image src={"/logos/isotipo_w.png"} width={800} height={800} alt="Trivo Isotipo" className="2xl:size-60 xl:size-40 opacity-20" />
          </div>
        </div>
        <div className="user-info">
          <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-30 h-30 bg-gray-200 relative -top-20 left-10">
            <Image src={user.imagen} width={800} height={800} alt="user-avatar" className="object-cover" />
          </div>
          <div className="user-details relative -top-18 left-10">
            <h2 className="text-xl font-semibold">{user.nombre}</h2>
            <h3 className="text-md font-regular">{user.profesion}</h3>
            <p className="flex flex-row gap-2 text-gray-500">
              <span className="status">{user.estado}</span>
              <span>-</span>
              <span className="location">{user.ubicacion}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
