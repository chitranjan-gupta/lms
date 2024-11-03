import { Notification } from "@/types";
import { fetchData } from "./common";

export const getNotifications = async () => {
  return fetchData<Notification[]>({
    method: "GET",
    url: "admin/notifications",
  });
};

export const removeNotification = async (removeNotificationId: string) => {
  return fetchData<Notification>({
    method: "DELETE",
    url: "admin/notifications",
    data: {
      removeNotificationId: removeNotificationId,
    },
  });
};
