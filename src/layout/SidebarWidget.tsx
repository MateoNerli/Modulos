import Button from "../components/ui/button/Button";

export default function SidebarWidget() {
  return (
    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Soporte
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        ¿Necesitas ayuda? Contáctanos.
      </p>
      <Button size="sm" className="mt-3">
        Ir a soporte
      </Button>
    </div>
  );
}
