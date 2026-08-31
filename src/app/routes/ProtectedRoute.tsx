import { Navigate, Outlet } from "react-router-dom";
import { authService } from "@/features/auth/services/authService";

export function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
