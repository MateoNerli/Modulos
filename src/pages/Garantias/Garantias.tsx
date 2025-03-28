import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DataTable from "../../components/tables/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

interface Garantia {
  idGarantia: number;
  tipoGarantia: string;
  productoComercial: string;
  divisa: string;
  fechaDeCarga: string;
  montoBruto: number;
}

export default function Garantias() {
  const [garantia, setGarantia] = useState<Garantia[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get(`/api/garantia`);
      setGarantia(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (idGarantia: number) => {
    try {
      await axiosInterceptor.delete(`/api/garantia/${idGarantia}`);
      toast.success("Garantia eliminada correctamente");

      // Fetch data again
      fetchData();
    } catch (error) {
      console.error("Error al eliminar garantia:", error);
      toast.error("Error al eliminar la garantia");
    }
  };

  const columns = [
    {
      key: "Tipo de garantia",
      label: "Tipo de garantia",
      render: (row: Garantia) => (
        <span className="dark:text-gray-200">{row.tipoGarantia}</span>
      ),
    },
    {
      key: "Producto Comercial",
      label: "Producto Comercial",
      render: (row: Garantia) => (
        <span className="dark:text-gray-200">{row.productoComercial}</span>
      ),
    },
    {
      key: "Divisa",
      label: "Divisa",
      render: (row: Garantia) => (
        <span className="dark:text-gray-200">{row.divisa}</span>
      ),
    },
    {
      key: "Fecha de Carga",
      label: "Fecha de Carga",
      render: (row: Garantia) => (
        <span className="dark:text-gray-200">
          {new Date(row.fechaDeCarga).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "Monto Bruto",
      label: "Monto Bruto",
      render: (row: Garantia) => (
        <span className="dark:text-gray-200">{row.montoBruto}</span>
      ),
    },
    {
      key: "Acciones",
      label: "Acciones",
      render: (row: Garantia) => (
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

  return (
    <>
      <PageMeta title="Garantias" />
      <PageBreadcrumb
        pageTitle="Garantias"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Garantias", path: "/garantias" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="flex justify-end">
          <Link to="/garantias/crear">
            <Button>Crear Garantia</Button>
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md">
          <DataTable
            columns={columns}
            data={garantia}
            defaultItemsPerPage={30}
          />
        </div>
      </div>
    </>
  );
}
