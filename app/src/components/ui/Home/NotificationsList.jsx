import { useState } from "react";
import Notification from "@/components/ui/Home/Notification";

export default function NotificationsList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="notifications flex justify-center items-center relative h-full">
        <button type="button" className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`fill-black size-5 hover:fill-primary transition-all ${isOpen ? "fill-primary" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M23.391,16.207l-2.413-9.39C19.864,2.803,16.172,0,12,0,7.598,0,3.855,3.002,2.903,7.29L.692,16.359c-.197,.887,.019,1.805,.59,2.518,.572,.714,1.425,1.123,2.34,1.123h3.479c.465,2.279,2.484,4,4.899,4s4.434-1.721,4.899-4h3.599c.946,0,1.817-.432,2.389-1.185,.573-.753,.755-1.707,.504-2.608Zm-11.391,6.793c-1.858,0-3.411-1.279-3.858-3h7.716c-.447,1.721-2,3-3.858,3Zm10.091-4.79c-.381,.502-.962,.79-1.593,.79H3.623c-.61,0-1.179-.272-1.56-.748-.381-.476-.525-1.087-.396-1.666L3.877,7.517C4.729,3.68,8.07,1,12,1c3.724,0,7.02,2.502,8.012,6.075l2.413,9.39c.169,.607,.047,1.243-.334,1.745Z" />
          </svg>
        </button>
        <div className="total-notifications absolute top-3 -right-3">
          <span className="text-xs text-white bg-primary rounded-full px-2 py-1">3</span>
        </div>
        <div
          className={`dropdown-list flex flex-col gap-2 p-4 bg-white absolute -bottom-81 z-50 right-0 w-110 h-80 overflow-y-auto rounded-lg shadow-lg transition-all duration-500 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="header border-b border-gray-200 px-2 py-3 flex items-center justify-between">
            <h2 className="font-semibold">Notificaciones</h2>
            <button type="button" className="text-sm text-green-600 hover:underline cursor-pointer flex flex-row items-center justify-center gap-2">
              <div className="icon">
                <svg className="size-4 fill-green-600" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                  <path d="m1.283,7.697c-.385-.396-.375-1.029.021-1.414.396-.385,1.03-.376,1.414.021l4.089,4.211c.307.31.729.485,1.176.486.445,0,.864-.173,1.179-.488L18.29,1.296c.388-.394,1.021-.396,1.414-.007.393.389.396,1.022.007,1.414l-9.131,9.219c-.696.696-1.624,1.078-2.604,1.078-.982-.002-1.904-.387-2.596-1.085L1.283,7.697Zm22.423-.405c-.391-.391-1.025-.389-1.414.002l-13.087,13.12c-.378.378-.884.586-1.418.586-.536,0-1.039-.212-1.423-.599L1.699,15.784c-.394-.388-1.026-.386-1.415.008-.388.393-.385,1.025.007,1.414l4.659,4.61c.755.761,1.761,1.181,2.833,1.184,1.068,0,2.081-.416,2.837-1.173l13.088-13.121c.39-.391.389-1.024-.002-1.414Z" />
                </svg>
              </div>
              <span>Marcar todas como leídas</span>
            </button>
          </div>
          <ul className="notifications-list flex flex-col gap-2 overflow-scroll hide-scrollbar">
            <li>
              <Notification type="info" />
            </li>
            <li>
              <Notification type="newMessage" />
            </li>
            <li>
              <Notification type="match" />
            </li>
            <li>
              <Notification type="info" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
