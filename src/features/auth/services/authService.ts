import Cookies from "js-cookie";

const COOKIE_NAME = import.meta.env.VITE_AUTH_COOKIE_NAME ?? "app_auth_token";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api"}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    Cookies.set(COOKIE_NAME, data.token ?? "demo-token", {
      expires: 7,
      sameSite: "lax",
    });
    return data;
  },
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api"}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error("No se pudo registrar el usuario");
    }

    return response.json();
  },
  logout: () => {
    Cookies.remove(COOKIE_NAME);
  },
  isAuthenticated: () => Boolean(Cookies.get(COOKIE_NAME)),
};
