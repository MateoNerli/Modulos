import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { FaEdit } from "react-icons/fa";

export default function TarjetaDireccionUsuario() {
  const { isOpen, openModal, closeModal } = useModal();
  const [direccion] = useState({
    pais: "Aregntina",
    ciudadEstado: "San Nicolas",
    codigoPostal: "2900",
    direccion: "Cernadas 363",
  });

  const handleChange = () => {
    console.log("Cambiando dirección...");
  };

  const handleSave = () => {
    console.log("Guardando cambios...", direccion);
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Dirección
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              {Object.entries(direccion).map(([key, value]) => (
                <div key={key}>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("Estado", "Estado/Ciudad")}
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
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-full shadow-theme-xs bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 lg:w-auto"
          >
            <FaEdit />
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Dirección
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza tu información para mantener tu perfil al día.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {Object.entries(direccion).map(([key, value]) => (
                  <div key={key}>
                    <Label>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace("Estado", "Estado/Ciudad")}
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
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cerrar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
