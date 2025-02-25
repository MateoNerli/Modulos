import { useState, useEffect } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

function CrearCuenta() {
  const [formData, setFormData] = useState({
    nombreCuenta: "",
    tipoDeDocuemnto: "",
    numeroDeDocumento: "",
    personeria: "",
    rolCuenta: "",
    relacionamientoSGR: "",
  });

  // Para manejar la lista de posibles valores
  const [socios, setSocios] = useState<any[]>([]);
  const [acreedores, setAcreedores] = useState<any[]>([]);

  useEffect(() => {
    // Fetch para obtener socios y acreedores
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cuenta`)
      .then((response) => {
        setSocios(response.data);
      })
      .catch((error) => console.error("Error al obtener socios:", error));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/acreedor`)
      .then((response) => {
        setAcreedores(response.data);
      })
      .catch((error) => console.error("Error al obtener acreedores:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviar los datos del formulario al backend
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/cuenta`, formData)
      .then((response) => {
        alert("Cuenta creada con éxito");
        console.log("Cuenta creada con éxito:", response.data);
      })
      .catch((error) => console.error("Error al crear cuenta:", error));
  };

  return (
    <>
      <PageMeta title="Crear Cuenta" />
      <PageBreadcrumb
        pageTitle="Cuentas"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Cuentas", path: "/cuenta" },
          { name: "Crear Cuenta", path: "/cuenta/crear" },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Crear Cuenta
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                Datos Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Campo Nombre Cuenta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre de Cuenta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.nombreCuenta}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nombreCuenta: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Tipo de Documento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Documento <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.tipoDeDocuemnto}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipoDeDocuemnto: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="dni">DNI</option>
                    <option value="cuit">CUIT</option>
                  </select>
                </div>

                {/* Número de Documento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Número de Documento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.numeroDeDocumento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numeroDeDocumento: e.target.value,
                      })
                    }
                  />
                </div>

                {/*Relacionamiento*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relacionamiento SGR <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.relacionamientoSGR}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        relacionamientoSGR: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Personería */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Personería <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.personeria}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personeria: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="juridica">Jurídica</option>
                    <option value="fisica">Física</option>
                  </select>
                </div>
                {/* Rol de Cuenta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rol de Cuenta <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.rolCuenta}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rolCuenta: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="1">Rol 1</option>
                    <option value="2">Rol 2</option>
                    <option value="3">Rol 3</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                >
                  Crear Cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearCuenta;
