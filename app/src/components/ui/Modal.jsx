"use client";

import { useRouter } from "next/navigation";

export default function Modal({ message, redirectTo, type }) {
  const router = useRouter();
  const success = () => {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] w-screen h-screen">
          <div className="modal-container relative bg-white shadow-2xl rounded-2xl py-25 px-30 flex flex-col justify-center items-center overflow-hidden">
            <button
              className="close-modal-btn absolute top-0 right-0 pr-4 pt-4 cursor-pointer"
              onClick={() => {
                router.push(redirectTo);
              }}
            >
              <svg className="size-6 fill-primary hover:fill-black transition-all" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024">
                <path d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
              </svg>
            </button>
            <div className="absolute -top-15 -left-15 right-0 flex justify-center items-center size-50 opacity-20">
              <img src="/logos/isotipo_pc.png" alt="" />
            </div>
            <div className="absolute -bottom-15 -right-15 flex justify-center items-center size-50 opacity-20">
              <img src="/logos/isotipo_pc.png" alt="" />
            </div>
            <div className="modal-content flex flex-col justify-center items-center gap-4">
              <div className="">
                <svg viewBox="4 7 15 11" xmlns="http://www.w3.org/2000/svg" className="size-20">
                  <defs>
                    <path
                      id="check-a"
                      d="M4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L1.90917969,5.46118164 C1.5186554,5.85170593 0.885490417,5.85170593 0.494966125,5.46118164 C0.104441833,5.07065735 0.104441833,4.43749237 0.494966125,4.04696808 L4.29289322,0.292893219 Z"
                    />
                    <path
                      id="check-c"
                      d="M10.7071068,13.2928932 C11.0976311,13.6834175 11.0976311,14.3165825 10.7071068,14.7071068 C10.3165825,15.0976311 9.68341751,15.0976311 9.29289322,14.7071068 L0.292893219,5.70710678 C-0.0976310729,5.31658249 -0.0976310729,4.68341751 0.292893219,4.29289322 L4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L2.41421356,5 L10.7071068,13.2928932 Z"
                    />
                  </defs>

                  <g fill="none" fillRule="evenodd" transform="rotate(-90 11 7)">
                    <g transform="translate(1 1)">
                      <mask id="check-b" fill="#ffffff">
                        <use href="#check-a" />
                      </mask>
                      <use fill="#D8D8D8" fillRule="nonzero" href="#check-a" />
                      <g fill="#FFA0A0" mask="url(#check-b)">
                        <rect width="24" height="24" transform="translate(-7 -5)" />
                      </g>
                    </g>
                    <mask id="check-d" fill="#ffffff">
                      <use href="#check-c" />
                    </mask>
                    <use fill="#000000" fillRule="nonzero" href="#check-c" />
                    <g fill="#7600FF" mask="url(#check-d)">
                      <rect width="24" height="24" transform="translate(-6 -4)" />
                    </g>
                  </g>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-primary">¡Enhorabuena!</h2>
              <p className="text-regular text-lg max-w-3/4 py-1">{message}</p>
              <div className="buttons">
                <button
                  onClick={() => {
                    router.push(redirectTo);
                  }}
                  type="button"
                  className="bg-primary border-transparent border-1 text-white py-2 px-10 rounded-xl hover:bg-bg-secondary hover:text-primary hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const error = () => {
    return (
      <>
        <div className="modal-container">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is a modal content area.</p>
            <button className="close-modal-btn">Close</button>
          </div>
        </div>
      </>
    );
  };

  const info = () => {
    return (
      <>
        <div className="modal-container">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is a modal content area.</p>
            <button className="close-modal-btn">Close</button>
          </div>
        </div>
      </>
    );
  };

  const warning = () => {
    return (
      <>
        <div className="modal-container">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is a modal content area.</p>
            <button className="close-modal-btn">Close</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {type === "success" && success()}
      {type === "error" && error()}
      {type === "info" && info()}
      {type === "warning" && warning()}
    </>
  );
}
