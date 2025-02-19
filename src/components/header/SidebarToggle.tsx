import { FaBars, FaTimes } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";

const SidebarToggle: React.FC = () => {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <button
      className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 lg:flex lg:h-11 lg:w-11 lg:border"
      onClick={handleToggle}
      aria-label="Toggle Sidebar"
    >
      {isMobileOpen ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default SidebarToggle;
