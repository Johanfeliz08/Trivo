import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import Cookies from "js-cookie";
import SimpleLoader from "../../SimpleLoader";

export default function Interests({ userIdProp }) {
  const userId = userIdProp ? userIdProp : Cookies.get("userId");
  const [interests, setInterests] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const hasEditPermission = userIdProp === Cookies.get("userId") ? true : false;

  const handleEditClick = () => {
    setIsEditable(!isEditable);
    setSearchTerm("");
    setIsSearching(false);
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(true);

    if (searchTerm != "" && term.length >= 1) {
      try {
        setSearchIsLoading(true);
        const response = await api.get(`/interests/search?nombre=${term}`);
        if (response.status === 200) {
          const results = response.data;
          if (results.length > 0) {
            setSearchResults(results);
          }
        } else if (response.status === 404) {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error al buscar intereses:", error);
      } finally {
        setSearchIsLoading(false);
      }
    }
  };

  const handleAddInterest = (interest) => {
    setIsSearching(false);
    setSearchTerm("");
    if (!interests.some((s) => s.interesId === interest.interesId)) {
      setInterests([...interests, interest]);
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i.interesId !== interest.interesId));
  };

  const handleSaveInterests = async () => {
    try {
      setIsLoading(true);
      const interestsIds = {
        interesIds: interests.map((interest) => interest.interesId),
      };

      if (userId) {
        const response = await api.put(`/users/${userId}/interests`, interestsIds, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setIsEditable(false);
          setSearchTerm("");
          setSearchResults([]);
          setIsSearching(false);
          await handleFetchInterests(); // Refresh the interests after saving
        }
      }
    } catch (error) {
      console.error("Error al guardar los intereses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchInterests = async () => {
    try {
      setIsLoading(true);
      if (userId) {
        const response = await api.get(`/users/${userId}/interests`);

        if (response.status === 200) {
          setInterests(response.data);
        }
      }
    } catch (error) {
      console.error("Error al cargar los intereses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchInterests();
  }, []);

  return (
    <>
      <div className="interests-container flex flex-col bg-bg-secondary rounded-2xl shadow-xl pt-10 px-10 gap-2">
        {isLoading && <SimpleLoader />}
        <div className="header flex flex-row justify-start gap-2 items-center ">
          <h3 className="text-xl font-semibold text-primary">Intereses</h3>
          <div className={`edit-btn flex justify-center items-center ${hasEditPermission ? "visible" : "invisible"}`}>
            <button type="button flex flex-row justify-center items-center " onClick={handleEditClick}>
              <div className="icon flex justify-center items-center hover:bg-white hover:rounded-full p-2 cursor-pointer transition-all ease-in-out duration-300">
                <svg className="size-5 fill-primary " xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M22.994,5.195c-.011-.067-.277-1.662-1.378-2.774-1.111-1.09-2.712-1.355-2.779-1.366-.119-.021-.239,.005-.342,.068-.122,.075-3.047,1.913-9.049,7.886C3.12,15.305,1.482,17.791,1.415,17.894c-.045,.07-.073,.15-.079,.233l-.334,4.285c-.011,.146,.042,.289,.145,.393,.094,.094,.221,.146,.354,.146,.013,0,.026,0,.039-.001l4.306-.333c.083-.006,.162-.033,.232-.078,.103-.066,2.6-1.697,8.924-7.991,6.002-5.974,7.848-8.886,7.923-9.007,.064-.103,.089-.225,.07-.344ZM14.295,13.838c-5.54,5.514-8.14,7.427-8.661,7.792l-3.59,.278,.278-3.569c.368-.521,2.292-3.109,7.828-8.619,1.773-1.764,3.278-3.166,4.518-4.264,.484,.112,1.721,.468,2.595,1.326,.868,.851,1.23,2.046,1.346,2.526-1.108,1.24-2.525,2.75-4.314,4.531Zm5.095-5.419c-.236-.681-.669-1.608-1.427-2.352-.757-.742-1.703-1.166-2.396-1.397,1.807-1.549,2.902-2.326,3.292-2.59,.396,.092,1.362,.375,2.05,1.049,.675,.682,.963,1.645,1.058,2.042-.265,.388-1.039,1.469-2.577,3.247Z" />
                </svg>
              </div>
            </button>
          </div>
          {/* <div className="add-btn flex justify-center items-center">
            <button type="button flex flex-row justify-center items-center " onClick={handleEditClick}>
              <div className="icon flex justify-center items-center hover:bg-white hover:rounded-full p-2 cursor-pointer transition-all ease-in-out duration-300">
                <svg className="size-5 fill-primary" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" width="512" height="512">
                  <g>
                    <path d="M490.667,234.667H277.333V21.333C277.333,9.551,267.782,0,256,0c-11.782,0-21.333,9.551-21.333,21.333v213.333H21.333   C9.551,234.667,0,244.218,0,256c0,11.782,9.551,21.333,21.333,21.333h213.333v213.333c0,11.782,9.551,21.333,21.333,21.333   c11.782,0,21.333-9.551,21.333-21.333V277.333h213.333c11.782,0,21.333-9.551,21.333-21.333   C512,244.218,502.449,234.667,490.667,234.667z" />
                  </g>
                </svg>
              </div>
            </button>
          </div> */}
        </div>
        <div className="content flex flex-col gap-4">
          <div className={`searchBar relative ${isEditable ? "block" : "hidden"}`}>
            <input
              type="text"
              name="searchInterest"
              id="searchInterest"
              placeholder="Buscar intereses"
              onChange={(e) => handleSearch(e)}
              className="bg-white border-primary border rounded-2xl p-2 2xl:w-100 focus:outline-primary"
              value={searchTerm}
              autoComplete="off"
            />
            {isSearching && searchTerm !== "" && (
              <div className="searchResults">
                <ul className="bg-white border-primary border rounded-2xl p-2 absolute top-full left-0 w-full z-10 overflow-scroll hide-scrollbar max-h-40">
                  {searchIsLoading && <SimpleLoader />}
                  {searchResults.length > 0 ? (
                    searchResults.map((interest) => (
                      <li key={interest.interesId} onClick={() => handleAddInterest(interest)} className="text-black cursor-pointer hover:bg-primary hover:text-white transition-all p-2 rounded-2xl">
                        {interest.nombre}
                      </li>
                    ))
                  ) : (
                    <li className="text-black">No hay resultados</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="interest-list flex flex-row justify-start items-center gap-x-2 gap-y-4 flex-wrap">
            {interests.length > 0 ? (
              interests.map((interest, i) => {
                return (
                  <div className="interest bg-primary rounded-2xl p-2 flex flex-row justify-center items-center relative shadow-md" key={i + 1}>
                    <span className="text-white font-light px-8">{interest.nombre}</span>
                    <div className={`remove-btn ${isEditable ? "block" : "hidden"} absolute right-2 top-2`}>
                      <button type="button" className="flex justify-center items-center cursor-pointer" onClick={() => handleRemoveInterest(interest)}>
                        <svg className="size-[14px] fill-white hover:fill-black transition-all" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                          <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-interests text-gray-500">No tiene intereses asignados.</div>
            )}
          </div>
        </div>
        <div className="footer flex justify-end py-4">
          <button
            type="button"
            className={`save-btn border border-primary py-2 px-5 rounded-2xl text-primary hover:bg-primary hover:text-white ease-in-out duration-400 cursor-pointer ${isEditable ? "block" : "hidden"}`}
            onClick={handleSaveInterests}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
