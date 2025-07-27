"use client";
import { Checkbox } from "@/components/ui/CheckBox";
import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import SimpleLoader from "@/components/ui/SimpleLoader";

export default function FiltersModal({ isFiltersModalOpen, setIsFiltersModalOpen }) {
  const itemsPerPage = 15;

  // Interests state management
  const [interests, setInterests] = useState({
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isInterestsLoading, setIsInterestsLoading] = useState(false);

  // Skills state management
  const [skills, setSkills] = useState({
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  });
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const fetchInterests = async () => {
    setIsInterestsLoading(true);
    try {
      const response = await api.get(`/interests/pagination?numeroPagina=${interests.currentPage}&tamanoPagina=${itemsPerPage}`);
      if (response.status === 200) {
        setInterests((prevInterests) => ({
          ...prevInterests,
          data: response.data.elementos,
          currentPage: response.data.paginaActual,
          totalPages: response.data.totalPaginas,
          totalElements: response.data.totalElementos,
        }));
      } else {
        console.error("Failed to fetch interests:", response);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setIsInterestsLoading(false);
    }
  };

  const fetchSkills = async () => {
    setIsSkillsLoading(true);
    try {
      const response = await api.get(`/ability/pagination?numeroPagina=${skills.currentPage}&tamanoPagina=${itemsPerPage}`);
      if (response.status === 200) {
        setSkills((prevSkills) => ({
          ...prevSkills,
          data: response.data.elementos,
          currentPage: response.data.paginaActual,
          totalPages: response.data.totalPaginas,
          totalElements: response.data.totalElementos,
        }));
      } else {
        console.error("Failed to fetch skills:", response);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setIsSkillsLoading(false);
    }
  };

  const handleSkillsPageChange = (page) => {
    if (page < 1 || page > skills.totalPages) return;

    setSkills((prevSkills) => ({
      ...prevSkills,
      currentPage: page,
    }));
  };

  const handleInterestsPageChange = (page) => {
    if (page < 1 || page > interests.totalPages) return;
    setInterests((prevInterests) => ({
      ...prevInterests,
      currentPage: page,
    }));
  };

  const handleSelectSkill = (skillId) => {
    if (!skillId) return;

    const isAlreadySelected = selectedSkills.includes(skillId);
    if (isAlreadySelected) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleSelectInterest = (interestId) => {
    if (!interestId) return;

    const isAlreadySelected = selectedInterests.includes(interestId);
    if (isAlreadySelected) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [skills.currentPage]);

  useEffect(() => {
    fetchInterests();
  }, [interests.currentPage]);

  return (
    <>
      <div className={`modalFilters w-full h-full xl:p-10 z-100 absolute ${isFiltersModalOpen ? "modalPerfilOpen" : ""} transition-opacity duration-300 ease-in-out`}>
        <div className="filters-container bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title flex flex-row justify-start items-center gap-4">
              <div className="icon">
                <svg className="size-10 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="m18,5.92c0-2.162-1.758-3.92-3.92-3.92H3.92C1.758,2,0,3.758,0,5.92c0,.935.335,1.841.944,2.551l5.056,5.899v3.63c0,.315.148.611.4.8l4,3c.177.132.388.2.6.2.152,0,.306-.035.447-.105.339-.169.553-.516.553-.895v-6.63l5.056-5.899c.609-.71.944-1.616.944-2.551Zm-2.462,1.25l-5.297,6.18c-.155.181-.241.412-.241.651v5l-2-1.5v-3.5c0-.239-.085-.47-.241-.651L2.462,7.169c-.298-.348-.462-.792-.462-1.25,0-1.059.861-1.92,1.92-1.92h10.16c1.059,0,1.92.861,1.92,1.92,0,.458-.164.902-.462,1.25Zm8.462,12.831c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm0-4c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm-6-5h5c.552,0,1,.448,1,1s-.448,1-1,1h-5c-.552,0-1-.448-1-1s.448-1,1-1Z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-primary">Filtros de busqueda</h2>
            </div>
            <div className="close-btn">
              <button type="button" className="cursor-pointer" onClick={() => setIsFiltersModalOpen(false)}>
                <div className="icon cursor-pointer">
                  <svg className="size-10 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="content w-full h-full flex flex-col items-start justify-start px-20 py-10 overflow-scroll hide-scrollbar">
            <div className="filter-section flex flex-col gap-6 border-b border-gray-200 w-full py-10 relative ">
              <div className="section-header">
                <h3 className="text-primary text-3xl">Habilidades</h3>
              </div>
              <div className="filters grid grid-cols-4 row-auto gap-6">
                {isSkillsLoading ? (
                  <SimpleLoader />
                ) : skills.data.length > 0 ? (
                  skills.data.map((skill) => (
                    <div key={skill.habilidadId} className="filter flex flex-row justify-start items-center">
                      <Checkbox
                        className={"checked:bg-primary size-6"}
                        id={skill.habilidadId}
                        onCheckedChange={() => {
                          handleSelectSkill(skill.habilidadId);
                        }}
                      />
                      <label htmlFor={skill.habilidadId} className="text-2xl ml-2 opacity-70 font-regular hover:underline hover:cursor-pointer">
                        {skill.nombre}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="no-results text-gray-500">No se encontraron habilidades.</div>
                )}
              </div>
              <div className="section-footer">
                <div className="pagination flex flex-row justify-end items-center gap-1">
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-bg-secondary rounded-xl p-1 transition-all"
                    onClick={() => handleSkillsPageChange(skills.currentPage - 1)}
                    disabled={skills.currentPage === 1}
                  >
                    <div className="arrow">
                      <svg className="size-7 fill-primary rotate-180" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                      </svg>
                    </div>
                  </button>
                  <p>
                    Página {skills.currentPage} de {skills.totalPages}
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-bg-secondary rounded-xl p-1 transition-all"
                    onClick={() => handleSkillsPageChange(skills.currentPage + 1)}
                    disabled={skills.currentPage === skills.totalPages}
                  >
                    <div className="arrow">
                      <svg className="size-7 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="filter-section flex flex-col gap-6 border-b border-gray-200 w-full py-10 relative ">
              <div className="section-header">
                <h3 className="text-primary text-3xl">Intereses</h3>
              </div>
              <div className="filters grid grid-cols-4 row-auto gap-6">
                {isInterestsLoading ? (
                  <SimpleLoader />
                ) : interests.data.length > 0 ? (
                  interests.data.map((interest) => (
                    <div key={interest.interesId} className="filter flex flex-row justify-start items-center">
                      <Checkbox className={"checked:bg-primary size-6"} id={interest.interesId} onCheckedChange={() => handleSelectInterest(interest.interesId)} />
                      <label htmlFor={interest.interesId} className="text-2xl ml-2 opacity-70 font-regular hover:underline hover:cursor-pointer">
                        {interest.nombre}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="no-results text-gray-500">No se encontraron intereses.</div>
                )}
              </div>
              <div className="section-footer">
                <div className="pagination flex flex-row justify-end items-center gap-1">
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-bg-secondary rounded-xl p-1 transition-all"
                    onClick={() => handleInterestsPageChange(interests.currentPage - 1)}
                    disabled={interests.currentPage === 1}
                  >
                    <div className="arrow">
                      <svg className="size-7 fill-primary rotate-180" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                      </svg>
                    </div>
                  </button>
                  <p>
                    Página {interests.currentPage} de {interests.totalPages}
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer hover:bg-bg-secondary rounded-xl p-1 transition-all"
                    onClick={() => handleInterestsPageChange(interests.currentPage + 1)}
                    disabled={interests.currentPage === interests.totalPages}
                  >
                    <div className="arrow">
                      <svg className="size-7 fill-primary" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
