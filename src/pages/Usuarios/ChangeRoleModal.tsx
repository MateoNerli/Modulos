import { useState } from "react";
import axiosInterceptor from "../../hooks/axiosInterceptor";
import { toast } from "react-toastify";

interface ChangeRoleModalProps {
  userId: number;
  currentRole: string;
  onClose: () => void;
  onRoleChangeSuccess: () => void;
}

const ChangeRoleModal = ({
  userId,
  currentRole,
  onClose,
  onRoleChangeSuccess,
}: ChangeRoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleRoleChange = async () => {
    try {
      const response = await axiosInterceptor.put(`/api/usuario/ChangeRol/`, {
        idUsuario: userId,
        rol: selectedRole,
      });
      if (response.status === 200) {
        toast.success("Role updated successfully!");
        onRoleChangeSuccess();
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h3 className="text-xl mb-4 text-gray-800 dark:text-white">
          Change Role
        </h3>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Role
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="mt-2 block w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-300"
          >
            <option value="Usuario">Usuario</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleRoleChange}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
