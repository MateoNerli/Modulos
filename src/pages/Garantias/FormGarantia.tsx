/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import InputText from "../../components/form/InputText";
import SelectInput from "../../components/form/SelectInput";
import InputNumber from "../../components/form/InputNumber";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

function FormGarantia() {
  const [formData, setFormData] = useState({
    idCuenta: 0,
    tipoGarantia: "",
    productoComercial: "",
    fechaDeCarga: "",
    montoBruto: "",
    idAcreedor: 0,
    divisa: "",
  });

  const [socios, setSocios] = useState<any[]>([]);
  const [acreedores, setAcreedores] = useState<any[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    axiosInterceptor
      .get(`/api/cuenta`)
      .then((response) => {
        setSocios(response.data);
      })
      .catch((error) => console.error("Error al obtener socios:", error));
    axiosInterceptor
      .get(`/api/acreedor`)
      .then((response) => {
        setAcreedores(response.data);
      })
      .catch((error) => console.error("Error al obtener acreedores:", error));

    if (isEditMode) {
      axiosInterceptor
        .get(`}/api/garantia/${id}`)
        .then((response) => {
          const data = response.data;
          data.fechaDeCarga = new Date(data.fechaDeCarga)
            .toISOString()
            .split("T")[0];
          setFormData(data);
        })
        .catch((error) => console.error("Error al obtener garantía:", error));
    }
  }, [id, isEditMode]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);

    // Convertir fechaDeCarga a UTC antes de enviar
    const formDataToSend = {
      ...formData,
      fechaDeCarga: new Date(formData.fechaDeCarga).toISOString(),
    };

    const apiCall = isEditMode
      ? axiosInterceptor.put(`/api/garantia/${id}`, formDataToSend) // Editar
      : axiosInterceptor.post(`/api/garantia`, formDataToSend); // Crear

    apiCall
      .then((response) => {
        toast.success(
          isEditMode
            ? "Garantía editada con éxito"
            : "Garantía creada con éxito"
        );
        navigate("/garantias"); // Redirigir a la lista de garantías
      })
      .catch((error) => console.error("Error al procesar garantía:", error));
  };

  return (
    <>
      <PageMeta title={isEditMode ? "Editar Garantía" : "Crear Garantía"} />
      <PageBreadcrumb
        pageTitle={"Garantía"}
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Garantías", path: "/garantias" },
          {
            name: isEditMode ? "Editar Garantía" : "Crear Garantía",
            path: `/garantias/${isEditMode ? `editar/${id}` : "crear"}`,
          },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700 ">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {isEditMode ? "Editar Garantía" : "Crear Garantía"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 ">
            <div className="space-y-4 ">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                Datos Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InputText
                  label="Producto Comercial"
                  name="productoComercial"
                  value={formData.productoComercial}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productoComercial: e.target.value,
                    })
                  }
                />
                <InputNumber
                  label="Monto Bruto"
                  name="montoBruto"
                  value={formData.montoBruto}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, montoBruto: e.target.value })
                  }
                />
                <SelectInput
                  label="Socio Participante"
                  name="idCuenta"
                  value={formData.idCuenta}
                  required
                  options={socios.map((socio) => ({
                    label: socio.nombreCuenta,
                    value: socio.idCuenta,
                  }))}
                  onChange={(e) => {
                    const selectedValue = parseInt(e.target.value);
                    setFormData({ ...formData, idCuenta: selectedValue });
                  }}
                />
                <SelectInput
                  label="Acreedor"
                  name="idAcreedor"
                  value={formData.idAcreedor}
                  required
                  options={acreedores.map((acreedor) => ({
                    label: acreedor.nombre,
                    value: acreedor.idAcreedor,
                  }))}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      idAcreedor: parseInt(e.target.value),
                    })
                  }
                />
                <SelectInput
                  label="Tipo de Operación"
                  name="tipoGarantia"
                  value={formData.tipoGarantia}
                  required
                  options={[
                    { label: "Tipo 1", value: "tipo1" },
                    { label: "Tipo 2", value: "tipo2" },
                  ]}
                  onChange={(e) =>
                    setFormData({ ...formData, tipoGarantia: e.target.value })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Carga <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
                    required
                    value={formData.fechaDeCarga}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fechaDeCarga: e.target.value,
                      })
                    }
                  />
                </div>
                <SelectInput
                  label="Divisa"
                  name="divisa"
                  value={formData.divisa}
                  options={[
                    { label: "Pesos Argentinos", value: "Pesos Argentinos" },
                    { label: "Dolares", value: "Dolares" },
                  ]}
                  onChange={(e) =>
                    setFormData({ ...formData, divisa: e.target.value })
                  }
                />

                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                  >
                    {isEditMode ? "Editar Garantía" : "Crear Garantía"}
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

export default FormGarantia;
