import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { authService } from "@/features/auth/services/authService";

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSuccess(false);

    try {
      await authService.register(form);
      setIsSuccess(true);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    }
  };

  return (
    <AuthLayout
      title="Register"
      footer={
        <p className="text-center text-base font-medium text-[#4b3d3d]">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-black text-[#d93a43] hover:text-[#c12c33]"
          >
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Usuario registrado correctamente.
          </div>
        )}

        <AuthField
          label="Name"
          value={form.name}
          placeholder="John Doe"
          autoComplete="name"
          onChange={(value) => handleChange("name", value)}
          icon={
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 19c1.5-2.5 4-4 7-4s5.5 1.5 7 4" />
            </svg>
          }
        />

        <AuthField
          label="Email address"
          type="email"
          value={form.email}
          placeholder="name@company.com"
          autoComplete="email"
          onChange={(value) => handleChange("email", value)}
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

        <AuthField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          placeholder="••••••••"
          autoComplete="new-password"
          onChange={(value) => handleChange("password", value)}
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

        <button type="submit" className="auth-button-primary">
          Register
        </button>
      </form>
    </AuthLayout>
  );
}
