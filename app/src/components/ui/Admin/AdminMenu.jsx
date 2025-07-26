import Image from "next/image";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Johan",
    apellido: "Feliz",
    biografia: "",
    fotoPerfil: "",
    ubicacion: "",
    habilidad: [],
    interes: [],
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`menu-container bg-white ease-in-out duration-400 shadow-2xl w-90 h-full flex flex-col overflow-y-scroll hide-scrollbar z-50 max-w-15 ${
          isOpen ? "justify-start items-start max-w-70 " : "py-6 justify-center items-center"
        }`}
      >
        <div className={`logo-header flex  items-center w-full border-b ${isOpen ? "border-gray-200 justify-start py-8 pl-5" : "border-transparent justify-center"}`}>
          {isOpen ? <Image src="/logos/logotipo_pc.png" alt="Logo Trivo" width={100} height={50} /> : <Image src="/logos/isotipo_pc.png" alt="Logo Trivo" width={30} height={30} />}
        </div>
        <nav className="flex flex-col w-full h-full py-5 gap-4">
          <div className="section flex flex-col gap-3">
            {isOpen && <h3 className="section-title font-regular text-primary pl-6">General</h3>}
            <ul className="flex flex-col">
              <li className={`py-3 flex ${isOpen ? "justify-start pl-4" : "justify-center"}`}>
                <button className={`flex flex-row items-center gap-3 cursor-pointer w-full ${isOpen ? "" : "justify-center"}`} onClick={toggleMenu} aria-label="Toggle Menu" title="Abrir/Cerrar Menú">
                  <div className="icon">
                    <svg className={`${isOpen ? "size-5" : "size-5"}`} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                      <rect y="11" width="24" height="2" rx="1" />
                      <rect y="4" width="24" height="2" rx="1" />
                      <rect y="18" width="24" height="2" rx="1" />
                    </svg>
                  </div>
                  {isOpen && <span className="">Menu</span>}
                </button>
              </li>
              <li className="py-3">
                <a href="/admin/dashboard" className={`flex flex-row items-center gap-3 pl-4 ${isOpen ? "justify-start" : "justify-start"}`}>
                  <div className="icon">
                    {/* <svg className={`${isOpen ? "size-5" : "size-6"}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                      <path d="M21.062,6.729c-.035-.075-.088-.139-.154-.188-.174-.129-.389-.288-.636-.469V3.114c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v2.231c-2.437-1.752-6.221-4.346-7.272-4.346-1.364,0-7.164,4.242-8.909,5.542-.066,.05-.12,.115-.155,.191-.047,.103-1.165,2.58-1.165,7.727,0,2.249,.209,5.575,.448,7.117,.029,.19,.165,.346,.35,.402,.138,.042,3.442,1.021,9.432,1.021s9.292-.98,9.429-1.021c.185-.056,.32-.212,.35-.402,.24-1.545,.451-4.871,.451-7.117,0-5.191-1.119-7.629-1.167-7.73Zm-11.811,15.196v-4.8c0-1.575,1.232-2.856,2.748-2.856s2.748,1.281,2.748,2.856v4.8c-.84,.047-1.757,.075-2.748,.075s-1.908-.028-2.748-.075Zm11.584-.823c-.665,.167-2.409,.549-5.088,.757v-4.733c0-2.126-1.682-3.856-3.748-3.856s-3.748,1.73-3.748,3.856v4.733c-2.68-.208-4.425-.591-5.091-.757-.213-1.607-.391-4.581-.391-6.643,0-4.312,.823-6.678,1.028-7.198,3.486-2.591,7.479-5.249,8.2-5.261,.719,.019,4.713,2.676,8.204,5.263,.204,.513,1.026,2.85,1.026,7.197,0,2.021-.183,5.046-.394,6.643Z" />
                    </svg> */}
                    <svg className={`${isOpen ? "size-5" : "size-6"}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                      <path d="M21,7.5c0,.276-.224,.5-.5,.5h-3c-.276,0-.5-.224-.5-.5s.224-.5,.5-.5h3c.276,0,.5,.224,.5,.5Zm-.5,2.5h-3c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h3c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Zm0,3h-3c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h3c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Zm0,3h-3c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h3c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Zm3.5-8.5v9c0,2.481-2.019,4.5-4.5,4.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V7.5C0,5.019,2.019,3,4.5,3h15c2.481,0,4.5,2.019,4.5,4.5Zm-1,0c0-1.93-1.57-3.5-3.5-3.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v9c0,1.93,1.57,3.5,3.5,3.5h15c1.93,0,3.5-1.57,3.5-3.5V7.5Zm-8,4.5c0,3.309-2.691,6-6,6s-6-2.691-6-6,2.691-6,6-6,6,2.691,6,6Zm-6,5c1.198,0,2.284-.441,3.146-1.146l-3.207-3.207c-.283-.283-.439-.66-.439-1.061V7.051c-2.52,.255-4.5,2.364-4.5,4.949,0,2.757,2.243,5,5,5Zm5-5c0-2.586-1.98-4.694-4.5-4.949v4.535c0,.131,.054,.26,.146,.354l3.207,3.207c.706-.862,1.147-1.948,1.147-3.147Z" />
                    </svg>
                  </div>
                  {isOpen && <span className="">Dashboard</span>}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={`user-account flex flex-col gap-4 w-full ${isOpen ? "justify-start items-start pl-6 pb-5" : "justify-center items-center"}`}>
          <div className={`action-icons w-full  flex items-center ${isOpen ? "pl-[8px] justify-start " : "justify-center"} `}>
            <div className="notifications flex justify-center items-center">
              <button type="button" className="cursor-pointer flex flex-row justify-center items-center gap-6">
                <svg className="fill-black size-5 hover:fill-primary transition-all" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M23.391,16.207l-2.413-9.39C19.864,2.803,16.172,0,12,0,7.598,0,3.855,3.002,2.903,7.29L.692,16.359c-.197,.887,.019,1.805,.59,2.518,.572,.714,1.425,1.123,2.34,1.123h3.479c.465,2.279,2.484,4,4.899,4s4.434-1.721,4.899-4h3.599c.946,0,1.817-.432,2.389-1.185,.573-.753,.755-1.707,.504-2.608Zm-11.391,6.793c-1.858,0-3.411-1.279-3.858-3h7.716c-.447,1.721-2,3-3.858,3Zm10.091-4.79c-.381,.502-.962,.79-1.593,.79H3.623c-.61,0-1.179-.272-1.56-.748-.381-.476-.525-1.087-.396-1.666L3.877,7.517C4.729,3.68,8.07,1,12,1c3.724,0,7.02,2.502,8.012,6.075l2.413,9.39c.169,.607,.047,1.243-.334,1.745Z" />
                </svg>
                <span className={`font-regular text-md ${isOpen ? "flex" : "hidden"}`}>Notificaciones</span>
              </button>
            </div>
          </div>
          {isLoading ? (
            <span className="font-regular text-md">Cargando...</span>
          ) : (
            <div className={`user-info flex items-center`}>
              <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-10 h-10 bg-gray-200">
                <Image src={userData.fotoPerfil ? userData.fotoPerfil : "/imagenes/userDefault.png"} width={100} height={100} alt="user-avatar" />
              </div>
              <div className={`name ${isOpen ? "pl-4" : ""}`}>
                <span className={`${isOpen ? "flex" : "hidden"} font-regular text-md`}>
                  {userData.nombre} {userData.apellido}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
