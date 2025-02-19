import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { FaEdit } from "react-icons/fa";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  // Estado para manejar la información del usuario
  const [userInfo, setUserInfo] = useState({
    Nombre: "Mateo",
    Apellido: "Nerli",
    Email: "mnerli2003@gmail.com",
    Celular: "+54 3364512460",
    Bio: "Desarrollador",
  });

  // Estado temporal para edición
  const [editUserInfo, setEditUserInfo] = useState({ ...userInfo });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserInfo({
      ...editUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setUserInfo(editUserInfo); // Guardar cambios en el estado principal
    console.log("Datos actualizados:", editUserInfo); // Simulación de API call
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Información Personal
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {Object.entries(userInfo).map(([key, value]) => (
              <div key={key}>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <FaEdit />
        </button>
      </div>

      {/* Modal de Edición */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Información Personal
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza tu información personal
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {Object.entries(editUserInfo).map(([key, value]) => (
                    <div key={key} className="col-span-2 lg:col-span-1">
                      <Label>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
