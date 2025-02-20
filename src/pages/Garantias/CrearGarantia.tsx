import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

function CrearGarantia() {
  const [formData, setFormData] = useState({
    socioParticipe: "",
    tipoOperacion: "",
    productoComercial: "",
    fechaCarga: "",
    montoBruto: "",
    referido: "",
    acreedor: "",
    divisa: "Pesos Argentinos",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <PageMeta title="Crear garantias" />
      <PageBreadcrumb
        pageTitle="Garantias"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Garantias", path: "/garantias" },
          { name: "Crear Garantia", path: "/garantias/crear" },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700 ">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Crear Garantía
              </h1>
            </div>

            <div className="mt-4">
              <button className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-2 mr-4">
                General
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 ">
            <div className="space-y-4 ">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                Datos Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Socio Participe/Tercero",
                    required: true,
                    type: "text",
                  },
                  { label: "Producto Comercial", required: true, type: "text" },
                  { label: "Monto Bruto", required: true, type: "number" },
                  { label: "Acreedor", required: true, type: "text" },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                      required={field.required}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Operación <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                  >
                    <option value="">--Seleccionar--</option>
                    <option value="tipo1">Tipo 1</option>
                    <option value="tipo2">Tipo 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Carga <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Divisa
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                      required
                    >
                      <option value="">--Seleccionar--</option>
                      <option value="tipo1">Pesos argentinos</option>
                      <option value="tipo2">Dolares</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                  >
                    Crear Garantía
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearGarantia;
