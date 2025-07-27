import ModalMiPerfil from "../Usuario/MiPerfil/ModalMiPerfil";
import Filters from "@/components/ui/Feed/Filters";
import { useState } from "react";

export default function ActionBar({ userId }) {
  const [isPerfilModalOpen, setIsPerfilModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  return (
    <>
      {isPerfilModalOpen && userId !== "" && <ModalMiPerfil userId={userId} isPerfilModalOpen={isPerfilModalOpen} setIsPerfilModalOpen={setIsPerfilModalOpen} />}
      {isFiltersModalOpen && <Filters isFiltersModalOpen={isFiltersModalOpen} setIsFiltersModalOpen={setIsFiltersModalOpen} />}
      <div className="ActionBar-container w-100 bg-white shadow-lg rounded-2xl flex justify-center items-center">
        <div className="actions">
          <ul className="flex flex-row items-center justify-center xl:gap-x-4 2xl:gap-x-6 xl:py-1 2xl:py-2 ">
            <li className="flex justify-center items-center">
              <button type="button dislike ">
                <div className="icon cursor-pointer hover:bg-bg-secondary hover:rounded-full p-2">
                  <svg className="size-7 fill-white stroke-2 stroke-primary ease-in-out duration-400" viewBox="-2.8 -2.8 61.60 61.60" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.00056">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#7c3aed" strokeWidth="1.9040000000000004">
                      <path d="M 45.1563 49.0117 C 45.8594 49.7148 47.0315 49.7148 47.7112 49.0117 C 48.4139 48.3086 48.4139 47.1601 47.7112 46.4570 L 6.7188 5.4883 C 6.0157 4.7852 4.8438 4.7852 4.1407 5.4883 C 3.4610 6.1679 3.4610 7.3633 4.1407 8.0430 Z M 44.6407 39.4258 C 49.6796 33.9648 52.5390 28.1758 52.5390 22.3398 C 52.5390 14.0430 46.8673 8.1836 39.2501 8.1836 C 34.9141 8.1836 31.3985 10.2461 29.2657 13.4101 C 27.1797 10.2695 23.6407 8.1836 19.2813 8.1836 C 17.5001 8.1836 15.8360 8.5117 14.3360 9.1445 Z M 29.2657 51.2148 C 29.7579 51.2148 30.4610 50.8867 30.9766 50.5820 C 33.4376 48.9883 35.7579 47.3711 37.8672 45.6836 L 7.5626 15.4258 C 6.5548 17.4179 5.9923 19.7617 5.9923 22.3398 C 5.9923 32.3242 14.3594 42.1445 27.5782 50.5820 C 28.0704 50.8867 28.7969 51.2148 29.2657 51.2148 Z"></path>
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M 45.1563 49.0117 C 45.8594 49.7148 47.0315 49.7148 47.7112 49.0117 C 48.4139 48.3086 48.4139 47.1601 47.7112 46.4570 L 6.7188 5.4883 C 6.0157 4.7852 4.8438 4.7852 4.1407 5.4883 C 3.4610 6.1679 3.4610 7.3633 4.1407 8.0430 Z M 44.6407 39.4258 C 49.6796 33.9648 52.5390 28.1758 52.5390 22.3398 C 52.5390 14.0430 46.8673 8.1836 39.2501 8.1836 C 34.9141 8.1836 31.3985 10.2461 29.2657 13.4101 C 27.1797 10.2695 23.6407 8.1836 19.2813 8.1836 C 17.5001 8.1836 15.8360 8.5117 14.3360 9.1445 Z M 29.2657 51.2148 C 29.7579 51.2148 30.4610 50.8867 30.9766 50.5820 C 33.4376 48.9883 35.7579 47.3711 37.8672 45.6836 L 7.5626 15.4258 C 6.5548 17.4179 5.9923 19.7617 5.9923 22.3398 C 5.9923 32.3242 14.3594 42.1445 27.5782 50.5820 C 28.0704 50.8867 28.7969 51.2148 29.2657 51.2148 Z"></path>
                    </g>
                  </svg>
                </div>
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button type="button info" onClick={() => setIsPerfilModalOpen(true)}>
                <div className="icon cursor-pointer hover:bg-bg-secondary hover:rounded-full p-2">
                  <svg className="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                    <path d="m11,1.5c0-.828.672-1.5,1.5-1.5s1.5.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm6,20.5h-3v-12c0-2.757-2.243-5-5-5-.552,0-1,.448-1,1s.448,1,1,1c1.654,0,3,1.346,3,3v12h-3c-.552,0-1,.447-1,1s.448,1,1,1h8c.552,0,1-.447,1-1s-.448-1-1-1Z" />
                  </svg>
                </div>
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button type="button" className="filters" onClick={() => setIsFiltersModalOpen(true)}>
                <div className="icon cursor-pointer hover:bg-bg-secondary hover:rounded-full p-2">
                  <svg className="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                    <path d="m18,5.92c0-2.162-1.758-3.92-3.92-3.92H3.92C1.758,2,0,3.758,0,5.92c0,.935.335,1.841.944,2.551l5.056,5.899v3.63c0,.315.148.611.4.8l4,3c.177.132.388.2.6.2.152,0,.306-.035.447-.105.339-.169.553-.516.553-.895v-6.63l5.056-5.899c.609-.71.944-1.616.944-2.551Zm-2.462,1.25l-5.297,6.18c-.155.181-.241.412-.241.651v5l-2-1.5v-3.5c0-.239-.085-.47-.241-.651L2.462,7.169c-.298-.348-.462-.792-.462-1.25,0-1.059.861-1.92,1.92-1.92h10.16c1.059,0,1.92.861,1.92,1.92,0,.458-.164.902-.462,1.25Zm8.462,12.831c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm0-4c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm-6-5h5c.552,0,1,.448,1,1s-.448,1-1,1h-5c-.552,0-1-.448-1-1s.448-1,1-1Z" />
                  </svg>
                </div>
              </button>
            </li>
            <li className="flex justify-center items-center">
              <button type="button dislike">
                <div className="icon cursor-pointer hover:bg-bg-secondary hover:rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" className="size-7 fill-white stroke-2 stroke-primary ease-in-out duration-400">
                    <g transform="matrix(0.76,0,0,0.76,2.88,2.99)">
                      <path
                        d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Z"
                        opacity="1"
                      ></path>
                    </g>
                  </svg>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
