import { useState } from "react";

export default function SearchBar() {
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  return (
    <>
      <div className="search-bar w-80">
        <label htmlFor="search-input" className="bg-white flex flex-row justify-center items-center relative rounded-xl px-4 gap-2 shadow-xl border-b border-gray-300">
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
            className=" bg-white outline-0 rounded-md h-8 w-80 text-sm text-gray-600"
            onFocus={() => setIsSearchInputFocused(true)}
            onBlur={() => setIsSearchInputFocused(false)}
            placeholder="Buscar..."
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
    </>
  );
}
