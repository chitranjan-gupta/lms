"use client";

import { useEffect } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useTeachers } from "@/core";

const TeachersPage = () => {
  const { teachers, getTeachers } = useTeachers();
  useEffect(() => {
    getTeachers();
  }, [getTeachers]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={teachers} />
    </div>
  );
};

export default TeachersPage;
