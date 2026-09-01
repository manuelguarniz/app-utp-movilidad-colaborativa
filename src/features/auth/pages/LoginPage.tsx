import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { authService } from "@/features/auth/services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const profileCompleted = Boolean(
    (location.state as { profileCompleted?: boolean } | null)?.profileCompleted,
  );
  const [email, setEmail] = useState("correo@ejemplo.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login(email, password);
      navigate("/auth/verificacion");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="ColaboraCar"
      subtitle="Inicia sesión para continuar tu viaje."
      footer={
        <>
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span>O</span>
            <span className="auth-divider-line" />
          </div>

          <Link to="/auth/register" className="auth-button-secondary">
            Registrarse
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {profileCompleted && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Perfil completado. Ya puedes iniciar sesión.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <AuthField
          label="Correo electrónico"
          type="email"
          value={email}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          onChange={setEmail}
          icon={
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
              <path d="m5 7 7 5 7-5" />
            </svg>
          }
        />

        <div className="mb-4 flex items-center justify-between gap-4">
          <label className="text-sm font-black uppercase tracking-wide text-[#3a2f2f]">
            Contraseña
          </label>
          <button
            type="button"
            className="text-sm font-black text-[#d93a43] transition hover:text-[#c12c33]"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <AuthField
          label=""
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="••••••••"
          autoComplete="current-password"
          onChange={setPassword}
          icon={
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 10V8a5 5 0 0 1 10 0v2" />
              <rect x="5" y="10" width="14" height="10" rx="2" />
            </svg>
          }
          rightAction={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center text-[#2b2b2b]"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.58A2 2 0 0 0 13.4 13.4" />
                  <path d="M9.88 5.08A9.77 9.77 0 0 1 12 5c4.28 0 8.02 2.39 9.4 5.74a12.17 12.17 0 0 1-3.38 4.56" />
                  <path d="M6.61 6.61A12.27 12.27 0 0 0 2.6 10.74C4.04 14.05 7.74 16.48 12 16.48a10.45 10.45 0 0 0 4.4-.94" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          }
        />

        <button
          type="submit"
          className="auth-button-primary"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </AuthLayout>
  );
}
