import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import SelectInput from "../../components/form/SelectInput";
import InputText from "../../components/form/InputText";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

function FormCuenta() {
  const { id } = useParams(); // Obtener el id de la ruta
  const [formData, setFormData] = useState({
    nombreCuenta: "",
    tipoDeDocuemnto: "",
    numeroDeDocumento: "",
    personeria: "",
    rolCuenta: "",
    relacionamientoSGR: "",
  });
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInterceptor
        .get(`/api/cuenta/${id}`)
        .then((response) => {
          console.log("Datos obtenidos de la API:", response.data);
          setFormData(response.data); // Cargar datos para edición
          setLoading(false);
        })
        .catch((error) => {
          console.error(
            "Error al cargar los datos:",
            error.response || error.message
          );
          navigate("/cuenta"); // Redirigir en caso de error
        });
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = id ? `/api/cuenta/${id}` : `/api/cuenta`;
    const method = id ? "put" : "post";

    axiosInterceptor({
      method: method,
      url: url,
      data: formData,
    })
      .then(() => {
        toast.success(
          id ? "Cuenta actualizada con éxito" : "Cuenta creada con éxito"
        );
        navigate("/cuenta");
      })
      .catch((error) => console.error("Error al guardar cuenta:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageMeta title={id ? "Editar Cuenta" : "Crear Cuenta"} />
      <PageBreadcrumb
        pageTitle="Cuentas"
        paths={[
          { name: "Inicio", path: "/dashboard" },
          { name: "Cuentas", path: "/cuenta" },
          {
            name: id ? "Editar Cuenta" : "Crear Cuenta",
            path: id ? `/cuenta/editar/${id}` : "/cuenta/crear",
          },
        ]}
      />
      <div className="min-h-screen">
        <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="border-b p-4 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {id ? "Editar Cuenta" : "Crear Cuenta"}
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
                  name="nombreCuenta"
                  label="Nombre de Cuenta"
                  value={formData.nombreCuenta || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, nombreCuenta: e.target.value })
                  }
                  required
                />
                <SelectInput
                  name="tipoDeDocuemnto"
                  label="Tipo de Documento"
                  value={formData.tipoDeDocuemnto || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tipoDeDocuemnto: e.target.value,
                    })
                  }
                  options={[
                    { value: "dni", label: "DNI" },
                    { value: "cuit", label: "CUIT" },
                  ]}
                  required
                />
                <InputText
                  label="Número de Documento"
                  name="numeroDeDocumento"
                  value={formData.numeroDeDocumento || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numeroDeDocumento: e.target.value,
                    })
                  }
                  required
                />
                <InputText
                  name="relacionamientoSGR"
                  label="Relacionamiento SGR"
                  value={formData.relacionamientoSGR || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relacionamientoSGR: e.target.value,
                    })
                  }
                  required
                />
                <SelectInput
                  name="personeria"
                  label="Personería"
                  value={formData.personeria || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, personeria: e.target.value })
                  }
                  options={[
                    { value: "juridica", label: "Jurídica" },
                    { value: "fisica", label: "Física" },
                  ]}
                  required
                />
                <SelectInput
                  name="rolCuenta"
                  label="Rol de Cuenta"
                  value={formData.rolCuenta || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, rolCuenta: e.target.value })
                  }
                  options={[
                    { value: "rol 1", label: "Rol 1" },
                    { value: "rol 2", label: "Rol 2" },
                    { value: "rol 3", label: "Rol 3" },
                  ]}
                  required
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md"
                >
                  {id ? "Actualizar Cuenta" : "Crear Cuenta"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormCuenta;
