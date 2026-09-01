import { apiClient } from "@/shared/api/apiClient";

type DashboardStats = {
  travelers: number;
  activeTrips: number;
  satisfaction: number;
  city: string;
  updatedAt: string;
};

type Ride = {
  id: string;
  driver: string;
  from: string;
  to: string;
  seats: number;
  status: string;
};

export const dashboardService = {
  getStats: () => apiClient.get<DashboardStats>("/dashboard/stats"),
  createRide: (payload: { from: string; to: string }) =>
    apiClient.post("/rides/create", payload),
  getRides: async (): Promise<Ride[]> => {
    const response = await apiClient.get<{ data: Ride[] }>("/rides");
    return response.data;
  },
};
