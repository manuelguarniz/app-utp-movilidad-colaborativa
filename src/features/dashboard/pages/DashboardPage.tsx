import { useMutation, useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/features/dashboard/services/dashboardService";

export function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => dashboardService.getStats(),
  });

  const createRideMutation = useMutation({
    mutationFn: () =>
      dashboardService.createRide({ from: "San Isidro", to: "Miraflores" }),
    onSuccess: () => {
      alert("Viaje creado correctamente (mock)");
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Error al crear viaje");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Bienvenido</h1>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => createRideMutation.mutate()}
          disabled={createRideMutation.isPending}
        >
          {createRideMutation.isPending
            ? "Creando viaje..."
            : "Crear viaje mock"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Viajes activos", value: data?.activeTrips ?? "—" },
          { label: "Usuarios online", value: data?.travelers ?? "—" },
          {
            label: "Puntaje promedio",
            value: `${data?.satisfaction ?? "—"}/5`,
          },
        ].map((item) => (
          <div key={item.label} className="card">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-slate-900">
          Estado del backend
        </h2>

        {isLoading && (
          <p className="mt-4 text-sm text-slate-600">Cargando datos...</p>
        )}
        {isError && (
          <p className="mt-4 text-sm text-red-600">
            Error al consultar backend:{" "}
            {error instanceof Error ? error.message : "Desconocido"}
          </p>
        )}
        {data && (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
