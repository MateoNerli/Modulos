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
    key: "Tipo de garantia",
    label: "Tipo de garantia",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.tipoGarantia}</span>
    ),
  },
  {
    key: "Producto Comercial",
    label: "Producto Comercial",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.productoComercial}</span>
    ),
  },
  {
    key: "Divisa",
    label: "Divisa",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.divisa}</span>
    ),
  },
  {
    key: "Fecha de Carga",
    label: "Fecha de Carga",
    render: (row: any) => (
      <span className="dark:text-gray-200">
        {new Date(row.fechaDeCarga).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "Monto Bruto",
    label: "Monto Bruto",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.montoBruto}</span>
    ),
  },
  {
    key: "Acciones",
    label: "Acciones",
    render: (row: any) => (
      <div className="flex gap-3">
        <Link to={`/garantias/editar/${row.idGarantia}`}>
          <button className="flex items-center justify-center p-2 rounded-full bg-yellow-300 hover:bg-gray-200">
            <FaEdit />
          </button>
        </Link>
        <button
          className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-gray-200"
          onClick={() => handleDelete(row.idGarantia)}
        >
          <FaTrash />
        </button>
      </div>
    ),
  },
];

const handleDelete = async (idGarantia: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/garantia/${idGarantia}`
    );
    console.log(
      "Garantia eliminada:",
      response.data
        ? "garantia eliminada correctamente"
        : "Error al eliminar garantia"
    );
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar garantai:", error);
  }
};

export default function Garantias() {
  const [garantia, setGarantia] = useState<any[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/garantia`
        );
        setGarantia(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageMeta title="Garantias" />
      <PageBreadcrumb
        pageTitle="Garantias"
        paths={[
          { name: "Inicio", path: "/dashboard" },
          { name: "Garantias", path: "/garantias" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="flex justify-end">
          <Link to="/garantias/crear">
            <Button>Crear Garantia</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={garantia} defaultItemsPerPage={30} />
      </div>
    </>
  );
}
