import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/Input";
import Label from "../form/Label";
import { FaEdit } from "react-icons/fa";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";

interface Cuenta {
  cuenta: {
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    biografia: string;
    idUsuario: string;
  };
}

export default function UserInfoCard({ cuenta }: Cuenta) {
  const { isOpen, openModal, closeModal } = useModal();

  const [userInfo, setUserInfo] = useState({
    nombre: cuenta?.nombre,
    apellido: cuenta?.apellido,
    email: cuenta?.email,
    celular: cuenta?.celular,
    biografia: cuenta?.biografia,
  });

  useEffect(() => {
    setUserInfo({
      nombre: cuenta?.nombre,
      apellido: cuenta?.apellido,
      email: cuenta?.email,
      celular: cuenta?.celular,
      biografia: cuenta?.biografia,
    });
  }, [cuenta]);

  const handleSave = async (values: typeof userInfo) => {
    try {
      const updatedUserInfo = {
        ...cuenta,
        ...values,
      };

      const payload = {
        ...updatedUserInfo,
        IdUsuario: cuenta.idUsuario,
      };
      const response = await axiosInterceptor.post(`/api/Usuario`, payload);

      console.log("Response from backend:", response.data);

      if (response.status === 200) {
        setUserInfo(response.data);
        closeModal();
      } else {
        toast.error("Error al actualizar la información");
      }
    } catch (error) {
      toast.error("Error al actualizar la información: " + error);
    }
  };

  const personalInfoKeys = [
    "nombre",
    "apellido",
    "email",
    "celular",
    "biografia",
  ];

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Información Personal
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            {personalInfoKeys.map((key) => (
              <div key={key}>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {userInfo[key as keyof typeof userInfo]}
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

          {/* Formik Form */}
          <Formik initialValues={userInfo} onSubmit={handleSave}>
            {({ values, handleChange }) => (
              <Form className="flex flex-col">
                <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                  <div className="mt-7">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      {personalInfoKeys.map((key) => (
                        <div key={key} className="col-span-2 lg:col-span-1">
                          <Label>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Label>
                          <Field
                            type="text"
                            name={key}
                            value={values[key as keyof typeof values]}
                            onChange={handleChange}
                            as={Input}
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
                  <Button size="sm" type="submit">
                    Guardar Cambios
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
