import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import ChangeRoleModal from "./ChangeRoleModal";
import DataTable from "../../components/tables/DataTable";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

interface Usuarios {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  rol: string;
}

export default function Usuario() {
  const [users, setUsers] = useState<Usuarios[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInterceptor.get("/api/usuario");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (id: number, role: string) => {
    setSelectedUserId(id);
    setCurrentRole(role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setCurrentRole("");
  };

  const handleRoleChangeSuccess = () => {
    fetchData();
    closeModal();
  };

  const columns = [
    {
      key: "Nombre",
      label: "Nombre",
      render: (row: Usuarios) => (
        <span className="dark:text-gray-200">{row.nombre}</span>
      ),
    },
    {
      key: "Apellido",
      label: "Apellido",
      render: (row: Usuarios) => (
        <span className="dark:text-gray-200">{row.apellido}</span>
      ),
    },
    {
      key: "Email",
      label: "Email",
      render: (row: Usuarios) => (
        <span className="dark:text-gray-200">{row.email}</span>
      ),
    },
    {
      key: "Username",
      label: "Username",
      render: (row: Usuarios) => (
        <span className="dark:text-gray-200">{row.username}</span>
      ),
    },
    {
      key: "Rol",
      label: "Rol",
      render: (row: Usuarios) => (
        <span className="dark:text-gray-200">{row.rol}</span>
      ),
    },
    {
      key: "EditarRol",
      label: "Editar Rol",
      render: (row: Usuarios) => (
        <div className="flex items-center space-x-2">
          <button onClick={() => openModal(row.idUsuario, row.rol)}>
            <FaEdit className="text-blue-500 cursor-pointer dark:text-gray-200" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {isModalOpen && selectedUserId !== null && (
        <ChangeRoleModal
          userId={selectedUserId}
          currentRole={currentRole}
          onClose={closeModal}
          onRoleChangeSuccess={handleRoleChangeSuccess}
        />
      )}
      <PageMeta title="Usuarios" />
      <PageBreadcrumb
        pageTitle="Usuarios"
        paths={[
          { name: "Inicio", path: "/" },
          { name: "Usuarios", path: "/Usuarios" },
        ]}
      />
      <div className="space-y-6 min-h-screen">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md">
          <DataTable columns={columns} data={users} defaultItemsPerPage={30} />
        </div>
      </div>
    </>
  );
}
