export default function TableWidget({ title, data }) {
  return (
    <>
      <div className="table-container bg-white rounded-2xl shadow-xl px-16 pt-16 pb-25 flex flex-col gap-6 relative">
        <div className="header">
          <h2 className="title text-primary text-2xl font-semibold">{title}</h2>
        </div>
        <table className="w-full">
          <thead className="">
            <tr>
              {data.columns.map((column) => (
                <th key={column} className="text-left p-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row) => (
              <tr className="border-b border-purple-300 hover:bg-bg-secondary transition-all" key={row.matchId}>
                <td className="px-2 py-5 flex items-center justify-center">
                  <button className="text-primary cursor-pointer">
                    {" "}
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
                  </button>
                </td>
                <td className="px-2 py-5">{row.matchId}</td>
                <td className="px-2 py-5">{row.reclutador}</td>
                <td className="px-2 py-5">{row.experto}</td>
                <td className="px-2 py-5">{row.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totalItems">
          <p className="w-full text-right p-2 absolute bottom-0 right-0 px-16 py-8">
            <span className="text-primary font-semibold">Total: </span>
            <span>{data.data.length}</span>
          </p>
        </div>
      </div>
    </>
  );
}
