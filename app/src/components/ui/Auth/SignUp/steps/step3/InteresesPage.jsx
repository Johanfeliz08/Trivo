// import interesesData from "@/lib/mock_data/intereses.json";
import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import Loader from "@/components/ui/Loader";

export default function InteresesPage({ userData, setUserData }) {
  // Intereses

  const [intereses, setIntereses] = useState([]);

  // Controlar la paginacion de las categorias de intereses
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Cantidad de items por pagina
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    noData: {
      error: false,
      message: "",
    },
  });

  // Obtener los intereses

  useEffect(() => {
    const response = async () => {
      if (userData.categoriasIntereses.length > 0) {
        try {
          setIsLoading(true);
          const params = new URLSearchParams();

          userData.categoriasIntereses.forEach((categoria) => {
            params.append("categoriaIds", categoria);
          });

          params.append("numeroPagina", currentPage);
          params.append("tamanoPagina", itemsPerPage);

          const res = await api.get(`/interests/by-categories?${params.toString()}`);

          if (res.status === 200) {
            const data = res.data;

            if (data.elementos.length > 0) {
              let interesesList = [];

              data.elementos.map((interes) => {
                interesesList.push({
                  interesId: interes.interesId,
                  nombre: interes.nombre,
                });
              });

              setIntereses(interesesList);
              setTotalPages(data.totalPaginas);
              setCurrentPage(data.paginaActual);

              setErrors((prevErrors) => ({
                ...prevErrors,
                noData: {
                  error: false,
                  message: "Categorias de intereses obtenidas correctamente.",
                },
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                noData: {
                  error: true,
                  message: "No hay intereses disponibles.",
                },
              }));
            }
          } else {
            console.error("Error al obtener los intereses:", res.statusText);
          }
        } catch (error) {
          console.error("Error al obtener los intereses:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          noData: {
            error: true,
            message: "Debe seleccionar al menos una categoria de interes.",
          },
        }));
      }
    };
    response();
  }, [currentPage]);

  return (
    <>
      <div className="intereses-container min-h-110 flex flex-row justify-center items-center gap-8">
        {isLoading && <Loader />}
        <div className="back-pg-btn">
          <button
            type="button"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className="bg-bg-secondary rounded-lg shadow-xs p-2 border-2 border-transparent hover:border-primary hover:border-2 cursor-pointer transition-all"
          >
            <div className="arrow">
              <svg className="size-10 fill-primary rotate-180" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="pagination-container relative flex flex-col justify-center items-center gap-14 min-w-full">
          <div className="intereses grid grid-cols-2 grid-rows-[repeat(4,_92px)] gap-4 justify-center items-start min-h-[368px]">
            {intereses.map((interes) => (
              <div className="interes flex flex-row" key={interes.interesId}>
                <input
                  className="hidden"
                  type="checkbox"
                  name={interes.nombre}
                  id={interes.interesId}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserData((prevData) => ({
                        ...prevData,
                        intereses: [...prevData.intereses, interes.interesId],
                      }));
                    } else {
                      setUserData((prevData) => ({
                        ...prevData,
                        intereses: prevData.intereses.filter((i) => i !== interes.interesId),
                      }));
                    }
                  }}
                />
                <label
                  htmlFor={interes.interesId}
                  className={`flex relative justify-start items-center rounded-xl border-2 cursor-pointer shadow-sm bg-bg-secondary w-56 h-20 p-5 ${
                    userData.intereses.find((i) => i === interes.interesId) ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div className={`icon absolute top-0 right-0 p-1 ${userData.intereses.find((i) => i === interes.interesId) ? "flex" : "hidden"}`}>
                    <svg className="size-8 fill-primary" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                      <path d="M10.5 15.25C10.307 15.2353 10.1276 15.1455 9.99998 15L6.99998 12C6.93314 11.8601 6.91133 11.7029 6.93756 11.55C6.96379 11.3971 7.03676 11.2562 7.14643 11.1465C7.2561 11.0368 7.39707 10.9638 7.54993 10.9376C7.70279 10.9114 7.86003 10.9332 7.99998 11L10.47 13.47L19 5.00004C19.1399 4.9332 19.2972 4.91139 19.45 4.93762C19.6029 4.96385 19.7439 5.03682 19.8535 5.14649C19.9632 5.25616 20.0362 5.39713 20.0624 5.54999C20.0886 5.70286 20.0668 5.86009 20 6.00004L11 15C10.8724 15.1455 10.6929 15.2353 10.5 15.25Z" />
                      <path d="M12 21C10.3915 20.9974 8.813 20.5638 7.42891 19.7443C6.04481 18.9247 4.90566 17.7492 4.12999 16.34C3.54037 15.29 3.17596 14.1287 3.05999 12.93C2.87697 11.1721 3.2156 9.39921 4.03363 7.83249C4.85167 6.26578 6.1129 4.9746 7.65999 4.12003C8.71001 3.53041 9.87134 3.166 11.07 3.05003C12.2641 2.92157 13.4719 3.03725 14.62 3.39003C14.7224 3.4105 14.8195 3.45215 14.9049 3.51232C14.9903 3.57248 15.0622 3.64983 15.116 3.73941C15.1698 3.82898 15.2043 3.92881 15.2173 4.03249C15.2302 4.13616 15.2214 4.2414 15.1913 4.34146C15.1612 4.44152 15.1105 4.53419 15.0425 4.61352C14.9745 4.69286 14.8907 4.75712 14.7965 4.80217C14.7022 4.84723 14.5995 4.87209 14.4951 4.87516C14.3907 4.87824 14.2867 4.85946 14.19 4.82003C13.2186 4.52795 12.1987 4.43275 11.19 4.54003C10.193 4.64212 9.22694 4.94485 8.34999 5.43003C7.50512 5.89613 6.75813 6.52088 6.14999 7.27003C5.52385 8.03319 5.05628 8.91361 4.77467 9.85974C4.49307 10.8059 4.40308 11.7987 4.50999 12.78C4.61208 13.777 4.91482 14.7431 5.39999 15.62C5.86609 16.4649 6.49084 17.2119 7.23999 17.82C8.00315 18.4462 8.88357 18.9137 9.8297 19.1953C10.7758 19.4769 11.7686 19.5669 12.75 19.46C13.747 19.3579 14.713 19.0552 15.59 18.57C16.4349 18.1039 17.1818 17.4792 17.79 16.73C18.4161 15.9669 18.8837 15.0864 19.1653 14.1403C19.4469 13.1942 19.5369 12.2014 19.43 11.22C19.4201 11.1169 19.4307 11.0129 19.461 10.9139C19.4914 10.8149 19.5409 10.7228 19.6069 10.643C19.6728 10.5631 19.7538 10.497 19.8453 10.4485C19.9368 10.3999 20.0369 10.3699 20.14 10.36C20.2431 10.3502 20.3471 10.3607 20.4461 10.3911C20.5451 10.4214 20.6372 10.471 20.717 10.5369C20.7969 10.6028 20.863 10.6839 20.9115 10.7753C20.9601 10.8668 20.9901 10.9669 21 11.07C21.1821 12.829 20.842 14.6026 20.0221 16.1695C19.2022 17.7363 17.9389 19.0269 16.39 19.88C15.3288 20.4938 14.1495 20.8755 12.93 21C12.62 21 12.3 21 12 21Z" />
                    </svg>
                  </div>
                  <p className="font-medium text-lg">{interes.nombre}</p>
                </label>
              </div>
            ))}
          </div>
          {errors.noData.error && (
            <div className="no-data flex justify-center items-center absolute">
              <p className="text-center text-primary">{errors.noData.message}</p>
            </div>
          )}
          <div className="pagination">
            <p className="text-center text-sm text-primary">
              Página {currentPage} de {totalPages}
            </p>
          </div>
        </div>
        <div className="next-pg-btn">
          <button
            type="button"
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="bg-bg-secondary shadow-xs p-2 rounded-lg border-2 border-transparent hover:border-primary hover:border-2 cursor-pointer transition-all"
          >
            <div className="arrow">
              <svg className="size-10 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
