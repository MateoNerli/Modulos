import GananciasPorMes from "../../components/dashboard/GananciasPorMes";
import EstadisticasChart from "../../components/dashboard/EstadisticasChart";
import ObjetivoMensual from "../../components/dashboard/ObjetivoMensual";
import GarantiasRecientes from "../../components/dashboard/GarantiasRecientes";
import ClientesDemografia from "../../components/dashboard/ClientesDemografia";
import PageMeta from "../../components/common/PageMeta";
import Cards from "../../components/dashboard/Cards";

export default function Dashboard() {
  return (
    <>
      <PageMeta title="Dashboard" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <Cards />

          <GananciasPorMes />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ObjetivoMensual />
        </div>

        <div className="col-span-12">
          <EstadisticasChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ClientesDemografia />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <GarantiasRecientes />
        </div>
      </div>
    </>
  );
}
