import { useEffect, useState } from "react";
import api from "@/lib/api/api";
import SimpleLoader from "../../SimpleLoader";
import Cookies from "js-cookie";
import { set } from "zod/v4";

export default function AboutMe({ userIdProp }) {
  const [bio, setBio] = useState("");
  const userId = userIdProp ? userIdProp : Cookies.get("userId");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userBio = {
        biografia: bio,
      };

      if (userId) {
        const response = await api.put(`/users/${userId}/bio`, userBio, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setBio(bio);
          await fetchUserBio();
        }
      }
    } catch (error) {
      console.error("Error al guardar la biografía:", error);
    } finally {
      setIsEditable(false);
      setIsLoading(false);
    }
  };

  const fetchUserBio = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users/${userId}/bio`);
      if (response.status === 200) {
        setBio(response.data.biografia);
      }
    } catch (error) {
      console.error("Error al cargar la biografía:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBio();
  }, []);

  return (
    <>
      <div className="aboutme-container flex flex-col bg-bg-secondary rounded-2xl shadow-xl pt-10 px-10 gap-2 relative">
        {isLoading && <SimpleLoader />}
        <div className="header flex flex-row justify-start gap-3 items-center ">
          <h3 className="text-xl font-semibold text-primary">Acerca de mí</h3>
          <div className="edit-btn flex justify-center items-center">
            <button type="button flex flex-row justify-center items-center " onClick={handleEditClick}>
              <div className="icon flex justify-center items-center hover:bg-white hover:rounded-full p-2 cursor-pointer transition-all ease-in-out duration-300">
                <svg className="size-5 fill-primary " xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                  <path d="M22.994,5.195c-.011-.067-.277-1.662-1.378-2.774-1.111-1.09-2.712-1.355-2.779-1.366-.119-.021-.239,.005-.342,.068-.122,.075-3.047,1.913-9.049,7.886C3.12,15.305,1.482,17.791,1.415,17.894c-.045,.07-.073,.15-.079,.233l-.334,4.285c-.011,.146,.042,.289,.145,.393,.094,.094,.221,.146,.354,.146,.013,0,.026,0,.039-.001l4.306-.333c.083-.006,.162-.033,.232-.078,.103-.066,2.6-1.697,8.924-7.991,6.002-5.974,7.848-8.886,7.923-9.007,.064-.103,.089-.225,.07-.344ZM14.295,13.838c-5.54,5.514-8.14,7.427-8.661,7.792l-3.59,.278,.278-3.569c.368-.521,2.292-3.109,7.828-8.619,1.773-1.764,3.278-3.166,4.518-4.264,.484,.112,1.721,.468,2.595,1.326,.868,.851,1.23,2.046,1.346,2.526-1.108,1.24-2.525,2.75-4.314,4.531Zm5.095-5.419c-.236-.681-.669-1.608-1.427-2.352-.757-.742-1.703-1.166-2.396-1.397,1.807-1.549,2.902-2.326,3.292-2.59,.396,.092,1.362,.375,2.05,1.049,.675,.682,.963,1.645,1.058,2.042-.265,.388-1.039,1.469-2.577,3.247Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="content">
          <textarea
            name="biografia"
            id="biografia"
            className={`resize-none text-gray-600 h-auto xl:min-h-15 2xl:min-h-25 font-light text-md w-full focus:outline-0 hide-scrollbar ${isEditable ? "border-b-2 border-primary" : ""}`}
            readOnly={!isEditable}
            value={bio ? bio : "No tiene biografía."}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="footer flex justify-end py-4">
          <button
            type="button"
            className={`save-btn border border-primary py-2 px-5 rounded-2xl text-primary hover:bg-primary hover:text-white ease-in-out duration-400 cursor-pointer ${isEditable ? "block" : "hidden"}`}
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
