import { useState, useEffect } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

function CrearAcreedor() {
  const [formData, setFormData] = useState({
    nombre: "",
    cuit: "",
    tipoDeAcreedor: "",
    tipoDeAcreedorCVN: "",
    codigoEntidadesOperacionesAfrontadas: "",
    montoCalificado: "",
    fechaDeCalificacion: "",
    fechaDeVencimiento: "",
    informeBCRA: "",
    porcentaje: "",
    saldoGarantiasVigente: "",
    saldoGarantiasOperativo: "",
    idBanco: 0,
  });

  const [bancos, setBancos] = useState<any[]>([]);

  useEffect(() => {
    // Obtener bancos
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/banco`)
      .then((response) => {
        setBancos(response.data);
      })
      .catch((error) => console.error("Error al obtener bancos:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviar los datos del formulario al backend
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/acreedor`, formData)
      .then((response) => {
        alert("Acreedor creado con éxito");
        console.log("Acreedor creado con éxito:", response.data);
      })
      .catch((error) => console.error("Error al crear acreedor:", error));
  };

  return (
    <>
      <PageMeta title="Crear Acreedor" />
      <PageBreadcrumb
        pageTitle="Acreedores"
        paths={[
          { name: "Inicio", path: "/dashboard" },
          { name: "Acreedores", path: "/acreedor" },
          { name: "Crear Acreedor", path: "/acreedor/crear" },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Crear Acreedor
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                Datos Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Campo Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </div>

                {/* Campo CUIT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CUIT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.cuit}
                    onChange={(e) =>
                      setFormData({ ...formData, cuit: e.target.value })
                    }
                  />
                </div>

                {/* Select Banco */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Banco <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.idBanco}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        idBanco: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {bancos.map((banco) => (
                      <option key={banco.id} value={banco.id}>
                        {banco.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tipo de Acreedor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Acreedor <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.tipoDeAcreedor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipoDeAcreedor: e.target.value,
                      })
                    }
                  >
                    <option value="Tipo 1">Tipo 1</option>
                    <option value="Tipo 2">Tipo 2</option>
                    <option value="Tipo 3">Tipo 3</option>
                  </select>
                </div>

                {/* Tipo de Acreedor CVN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Acreedor CVN <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.tipoDeAcreedorCVN}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipoDeAcreedorCVN: e.target.value,
                      })
                    }
                  >
                    <option value="Tipo 1">Tipo 1</option>
                    <option value="Tipo 2">Tipo 2</option>
                    <option value="Tipo 3">Tipo 3</option>
                  </select>
                </div>

                {/* Campo Monto Calificado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Monto Calificado <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.montoCalificado}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        montoCalificado: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Fecha de Calificación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Calificación{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.fechaDeCalificacion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fechaDeCalificacion: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Fecha de Vencimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Vencimiento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.fechaDeVencimiento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fechaDeVencimiento: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Informe BCRA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Informe BCRA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.informeBCRA}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        informeBCRA: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Porcentaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Porcentaje <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.porcentaje}
                    onChange={(e) =>
                      setFormData({ ...formData, porcentaje: e.target.value })
                    }
                  />
                </div>

                {/* Campo Saldo Garantias Vigente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Saldo Garantias Vigente{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.saldoGarantiasVigente}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        saldoGarantiasVigente: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Campo Saldo Garantias Operativo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Saldo Garantias Operativo{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.saldoGarantiasOperativo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        saldoGarantiasOperativo: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Código Entidades Operaciones Afrontadas{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.codigoEntidadesOperacionesAfrontadas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        codigoEntidadesOperacionesAfrontadas: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                >
                  Crear Acreedor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CrearAcreedor;
