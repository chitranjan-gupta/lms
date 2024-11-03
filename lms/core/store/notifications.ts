import { getNotifications, removeNotification } from "@/api";
import { Notification } from "@/types";
import { create } from "zustand";

interface Notifications {
  notifications: Notification[];
  getNotifications: () => Promise<void>;
  addNotifications: () => Promise<void>;
  removeNotifications: (removeNotificationId: string) => Promise<void>;
}

export const useNotifications = create<Notifications>()((set) => ({
  notifications: [],
  getNotifications: async () => {
    const data = await getNotifications();
    if (data) {
      set({ notifications: data });
    }
  },
  addNotifications: async () => {
    const data = await getNotifications();
    if (data) {
      set((state) => ({ notifications: [...state.notifications, ...data] }));
    }
  },
  removeNotifications: async (removeNotificationId: string) => {
    const data = await removeNotification(removeNotificationId);
    if (data) {
      set((state) => ({
        notifications: state.notifications.filter((teacher) => teacher.id !== data.id),
      }));
    }
  },
}));

export const removeNotifications = async (removeNotificationId: string) =>
  useNotifications.getState().removeNotifications(removeNotificationId);
