import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/features/auth/services/authService";

export function DashboardHeader() {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await authService.logout();
      navigate("/auth/login", { replace: true });
    } catch {
      navigate("/auth/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="dashboard-header">
      <button
        type="button"
        className="dashboard-icon-button"
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <rect x="3" y="6" width="18" height="2.5" rx="1" />
          <rect x="3" y="11" width="18" height="2.5" rx="1" />
          <rect x="3" y="16" width="18" height="2.5" rx="1" />
        </svg>
      </button>

      <h1 className="dashboard-header-title">ColaboraCar</h1>

      <div className="relative justify-self-end" ref={menuRef}>
        <button
          type="button"
          className="dashboard-profile-button"
          aria-label="Menú de perfil"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="dashboard-profile-avatar" aria-hidden="true" />
        </button>

        {isMenuOpen ? (
          <div className="dashboard-menu dashboard-menu-right" role="menu">
            <button
              type="button"
              role="menuitem"
              className="dashboard-menu-item"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
