"use client";

import { useEffect } from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useNotifications } from "@/core";

const NotificationsPage = () => {
  const { user } = useUser();
  const { notifications, getNotifications } = useNotifications();
  useEffect(() => {
    if(user){
      (async () => {
        await getNotifications();
      })()
    }
  }, [user, getNotifications]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={notifications} />
    </div>
  );
};

export default NotificationsPage;
