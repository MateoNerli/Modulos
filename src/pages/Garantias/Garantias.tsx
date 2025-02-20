/* eslint-disable @typescript-eslint/no-explicit-any */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DataTable from "../../components/tables/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const orders = [
  {
    id: 1,
    user: {
      image:
        "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      name: "Mateo Nerli",
      role: "Comprador",
    },
    tipoGarantia: "Garantia 1",
    status: "Active",
  },
];

const columns = [
  {
    key: "Usuario",
    label: "Usuario",
    render: (row: any) => (
      <div className="flex items-center gap-3">
        <img
          src={row.user.image}
          alt={row.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <span className="block font-medium dark:text-gray-200">
            {row.user.name}
          </span>
          <span className="block text-gray-500">{row.user.role}</span>
        </div>
      </div>
    ),
  },
  {
    key: "Tipo de garantia",
    label: "Tipo de garantia",
    render: (row: any) => (
      <span className="dark:text-gray-200">{row.tipoGarantia}</span>
    ),
  },
  {
    key: "Estado",
    label: "Estado",
    render: (row: any) => (
      <span
        className={`px-2 py-1.5 rounded-full text-xs font-medium ${
          row.status === "Active"
            ? "bg-green-500 text-white"
            : row.status === "Pending"
            ? "bg-yellow-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "Acciones",
    label: "Acciones",
    render: () => (
      <div className="flex  gap-3">
        <button className="flex items-center justify-center p-2 rounded-full bg-yellow-300 hover:bg-gray-200">
          <FaEdit className="" />
        </button>
        <button className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-gray-200 ">
          <FaTrash />
        </button>
      </div>
    ),
  },
];

export default function Garantias() {
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
        <DataTable columns={columns} data={orders} defaultItemsPerPage={30} />
      </div>
    </>
  );
}
