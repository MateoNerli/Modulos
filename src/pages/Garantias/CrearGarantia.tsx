import { useState, useEffect } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

function CrearGarantia() {
  const [formData, setFormData] = useState({
    idCuenta: 0,
    tipoGarantia: "",
    productoComercial: "",
    fechaDeCarga: "",
    montoBruto: "",
    idAcreedor: 0,
    divisa: "",
    referido: "",
  });

  const [socios, setSocios] = useState<any[]>([]);
  const [acreedores, setAcreedores] = useState<any[]>([]);

  useEffect(() => {
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
    console.log("Form data:", formData);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/garantia`, formData)
      .then((response) => {
        alert("Garantia creada con éxito");
        console.log("Garantia creada con éxito:", response.data);
      })
      .catch((error) => console.error("Error al crear garantia:", error));
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
                {/* Campo Producto Comercial */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Producto Comercial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.productoComercial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productoComercial: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Monto Bruto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Monto Bruto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.montoBruto}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        montoBruto: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Socio Participante */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Socio Participe/Tercero{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.idCuenta}
                    onChange={(e) => {
                      const selectedValue = parseInt(e.target.value);
                      console.log("Selected value:");
                      setFormData({
                        ...formData,
                        idCuenta: selectedValue,
                      });
                    }}
                  >
                    <option value="">--Seleccionar--</option>
                    {socios.map((socio) => (
                      <option key={socio.idCuenta} value={socio.idCuenta}>
                        {socio.nombreCuenta}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campo Acreedor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Acreedor <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.idAcreedor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idAcreedor: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">--Seleccionar--</option>
                    {acreedores.map((acreedor) => (
                      <option
                        key={acreedor.idAcreedor}
                        value={acreedor.idAcreedor}
                      >
                        {acreedor.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Operación <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.tipoGarantia}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipoGarantia: e.target.value,
                      })
                    }
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
                      value={formData.fechaDeCarga.split("T")[0]} // Mostrar solo la fecha en el input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fechaDeCarga: new Date(e.target.value).toISOString(), // Convertir a UTC
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Divisa
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    value={formData.divisa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        divisa: e.target.value,
                      })
                    }
                  >
                    <option value="">--Seleccionar--</option>
                    <option value="Pesos Argentinos">Pesos argentinos</option>
                    <option value="Dolares">Dolares</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Referido
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    value={formData.referido}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referido: e.target.value,
                      })
                    }
                  />
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
