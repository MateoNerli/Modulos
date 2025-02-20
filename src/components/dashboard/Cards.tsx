import { JSX } from "react";
import { FaAccusoft, FaBox } from "react-icons/fa";

interface MetricCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

const Card = ({ icon, title, value }: MetricCardProps) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
      {icon}
    </div>
    <div className="flex items-end justify-between mt-5">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {value}
        </h4>
      </div>
    </div>
  </div>
);

export default function Cards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <Card
        icon={
          <FaAccusoft className="text-gray-800 size-6 dark:text-white/90" />
        }
        title="Clientes"
        value={100}
      />
      <Card
        icon={<FaBox className="text-gray-800 dark:text-white/90" />}
        title="Órdenes"
        value={500}
      />
    </div>
  );
}
