"use client";

import { useEffect, useState } from "react";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { useUser } from "@/hooks";
import { fetchCourses } from "@/api";

const CoursesPage = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    if (user) {
      (async () => {
        const data:any = await fetchCourses();
        if(data){
          setCourses(data);
        }
      })()
    }
  }, [user, setCourses]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
