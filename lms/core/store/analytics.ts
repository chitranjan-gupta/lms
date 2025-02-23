import { create } from "zustand";

import {
  getAnalytics
} from "@/api";

interface Analytics {
  data: {
    name: string;
    total: number;
  }[];
  totalRevenue: number;
  totalSales: number;
  getAnalytics: (path?: string) => Promise<void>;
}

export const useAnalytics = create<Analytics>()((set) => ({
  data: [],
  totalRevenue: 0,
  totalSales: 0,
  getAnalytics: async (path: string = "admin/analytics") => {
    const data: any = await getAnalytics(path);
    if (data) {
      set({ data: data.data, totalRevenue: data.totalRevenue, totalSales: data.totalSales });
    }
  },
}));
