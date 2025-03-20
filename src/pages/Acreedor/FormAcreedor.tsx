import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";
import InputText from "../../components/form/InputText";
import SelectInput from "../../components/form/SelectInput";
import { useNavigate, useParams } from "react-router-dom";

interface Banco {
  idBanco: number;
  nombre: string;
}

interface FormData {
  nombre: string;
  cuit: string;
  tipoDeAcreedor: string;
  tipoDeAcreedorCVN: string;
  codigoEntidadesOperacionesAfrontadas: string;
  montoCalificado: string;
  fechaDeCalificacion: string;
  fechaDeVencimiento: string;
  informeBCRA: string;
  porcentaje: string;
  saldoGarantiasVigente: string;
  saldoGarantiasOperativo: string;
  idBanco: number;
}

function FormAcreedor() {
  const [formData, setFormData] = useState<FormData>({
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

  const [bancos, setBancos] = useState<Banco[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInterceptor
      .get(`/api/banco`)
      .then((response) => {
        setBancos(response.data);
      })
      .catch((error) => console.error("Error al obtener bancos:", error));

    if (id) {
      setIsEditing(true);
      axiosInterceptor
        .get(`/api/acreedor/${id}`)
        .then((response) => {
          const data = response.data;
          data.fechaDeCalificacion = new Date(data.fechaDeCalificacion)
            .toISOString()
            .split("T")[0];
          data.fechaDeVencimiento = new Date(data.fechaDeVencimiento)
            .toISOString()
            .split("T")[0];
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error al obtener el acreedor:", error);
          toast.error("Error al obtener el acreedor para editar.");
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      fechaDeCalificacion: new Date(formData.fechaDeCalificacion).toISOString(),
      fechaDeVencimiento: new Date(formData.fechaDeVencimiento).toISOString(),
    };

    const apiCall = isEditing
      ? axiosInterceptor.put(`/api/acreedor/${id}`, formDataToSend)
      : axiosInterceptor.post(`/api/acreedor`, formDataToSend);

    apiCall
      .then(() => {
        toast.success(
          isEditing
            ? "Acreedor actualizado con éxito"
            : "Acreedor creado con éxito"
        );

        navigate("/acreedor");
      })
      .catch((error) => {
        console.error(
          `Error al ${isEditing ? "actualizar" : "crear"} acreedor:`,
          error
        );
        toast.error(
          `Error al ${isEditing ? "actualizar" : "crear"} el acreedor.`
        );
      });
  };

  return (
    <>
      <PageMeta title={isEditing ? "Editar Acreedor" : "Crear Acreedor"} />
      <PageBreadcrumb
        pageTitle={isEditing ? "Editar Acreedor" : "Crear Acreedor"}
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Acreedores", path: "/acreedor" },
          {
            name: isEditing ? "Editar Acreedor" : "Crear Acreedor",
            path: `/acreedor/${isEditing ? "editar" : "crear"}`,
          },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {isEditing ? "Editar Acreedor" : "Crear Acreedor"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                Datos Generales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InputText
                  name="nombre"
                  label="Nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <InputText
                  name="cuit"
                  label="CUIT"
                  required
                  value={formData.cuit}
                  onChange={(e) =>
                    setFormData({ ...formData, cuit: e.target.value })
                  }
                />
                <SelectInput
                  name="idBanco"
                  label="Banco"
                  value={formData.idBanco || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      idBanco: parseInt(e.target.value),
                    })
                  }
                  options={bancos.map((banco) => ({
                    value: banco.idBanco,
                    label: banco.nombre,
                  }))}
                  required
                />
                <SelectInput
                  name="tipoDeAcreedor"
                  label="Tipo de Acreedor"
                  value={formData.tipoDeAcreedor || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipoDeAcreedor: e.target.value,
                    })
                  }
                  options={[
                    { value: "Tipo 1", label: "Tipo 1" },
                    { value: "Tipo 2", label: "Tipo 2" },
                    { value: "Tipo 3", label: "Tipo 3" },
                  ]}
                  required
                />
                <SelectInput
                  name="tipoDeAcreedorCVN"
                  label="Tipo de Acreedor CVN"
                  value={formData.tipoDeAcreedorCVN || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipoDeAcreedorCVN: e.target.value,
                    })
                  }
                  options={[
                    { value: "Tipo 1", label: "Tipo 1" },
                    { value: "Tipo 2", label: "Tipo 2" },
                    { value: "Tipo 3", label: "Tipo 3" },
                  ]}
                  required
                />
                <InputText
                  name="montoCalificado"
                  label="Monto Calificado"
                  required
                  value={formData.montoCalificado}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      montoCalificado: e.target.value,
                    })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fecha de Calificacion{" "}
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
                <InputText
                  name="informeBCRA"
                  label="Informe BCRA"
                  required
                  value={formData.informeBCRA}
                  onChange={(e) =>
                    setFormData({ ...formData, informeBCRA: e.target.value })
                  }
                />

                <InputText
                  name="porcentaje"
                  label="Porcentaje"
                  required
                  value={formData.porcentaje}
                  onChange={(e) =>
                    setFormData({ ...formData, porcentaje: e.target.value })
                  }
                />

                <InputText
                  name="saldoGarantiasVigente"
                  label="Saldo Garantias Vigente"
                  required
                  value={formData.saldoGarantiasVigente}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      saldoGarantiasVigente: e.target.value,
                    })
                  }
                />
                <InputText
                  name="saldoGarantiasOperativo"
                  label="Saldo Garantias Operativo"
                  required
                  value={formData.saldoGarantiasOperativo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      saldoGarantiasOperativo: e.target.value,
                    })
                  }
                />

                <InputText
                  name="codigoEntidadesOperacionesAfrontadas"
                  label="Código Entidades Operaciones Afrontadas"
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

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                >
                  {isEditing ? "Actualizar Acreedor" : "Crear Acreedor"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormAcreedor;
