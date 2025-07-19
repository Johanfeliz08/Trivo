import Image from "next/image";
export default function ChatWindow({ chatId }) {
  return (
    <>
      <div className={`chat flex flex-col w-full`}>
        <div className="header flex flex-row justify-start items-center gap-4 p-5 border-b border-gray-200 w-full h-26">
          <div className="user-picture rounded-full overflow-hidden flex items-center justify-center w-15 h-15 bg-gray-200">
            <Image className="object-cover w-full h-full" src={"/imagenes/user.jpg"} width={50} height={50} alt="user-avatar" />
          </div>
          <div className="chat-name">
            <span className="text-primary font-medium text-2xl">Misael Gomez</span>
          </div>
        </div>
        <div className="messages-container w-full h-full bg-bg-secondary"></div>
        <div className="message-bar bg-bg-secondary flex items-center">
          <div className="bar-container bg-white w-full flex flex-row justify-between items-center gap-5 px-4 py-2">
            <input type="text" placeholder="Escribir un mensaje nuevo." id="message" name="message" className="w-full py-5 px-3 outline-none" />
            <div className="attachment">
              <label htmlFor="file" className="cursor-pointer flex items-center justify-center">
                <div className="icon">
                  <svg
                    className="size-6 fill-gray-500 hover:fill-primary transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 511.201 511.201"
                    width="100"
                    height="100"
                  >
                    <g>
                      <path d="M496.108,203.908c-8.331-8.328-21.835-8.328-30.165,0L233.58,437.274c-41.656,41.661-109.197,41.666-150.859,0.011   s-41.666-109.197-0.011-150.859L307.756,60.463c25.193-24.792,65.715-24.467,90.507,0.726c24.507,24.904,24.512,64.86,0.011,89.77   L173.228,376.922c-8.433,8.078-21.733,8.078-30.165,0c-8.328-8.331-8.328-21.835,0-30.165l200.363-201.28   c8.185-8.475,7.951-21.98-0.524-30.165c-8.267-7.985-21.374-7.985-29.641,0l-200.363,201.28   c-24.996,24.991-24.999,65.514-0.008,90.51c0.003,0.003,0.005,0.005,0.008,0.008c25.331,24.172,65.186,24.172,90.517,0   l225.024-225.984c41.122-42.183,40.261-109.715-1.922-150.837C385.087-10.1,319.014-10.095,277.591,30.298L52.545,256.26   c-58.321,58.321-58.321,152.879,0,211.2s152.879,58.321,211.2,0l232.363-233.301c8.353-8.309,8.39-21.816,0.081-30.17   C496.162,203.962,496.135,203.935,496.108,203.908z" />
                    </g>
                  </svg>
                </div>
                <input type="file" name="file" id="file" className="hidden" />
              </label>
            </div>
            <div className="send-btn">
              <button type="button" className="flex items-center justify-center">
                <div className="icon">
                  <svg className="size-6 fill-primary cursor-pointer" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
