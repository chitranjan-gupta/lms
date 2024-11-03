"use client";

import { useEffect } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useNotifications } from "@/core";

const CoursesPage = () => {
  const { notifications, getNotifications } = useNotifications();
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={notifications} />
    </div>
  );
};

export default CoursesPage;
