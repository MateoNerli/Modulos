import { Link } from "react-router";
import { useState } from "react";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import UserDropdown from "../components/header/UserDropdown";
import { FaAlignRight } from "react-icons/fa";
import SidebarToggle from "../components/header/SidebarToggle";
import SearchBar from "../components/header/SearchBar";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () =>
    setApplicationMenuOpen(!isApplicationMenuOpen);

  return (
    <div className="sticky top-0 flex w-full bg-white border-gray-200 z-99 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between flex-grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <SidebarToggle />

          <Link to="/" className="flex items-center gap-2">
            <img className="w-64" src="./images/logo/logoSGR.png" alt="Logo" />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <FaAlignRight />
          </button>

          <div className="hidden lg:block">
            <SearchBar />
          </div>
        </div>

        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0`}
        >
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
          </div>
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
