"use client";

import React, { useEffect, useState } from "react";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const AnalyticsPage = () => {
  const { userId, role } = useAuth();
  const [data, setData] = useState<
    {
      name: string;
      total: number;
    }[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  async function getAnalytics() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`,
        JSON.stringify({ userId: userId, role: role }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setData(res.data.data);
        setTotalRevenue(res.data.totalRevenue);
        setTotalSales(res.data.totalSales);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    if (userId) {
      getAnalytics();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
