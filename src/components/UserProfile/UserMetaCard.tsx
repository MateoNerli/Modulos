import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/InputField";
import Label from "../form/Label";
import { FaEdit, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-700 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-700">
              <img
                src="http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white xl:text-left">
                Mateo Nerli
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Desarrollador
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  San Nicolas, Bs As
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {["facebook", "linkedin", "instagram"].map((platform) => (
                <button
                  key={platform}
                  className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  {platform === "facebook" && <FaFacebook />}
                  {platform === "linkedin" && <FaLinkedin />}
                  {platform === "instagram" && <FaInstagram />}
                </button>
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
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
              Editar perfil
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza redes sociales
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar pb-3 overflow-y-auto px-2">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white lg:mb-6">
                Redes sociales
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {["Facebook", "Linkedin", "Instagram"].map((platform) => (
                  <div key={platform}>
                    <Label>{platform}</Label>
                    <Input
                      type="text"
                      value={`https://www.${platform.toLowerCase()}.com/`}
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
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
