import React from "react";

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  required,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"
        required={required}
      />
    </div>
  );
};

export default InputText;
