import Image from "next/image";

export default function MiPerfilPage() {
  return (
    <>
      <div className="MiPerfil-container w-full h-full xl:p-10 z-5">
        <div className="miperfil bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title">
              <h1 className="text-2xl font-semibold text-primary">Mi Perfil</h1>
            </div>
            <div className="close-btn">x</div>
          </div>
          <div className="content w-full h-full flex flex-col items-center justify-start px-20 py-10 overflow-scroll hide-scrollbar">
            <div className="profile-header w-full">
              <div className="banner w-full h-50 bg-primary flex items-center justify-center">
                <div className="logo">
                  <Image src={"/logos/isotipo_w.png"} width={800} height={800} alt="Trivo Isotipo" className="size-35 opacity-30" />
                </div>
              </div>
              <div className="user-profile"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
