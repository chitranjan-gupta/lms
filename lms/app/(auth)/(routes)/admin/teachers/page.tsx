"use client";

import { useEffect } from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useTeachers } from "@/core";

const TeachersPage = () => {
  const { user } = useUser();
  const { teachers, getTeachers } = useTeachers();
  useEffect(() => {
    if(user){
      (async () => {
        await getTeachers();
      })()
    }
  }, [user, getTeachers]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={teachers} />
    </div>
  );
};

export default TeachersPage;
