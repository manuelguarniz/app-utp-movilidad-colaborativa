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
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },
  createRide: async (payload: { from: string; to: string }) => {
    const response = await apiClient.post("/rides/create", payload);
    return response.data;
  },
  getRides: async (): Promise<Ride[]> => {
    const response = await apiClient.get<{ data: Ride[] }>("/rides");
    return response.data.data;
  },
};
