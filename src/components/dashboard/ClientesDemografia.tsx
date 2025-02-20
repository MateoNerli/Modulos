import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { FaMortarPestle } from "react-icons/fa";

export default function ClientesDemografia() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Clientes
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Demografía de los clientes
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown}>
            <FaMortarPestle className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Ver mas
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
                  alt="usa"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  USA
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  100 clientes
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                79%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <img
                  src="data:image/webp;base64,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"
                  alt="france"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  Argentina
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  589 Clientes
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded bg-gray-200 dark:bg-gray-800">
                <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded bg-brand-500 text-xs font-medium text-white"></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                23%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
