import type { ReactNode } from "react";

type NavItem = {
  id: string;
  label: string;
  active?: boolean;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "ride",
    label: "Viaje",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M5 11h1.2l1.1-3.2A2 2 0 0 1 9.2 6h5.6a2 2 0 0 1 1.9 1.3L17.8 11H19a2 2 0 0 1 2 2v1h-1.1a2.9 2.9 0 0 1-5.8 0H9.9a2.9 2.9 0 0 1-5.8 0H3v-1a2 2 0 0 1 2-2Zm2.4 0h9.2l-.9-2.6a.6.6 0 0 0-.6-.4H9.2a.6.6 0 0 0-.6.4L7.4 11ZM7 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    ),
  },
  {
    id: "history",
    label: "Historial",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 8v4l3 2" />
        <path d="M3.05 11a9 9 0 1 1 .5 4" />
        <path d="M3 4v4h4" />
      </svg>
    ),
  },
  {
    id: "wallet",
    label: "Billetera",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 7h15a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        <path d="M18 12h3" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Perfil",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M5 20c1.5-2.5 4-4 7-4s5.5 1.5 7 4" />
      </svg>
    ),
  },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav-item ${item.active ? "bottom-nav-item-active" : ""}`}
          aria-current={item.active ? "page" : undefined}
        >
          <span
            className={`bottom-nav-icon ${item.active ? "bottom-nav-icon-active" : ""}`}
          >
            {item.icon}
          </span>
          <span className="bottom-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
