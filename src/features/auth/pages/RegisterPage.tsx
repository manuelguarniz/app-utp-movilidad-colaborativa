import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthStepLayout } from "@/features/auth/components/AuthStepLayout";
import { authService } from "@/features/auth/services/authService";

const PASSWORD_PATTERN =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function PasswordVisibilityToggle({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-8 w-8 items-center justify-center text-[#6b5f5f]"
      aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {visible ? (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
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
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    if (!PASSWORD_PATTERN.test(form.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres con letras, números y símbolos",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.register({
        email: form.email,
        password: form.password,
      });
      navigate("/auth/completar-perfil");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthStepLayout
      backTo="/auth/login"
      title="Registro"
      showLogoCard
      footer={
        <p className="mt-8 text-center text-base font-medium text-[#4b3d3d]">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/auth/login"
            className="font-black text-[#d93a43] hover:text-[#c12c33]"
          >
            Inicia sesión
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

        <AuthField
          label="Email"
          type="email"
          value={form.email}
          placeholder="tu@email.com"
          autoComplete="email"
          uppercaseLabel={false}
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
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          value={form.password}
          placeholder="••••••••"
          autoComplete="new-password"
          uppercaseLabel={false}
          helperText="Usa al menos 8 caracteres con una mezcla de letras, números y símbolos."
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
            <PasswordVisibilityToggle
              visible={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />
          }
        />

        <AuthField
          label="Repetir contraseña"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirmPassword}
          placeholder="••••••••"
          autoComplete="new-password"
          uppercaseLabel={false}
          onChange={(value) => handleChange("confirmPassword", value)}
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
              <path d="M12 14v2" />
              <path d="M9.5 14.5a4 4 0 0 1 5 0" />
            </svg>
          }
          rightAction={
            <PasswordVisibilityToggle
              visible={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
            />
          }
        />

        <label className="auth-terms-option">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="auth-terms-checkbox"
          />
          <span className="text-sm font-medium text-[#4b3d3d]">
            Acepto los términos y condiciones
          </span>
        </label>

        <button
          type="submit"
          className="auth-button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Continuando..." : "Continuar"}
        </button>
      </form>
    </AuthStepLayout>
  );
}
