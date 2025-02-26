/* eslint-disable @typescript-eslint/no-explicit-any */
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
    key: "Nombre de cuenta",
    label: "Nombre de cuenta",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.nombreCuenta}</span>
    ),
  },
  {
    key: "Tipo de Documento",
    label: "Tipo de Documento",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.tipoDeDocuemnto}</span>
    ),
  },
  {
    key: "Número de Documento",
    label: "Número de Documento",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.numeroDeDocumento}</span>
    ),
  },
  {
    key: "Personería",
    label: "Personería",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.personeria}</span>
    ),
  },
  {
    key: "Relación SGR",
    label: "Relación SGR",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.relacionamientoSGR}</span>
    ),
  },
  {
    key: "Rol de la Cuenta",
    label: "Rol de la Cuenta",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.rolCuenta}</span>
    ),
  },
  {
    key: "Acciones",
    label: "Acciones",
    render: (row: any) => (
      <div className="flex gap-3">
        <Link to={`/cuenta/editar/${row.idCuenta}`}>
          <button className="flex items-center justify-center p-2 rounded-full bg-yellow-300 hover:bg-gray-200">
            <FaEdit />
          </button>
        </Link>
        <button
          className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-gray-200"
          onClick={() => handleDelete(row.idCuenta)}
        >
          <FaTrash />
        </button>
      </div>
    ),
  },
];
const handleDelete = async (idCuenta: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cuenta?id=${idCuenta}`
    );
    console.log(
      "Cuenta eliminada:",
      response.data
        ? "Cuenta eliminada correctamente"
        : "Error al eliminar cuenta"
    );
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
  }
};
export default function Cuenta() {
  const [cuenta, setCuenta] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cuenta`
        );
        console.log("Cuentas:", response.data);

        setCuenta(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageMeta title="Cuenta" />
      <PageBreadcrumb
        pageTitle="Cuentas"
        paths={[
          { name: "Inicio", path: "/dashboard" },
          { name: "Cuenta", path: "/cuenta" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="flex justify-end">
          <Link to="/cuenta/crear">
            <Button>Crear Cuenta</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={cuenta} defaultItemsPerPage={30} />
      </div>
    </>
  );
}
