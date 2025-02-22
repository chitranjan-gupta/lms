"use client";

import { useEffect, useState, useCallback } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useUser } from "@/hooks";
import axios from "axios";

const CoursesPage = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`,
        JSON.stringify({
          userId: user?.userId,
          role: user?.role,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setCourses(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }, [user])
  useEffect(() => {
    if (user?.userId) {
      void getData();
    }
  }, [user, getData]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
