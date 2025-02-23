"use client";

import { useEffect } from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { useCourses } from "@/core";

const CoursesPage = () => {
  const { user } = useUser();
  const { courses, getCourses } = useCourses();
  useEffect(() => {
    if (user) {
      (async () => {
        await getCourses({ pageIndex: 1, pageSize: 10 }, "/admin/courses");
      })();
    }
  }, [user, getCourses]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
