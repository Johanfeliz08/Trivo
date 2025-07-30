export default function Notification({ type, message, title }) {
  const info = {
    title: "Nueva notificación",
    message: "Tienes un nuevo mensaje.",
    icon: (
      <svg className="size-4 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
        <path d="m11,1.5c0-.828.672-1.5,1.5-1.5s1.5.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm6,20.5h-3v-12c0-2.757-2.243-5-5-5-.552,0-1,.448-1,1s.448,1,1,1c1.654,0,3,1.346,3,3v12h-3c-.552,0-1,.447-1,1s.448,1,1,1h8c.552,0,1-.447,1-1s-.448-1-1-1Z" />
      </svg>
    ),
  };

  const newMessage = {
    title: "Ha recibido un mensaje nuevo",
    message: "Tienes un nuevo mensaje de [Usuario].",
    icon: (
      <svg className="size-4 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
        <g id="_01_align_center" data-name="01 align center">
          <path d="M24,24H12.018A12,12,0,1,1,24,11.246l0,.063ZM12.018,2a10,10,0,1,0,0,20H22V11.341A10.018,10.018,0,0,0,12.018,2Z" />
          <rect x="7" y="7" width="6" height="2" />
          <rect x="7" y="11" width="10" height="2" />
          <rect x="7" y="15" width="10" height="2" />
        </g>
      </svg>
    ),
  };

  const match = {
    title: "Nuevo match recibido",
    message: "[Usuario] ha indicado que le interesa tu perfil.",
    icon: (
      <svg className="size-4 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
        <path d="M23,15h-.667c-.25,0-.498,.019-.745,.057l-7.046-5.284,1.688-1.616c.399-.382,.413-1.016,.031-1.414-.383-.399-1.017-.412-1.414-.031l-4.173,3.995c-.208,.208-.491,.315-.788,.29-.298-.024-.56-.175-.739-.425-.274-.38-.19-.975,.168-1.334l4.703-4.429c.891-.837,2.284-1.042,3.374-.495l2.316,1.158c.69,.345,1.464,.527,2.235,.527h1.056c.553,0,1-.447,1-1s-.447-1-1-1h-1.056c-.463,0-.928-.109-1.342-.316l-2.314-1.158c-1.824-.913-4.153-.574-5.641,.828l-.618,.582-.7-.638c-.919-.837-2.109-1.298-3.39-1.298-.771,0-1.54,.182-2.227,.525l-2.314,1.158c-.415,.207-.88,.316-1.343,.316H1c-.553,0-1,.447-1,1s.447,1,1,1h1.056c.771,0,1.545-.183,2.236-.527l2.316-1.158c1.022-.514,2.458-.375,3.374,.462l.587,.535-2.646,2.492c-1.073,1.072-1.244,2.767-.398,3.938,.52,.723,1.553,1.259,2.444,1.259,.793,0,1.554-.312,2.104-.863l1.006-.963,6.346,4.759c-.031,.022-6.198,4.646-6.198,4.646-.723,.562-1.732,.562-2.47-.011l-6.091-4.568c-.859-.645-1.925-1-3-1h-.667c-.553,0-1,.447-1,1s.447,1,1,1h.667c.645,0,1.284,.213,1.8,.6l6.077,4.558c.725,.564,1.594,.846,2.461,.846,.862,0,1.723-.279,2.437-.835l6.093-4.568c.515-.387,1.154-.6,1.799-.6h.667c.553,0,1-.447,1-1s-.447-1-1-1Z" />
      </svg>
    ),
  };

  return (
    <div className="notification  w-full h-auto hover:bg-gray-100 transition-all duration-300 rounded-lg cursor-pointer">
      <div className="flex items-center justify-between p-2 gap-2">
        <div className="icon bg-bg-secondary rounded-full p-2 w-14 h-10 flex justify-center items-center overflow-hidden">
          {type === "info" && info.icon}
          {type === "newMessage" && newMessage.icon}
          {type === "match" && match.icon}
        </div>
        <div className="notification-content w-full">
          {type === "info" && (
            <>
              <h3 className="text-sm font-semibold">{title ? title : info.title}</h3>
              <p className="text-gray-600 text-sm">{message ? message : info.message}</p>
            </>
          )}
          {type === "newMessage" && (
            <>
              <h3 className="text-sm font-semibold">{title ? title : newMessage.title}</h3>
              <p className="text-gray-600 text-sm">{message ? message : newMessage.message}</p>
            </>
          )}
          {type === "match" && (
            <>
              <h3 className="text-sm font-semibold">{title ? title : match.title}</h3>
              <p className="text-gray-600 text-sm">{message ? message : match.message}</p>
            </>
          )}
        </div>
        <div className="actions flex flex-row items-center justify-center gap-1">
          <button className="mark-as-read-btn text-sm cursor-pointer hover:bg-green-200 p-2 rounded-full transition-all duration-400">
            <div className="icon">
              <svg className="size-4 fill-green-600" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                <path d="m1.283,7.697c-.385-.396-.375-1.029.021-1.414.396-.385,1.03-.376,1.414.021l4.089,4.211c.307.31.729.485,1.176.486.445,0,.864-.173,1.179-.488L18.29,1.296c.388-.394,1.021-.396,1.414-.007.393.389.396,1.022.007,1.414l-9.131,9.219c-.696.696-1.624,1.078-2.604,1.078-.982-.002-1.904-.387-2.596-1.085L1.283,7.697Zm22.423-.405c-.391-.391-1.025-.389-1.414.002l-13.087,13.12c-.378.378-.884.586-1.418.586-.536,0-1.039-.212-1.423-.599L1.699,15.784c-.394-.388-1.026-.386-1.415.008-.388.393-.385,1.025.007,1.414l4.659,4.61c.755.761,1.761,1.181,2.833,1.184,1.068,0,2.081-.416,2.837-1.173l13.088-13.121c.39-.391.389-1.024-.002-1.414Z" />
              </svg>
            </div>
          </button>
          <button className="delete-btn cursor-pointer hover:bg-red-200 p-2 rounded-full transition-all duration-400">
            <div className="icon">
              <svg className="size-4 fill-red-600" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
