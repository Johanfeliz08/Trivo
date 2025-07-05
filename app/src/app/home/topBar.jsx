import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  return (
    <>
      <div>
        <button
          type="button"
          className="btn bg-primary p-3 text-white rounded-md shadow-md cursor-pointer"
          onClick={() => {
            Cookies.remove("tokenAcceso");
            Cookies.remove("tokenRefresco");
            router.push("/auth/login");
          }}
        >
          Cerrar sesion
        </button>
      </div>
    </>
  );
}
