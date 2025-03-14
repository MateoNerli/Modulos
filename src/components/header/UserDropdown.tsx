import { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { Cuenta } from "../../Interface/Cuenta";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const navigate = useNavigate();
  const authcontex = useAuth();
  const { user } = authcontex;

  useEffect(() => {
    if (user?.name) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get(
        "/api/Usuario/username/" + user?.name
      );
      setCuenta(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(cuenta);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  const EliminarToken = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/user.jpg" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name}
        </span>
        <FaAngleDown />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {cuenta?.nombre} {cuenta?.apellido}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {cuenta?.email}
          </span>
        </div>

        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <FaUserAlt
            className="fill-gray-500 group-hover:fill-gray-700
              dark:fill-gray-400 dark:group-hover:fill-gray-300"
          />
          Editar perfil
        </Link>
        <Link
          to="/signin"
          onClick={EliminarToken}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <FaSignOutAlt />
          Cerrar sesión
        </Link>
      </Dropdown>
    </div>
  );
}
