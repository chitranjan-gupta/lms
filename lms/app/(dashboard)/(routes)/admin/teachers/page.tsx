"use client";

import { useEffect, useState } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const TeachersPage = () => {
  const { userId, role } = useAuth();
  const [teachers, setTeachers] = useState([]);
  async function getData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/subadmins`,
        JSON.stringify({
          userId: userId,
          role: role,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setTeachers(res.data);
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
      <DataTable columns={columns} data={teachers} />
    </div>
  );
};

export default TeachersPage;