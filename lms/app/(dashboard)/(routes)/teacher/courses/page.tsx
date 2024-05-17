"use client";
import { useEffect, useState } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const CoursesPage = () => {
  const { userId } = useAuth();
  const [courses, setCourses] = useState([]);
  async function getData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user`,
        JSON.stringify({
          userId: userId,
        })
      );
      if (res.status == 200) {
        console.log(res.data)
        setCourses(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    if (userId) {
      void getData();
    }
  }, [userId]);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
