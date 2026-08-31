import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">
              Movilidad Colaborativa
            </p>
            <p className="text-sm text-slate-500">Panel principal</p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              document.cookie = "app_auth_token=; Max-Age=0; path=/";
              window.location.href = "/auth/login";
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
