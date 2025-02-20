import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  pageTitle: string;
  paths: { name: string; path: string }[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, paths }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {paths.map((path, index) => (
            <li key={index}>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                to={path.path}
              >
                {path.name}
                {index < paths.length - 1 && <FaChevronRight />}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
