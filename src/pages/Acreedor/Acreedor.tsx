import { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DataTable from "../../components/tables/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const columns = [
  {
    key: "Nombre",
    label: "Nombre",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.nombre}</span>
    ),
  },
  {
    key: "CUIT",
    label: "CUIT",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.cuit}</span>
    ),
  },
  {
    key: "Tipo de Acreedor",
    label: "Tipo de Acreedor",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.tipoDeAcreedor}</span>
    ),
  },
  {
    key: "Codigo de Entidades Operaciones",
    label: "Código de Entidades Operaciones",
    render: (row: any) => (
      <span className="dark:text-gray-200">
        {row.codigoEntidadesOperacionesAfrontadas}
      </span>
    ),
  },
  {
    key: "Monto Calificado",
    label: "Monto Calificado",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.montoCalificado}</span>
    ),
  },
  {
    key: "Fecha de Calificación",
    label: "Fecha de Calificación",
    render: (row: any) => (
      <span className="dark:text-gray-200">
        {new Date(row.fechaDeCalificacion).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "Porcentaje",
    label: "Porcentaje",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.porcentaje}</span>
    ),
  },
  {
    key: "Acciones",
    label: "Acciones",
    render: () => (
      <div className="flex gap-3">
        <button className="flex items-center justify-center p-2 rounded-full bg-yellow-300 hover:bg-gray-200">
          <FaEdit />
        </button>
        <button className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-gray-200">
          <FaTrash />
        </button>
      </div>
    ),
  },
];

export default function Acreedor() {
  const [cuenta, setCuenta] = useState<any[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/acreedor`
        );
        console.log("Cuenta data:", response.data);

        setCuenta(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageMeta title="Acreedor" />
      <PageBreadcrumb
        pageTitle="Acreedores"
        paths={[
          { name: "Inicio", path: "/dashboard" },
          { name: "Acreedor", path: "/acreedor" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="flex justify-end">
          <Link to="/acreedor/crear">
            <Button>Crear Acreedor</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={cuenta} defaultItemsPerPage={30} />
      </div>
    </>
  );
}
