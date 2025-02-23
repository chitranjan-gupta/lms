import { create } from "zustand";

import { approveApplication, getApplications, rejectApplication } from "@/api";

import type { Application } from "@/types";

interface Applications {
  applications: Application[];
  getApplications: (path?: string) => Promise<void>;
  approveApplications: (applicationId: string, path?: string) => Promise<void>;
  rejectApplications: (
    applicationId: string,
    path?: string
  ) => Promise<void>;
}

export const useApplications = create<Applications>()((set) => ({
  applications: [],
  getApplications: async (path: string = "admin/applications") => {
    const data: any = await getApplications(path);
    if (data) {
      set({ applications: data });
    }
  },
  approveApplications: async (applicationId: string, path: string = "admin/applications/approve") => {
    const data = await approveApplication(applicationId, path);
    if (data) {
      set((state) => ({ applications: [...state.applications.filter((application) => application.id !== data.id), data] }));
    }
  },
  rejectApplications: async (
    applicationId: string,
    path: string = "admin/applications/reject"
  ) => {
    const data = await rejectApplication(applicationId, path);
    if (data) {
      set((state) => ({ applications: [...state.applications.filter((application) => application.id !== data.id), data] }));
    }
  },
}));
