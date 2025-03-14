import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DataTable from "../../components/tables/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

interface Acreedor {
  idAcreedor: number;
  nombre: string;
  cuit: string;
  tipoDeAcreedor: string;
  codigoEntidadesOperacionesAfrontadas: string;
  montoCalificado: number;
  fechaDeCalificacion: string;
  porcentaje: number;
}

export default function Acreedor() {
  const [acreedor, setAcreedor] = useState<Acreedor[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get("/api/acreedor");
      setAcreedor(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (idAcreedor: number) => {
    try {
      await axiosInterceptor.delete(`/api/acreedor?id=${idAcreedor}`);
      toast.success("Acreedor eliminada correctamente", {
        position: "top-right",
        autoClose: 1500,
      });

      fetchData();
    } catch (error) {
      console.error("Error al eliminar acreedor:", error);
      toast.error("Error al eliminar la acreedor", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const columns = [
    {
      key: "Nombre",
      label: "Nombre",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">{row.nombre}</span>
      ),
    },
    {
      key: "CUIT",
      label: "CUIT",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">{row.cuit}</span>
      ),
    },
    {
      key: "Tipo de Acreedor",
      label: "Tipo de Acreedor",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">{row.tipoDeAcreedor}</span>
      ),
    },
    {
      key: "Codigo de Entidades Operaciones",
      label: "Código de Entidades Operaciones",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">
          {row.codigoEntidadesOperacionesAfrontadas}
        </span>
      ),
    },
    {
      key: "Monto Calificado",
      label: "Monto Calificado",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">{row.montoCalificado}</span>
      ),
    },
    {
      key: "Fecha de Calificación",
      label: "Fecha de Calificación",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">
          {new Date(row.fechaDeCalificacion).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "Porcentaje",
      label: "Porcentaje",
      render: (row: Acreedor) => (
        <span className="dark:text-gray-200">{row.porcentaje}</span>
      ),
    },
    {
      key: "Acciones",
      label: "Acciones",
      render: (row: Acreedor) => (
        <div className="flex gap-3">
          <Link to={`/acreedor/editar/${row.idAcreedor}`}>
            <button className="flex items-center justify-center p-2 rounded-full bg-yellow-300 hover:bg-gray-200">
              <FaEdit />
            </button>
          </Link>
          <button
            className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-gray-200"
            onClick={() => handleDelete(row.idAcreedor)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta title="Acreedor" />
      <PageBreadcrumb
        pageTitle="Acreedores"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Acreedor", path: "/acreedor" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="flex justify-end">
          <Link to="/acreedor/crear">
            <Button>Crear Acreedor</Button>
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md">
          <DataTable columns={columns} data={acreedor} />
        </div>
      </div>
    </>
  );
}
