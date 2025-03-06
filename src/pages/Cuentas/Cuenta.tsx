/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DataTable from "../../components/tables/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

export default function Cuenta() {
  const [cuenta, setCuenta] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get("/api/cuenta");
      setCuenta(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (idCuenta: number) => {
    try {
      await axiosInterceptor.delete(`/api/cuenta?id=${idCuenta}`);
      toast.success("Cuenta eliminada correctamente", {
        position: "top-right",
        autoClose: 1500,
      });

      fetchData();
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      toast.error("Error al eliminar la cuenta", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

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

  return (
    <>
      <PageMeta title="Cuenta" />
      <PageBreadcrumb
        pageTitle="Cuentas"
        paths={[
          { name: "Inicio", path: "/" },
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
