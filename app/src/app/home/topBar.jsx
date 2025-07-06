import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function TopBar() {
  const router = useRouter();
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  return (
    <>
      <div className="topbar-container relative flex flex-row items-center w-full justify-center h-20 px-32 py-12 bg-white border-b-2 border-b-gray-200 shadow-sm">
        <div className="search-bar">
          <label htmlFor="search-input" className="bg-bg-secondary flex flex-row justify-center items-center relative rounded-xl px-4 gap-2">
            <div className="icon">
              <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g clipPath="url(#clip0_15_152)">
                    {" "}
                    <rect width="24" height="24" fill=""></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#7c3aed" strokeLinejoin="round"></circle>{" "}
                    <path
                      d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                      fill="#7c3aed"
                    ></path>{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <clipPath id="clip0_15_152">
                      {" "}
                      <rect width="24" height="24" fill="white"></rect>{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                </g>
              </svg>
            </div>
            <input
              id="search-input"
              type="text"
              className=" bg-bg-secondary outline-0 rounded-md h-8 w-80 text-sm text-gray-600"
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={() => setIsSearchInputFocused(false)}
            />
            <div className={`clear-icon flex items-center justify-center size-4`}>
              <button type="button" className={`cursor-pointer ${isSearchInputFocused ? "flex" : "hidden"}`}>
                <svg viewBox="0 0 1024 1024" className="icon fill-primary size-4" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
                      fill=""
                    ></path>
                    <path
                      d="M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </label>
        </div>

        <div className="dropdown-menu h-full flex flex-row justify-center items-center absolute right-12 gap-4 cursor-pointer">
          <div className="action-icons">
            <div className="notifications flex justify-center items-center">
              <button type="button" className="cursor-pointer">
                <svg className="fill-black size-6 hover:fill-primary transition-all" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M23.391,16.207l-2.413-9.39C19.864,2.803,16.172,0,12,0,7.598,0,3.855,3.002,2.903,7.29L.692,16.359c-.197,.887,.019,1.805,.59,2.518,.572,.714,1.425,1.123,2.34,1.123h3.479c.465,2.279,2.484,4,4.899,4s4.434-1.721,4.899-4h3.599c.946,0,1.817-.432,2.389-1.185,.573-.753,.755-1.707,.504-2.608Zm-11.391,6.793c-1.858,0-3.411-1.279-3.858-3h7.716c-.447,1.721-2,3-3.858,3Zm10.091-4.79c-.381,.502-.962,.79-1.593,.79H3.623c-.61,0-1.179-.272-1.56-.748-.381-.476-.525-1.087-.396-1.666L3.877,7.517C4.729,3.68,8.07,1,12,1c3.724,0,7.02,2.502,8.012,6.075l2.413,9.39c.169,.607,.047,1.243-.334,1.745Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-12 h-12 bg-gray-200">
            <Image src={"/imagenes/user.jpg"} width={50} height={50} alt="user-avatar" />
          </div>
          <div className="name">
            <span className="font-regular text-lg">Johan Feliz</span>
          </div>
          <div className="dropdown-icon">
            <svg className="fill-black size-4" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="m12,18c-.4,0-.777-.156-1.061-.439L.112,6.733l.707-.707,10.827,10.827c.189.189.518.189.707,0l10.827-10.827.707.707-10.827,10.827c-.283.283-.66.439-1.061.439Z" />
            </svg>
          </div>
          <div className="menu h-[170px] max-h-0 overflow-hidden border absolute bg-white shadow-xl top-24 right-0 rounded-md w-full z-10">
            <nav className="">
              <ul className="flex flex-col gap-3">
                <li className="hover:bg-primary px-5 py-3 fill-primary hover:text-white hover:fill-white">
                  <a href="" className="flex flex-row justify-start items-center gap-2">
                    <div className="icon">
                      <svg className="size-6" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                        <path d="M12.003,11.774c3.5-.021,5.307-1.83,5.372-5.396-.06-3.446-1.967-5.356-5.378-5.378-3.452,.021-5.372,2.066-5.372,5.378,0,3.462,1.921,5.375,5.378,5.396Zm-.006-9.774c2.855,.019,4.328,1.498,4.378,4.378-.055,2.982-1.446,4.379-4.372,4.396-2.93-.017-4.321-1.411-4.378-4.387,.055-2.934,1.487-4.369,4.372-4.387Z" />
                        <path d="M11.997,14.294c-5.259,.033-8.089,2.867-8.185,8.197-.005,.276,.215,.504,.491,.509h.009c.272,0,.495-.218,.5-.491,.086-4.825,2.438-7.186,7.184-7.215,4.689,.03,7.109,2.458,7.191,7.215,.005,.276,.255,.505,.509,.491,.276-.005,.496-.232,.491-.509-.091-5.252-2.997-8.164-8.19-8.197Z" />
                      </svg>
                    </div>
                    <span>Mi Perfil</span>
                  </a>
                </li>
                <li className="hover:bg-primary px-5 py-3 fill-primary hover:text-white hover:fill-white">
                  <a href="" className="flex flex-row justify-start items-center gap-2">
                    <div className="icon">
                      <svg className="size-6" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                        <path d="M9.8,9.802c-.755,.753-1.122,1.476-1.122,2.208,0,.957,.64,1.706,1.122,2.187,.74,.739,1.47,1.108,2.2,1.108s1.46-.37,2.2-1.108c.755-.753,1.122-1.476,1.122-2.208,0-.957-.64-1.706-1.122-2.187-1.48-1.478-2.92-1.478-4.4,0Zm3.694,3.688c-1.251,1.248-2.042,.944-2.988,0-.565-.564-.828-1.034-.828-1.479,0-.454,.271-.944,.828-1.5,.583-.582,1.065-.826,1.511-.826,.511,0,.972,.322,1.478,.826,.565,.564,.828,1.034,.828,1.479,0,.454-.271,.944-.828,1.5Z" />
                        <g>
                          <path d="M9.8,9.802c-.755,.753-1.122,1.476-1.122,2.208,0,.957,.64,1.706,1.122,2.187,.74,.739,1.47,1.108,2.2,1.108s1.46-.37,2.2-1.108c.755-.753,1.122-1.476,1.122-2.208,0-.957-.64-1.706-1.122-2.187-1.48-1.478-2.92-1.478-4.4,0Zm3.694,3.688c-1.251,1.248-2.042,.944-2.988,0-.565-.564-.828-1.034-.828-1.479,0-.454,.271-.944,.828-1.5,.583-.582,1.065-.826,1.511-.826,.511,0,.972,.322,1.478,.826,.565,.564,.828,1.034,.828,1.479,0,.454-.271,.944-.828,1.5Z" />
                          <path d="M23.019,11.948c.008-1.595-.817-2.481-2.521-2.7-.188-.394-.417-.787-.694-1.188,1.205-1.456,1.21-2.694,.026-3.876-1.183-1.181-2.425-1.175-3.884,.029-.401-.274-.794-.501-1.188-.688-.217-1.706-1.134-2.524-2.705-2.524-1.602,.008-2.495,.849-2.725,2.569-.392,.189-.791,.421-1.19,.691-1.451-1.197-2.694-1.194-3.89,0-1.178,1.175-1.18,2.448-.001,3.882-.273,.4-.506,.798-.696,1.189-1.719,.229-2.56,1.122-2.568,2.721-.008,1.595,.817,2.481,2.521,2.7,.188,.394,.417,.787,.694,1.188-1.205,1.456-1.21,2.694-.026,3.876,1.184,1.182,2.425,1.176,3.884-.029,.401,.274,.794,.501,1.188,.688,.216,1.697,1.113,2.524,2.682,2.524,1.605,0,2.519-.849,2.749-2.569,.392-.189,.791-.421,1.19-.691,1.451,1.197,2.694,1.193,3.89,0,1.178-1.175,1.18-2.448,.001-3.882,.273-.4,.506-.798,.696-1.189,1.719-.229,2.56-1.122,2.568-2.721Zm-3.36,2.053c-.227,.515-.544,1.051-.942,1.594-.142,.193-.127,.459,.036,.635,1.373,1.487,.898,2.2,.295,2.802-.63,.628-1.321,1.078-2.812-.295-.175-.162-.44-.176-.634-.036-.541,.395-1.077,.71-1.595,.937-.167,.073-.282,.232-.297,.415-.139,1.615-.779,1.942-1.766,1.947-1.008-.027-1.609-.304-1.734-1.9-.015-.186-.131-.348-.302-.421-.521-.222-1.041-.526-1.588-.929-.089-.065-.193-.097-.296-.097-.122,0-.243,.044-.338,.132-1.503,1.383-2.211,.919-2.807,.324-.595-.594-1.06-1.299,.323-2.797,.163-.177,.178-.444,.035-.637-.4-.541-.716-1.075-.937-1.588-.073-.17-.234-.286-.419-.301-1.587-.126-1.903-.755-1.898-1.729,.005-.984,.333-1.622,1.946-1.761,.182-.016,.341-.129,.415-.296,.227-.515,.544-1.051,.942-1.594,.142-.193,.127-.459-.036-.635-1.373-1.487-.898-2.2-.295-2.802,.606-.604,1.321-1.08,2.812,.295,.176,.163,.441,.178,.634,.036,.541-.395,1.077-.71,1.595-.937,.167-.073,.282-.232,.297-.415,.139-1.615,.779-1.942,1.766-1.947,.99-.027,1.608,.304,1.734,1.9,.015,.186,.131,.348,.302,.421,.521,.222,1.041,.526,1.588,.929,.193,.142,.458,.127,.635-.035,1.504-1.382,2.212-.918,2.807-.324,.595,.594,1.06,1.299-.323,2.797-.163,.177-.178,.444-.035,.637,.4,.541,.716,1.075,.937,1.588,.073,.17,.234,.286,.419,.301,1.587,.126,1.903,.755,1.898,1.729-.005,.984-.333,1.622-1.946,1.761-.182,.016-.341,.129-.415,.296Z" />
                        </g>
                      </svg>
                    </div>
                    <span>Configuracion</span>
                  </a>
                </li>
                <li className="hover:bg-primary px-5 py-3 fill-primary hover:text-white hover:fill-white">
                  <a href="" className="flex flex-row justify-start items-center gap-2">
                    <div className="icon">
                      <svg className="w-6 h-5" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1">
                        <path d="m23 1.5v21.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-21.5c0-.276.224-.5.5-.5s.5.224.5.5zm-4.5 10h-16.032c1.407-1.973 3.176-3.689 5.306-5.082.231-.15.296-.461.145-.691s-.46-.297-.692-.145c-2.525 1.651-4.593 3.72-6.147 6.148-.105.164-.105.375 0 .539 1.554 2.429 3.623 4.497 6.147 6.148.228.151.54.088.692-.145.151-.23.086-.541-.145-.691-2.13-1.393-3.899-3.109-5.306-5.082h16.032c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z" />
                      </svg>
                    </div>
                    <span>Cerrar sesion</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <button
          type="button"
          className="btn hidden bg-primary p-3 text-white rounded-md shadow-md cursor-pointer absolute right-12"
          onClick={() => {
            Cookies.remove("tokenAcceso");
            Cookies.remove("tokenRefresco");
            router.push("/auth/login");
          }}
        >
          Cerrar sesion
        </button>
      </div>
    </>
  );
}
