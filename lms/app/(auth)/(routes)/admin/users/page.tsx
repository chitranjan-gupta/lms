"use client";

import { useEffect } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useUsers } from "@/core";

const CoursesPage = () => {
  const { users, getUsers } = useUsers();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default CoursesPage;
