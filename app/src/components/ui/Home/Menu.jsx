import Image from "next/image";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`menu-container bg-white ease-in-out duration-400 shadow-2xl w-60 h-[calc(100vh-5rem)] flex flex-col overflow-y-scroll hide-scrollbar z-50 max-w-15 ${
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
                <a href="/feed" className={`flex flex-row items-center gap-3 pl-4 ${isOpen ? "justify-start" : "justify-start"}`}>
                  <div className="icon">
                    <svg className={`${isOpen ? "size-5" : "size-6"}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                      <path d="M21.062,6.729c-.035-.075-.088-.139-.154-.188-.174-.129-.389-.288-.636-.469V3.114c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v2.231c-2.437-1.752-6.221-4.346-7.272-4.346-1.364,0-7.164,4.242-8.909,5.542-.066,.05-.12,.115-.155,.191-.047,.103-1.165,2.58-1.165,7.727,0,2.249,.209,5.575,.448,7.117,.029,.19,.165,.346,.35,.402,.138,.042,3.442,1.021,9.432,1.021s9.292-.98,9.429-1.021c.185-.056,.32-.212,.35-.402,.24-1.545,.451-4.871,.451-7.117,0-5.191-1.119-7.629-1.167-7.73Zm-11.811,15.196v-4.8c0-1.575,1.232-2.856,2.748-2.856s2.748,1.281,2.748,2.856v4.8c-.84,.047-1.757,.075-2.748,.075s-1.908-.028-2.748-.075Zm11.584-.823c-.665,.167-2.409,.549-5.088,.757v-4.733c0-2.126-1.682-3.856-3.748-3.856s-3.748,1.73-3.748,3.856v4.733c-2.68-.208-4.425-.591-5.091-.757-.213-1.607-.391-4.581-.391-6.643,0-4.312,.823-6.678,1.028-7.198,3.486-2.591,7.479-5.249,8.2-5.261,.719,.019,4.713,2.676,8.204,5.263,.204,.513,1.026,2.85,1.026,7.197,0,2.021-.183,5.046-.394,6.643Z" />
                    </svg>
                  </div>
                  {isOpen && <span className="">Inicio</span>}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
