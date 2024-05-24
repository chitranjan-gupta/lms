"use client";
import React, { useEffect, useState } from "react";
import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useAuth } from "@/context/AuthContext";

const AnalyticsPage = () => {
  const { userId } = useAuth();
  const [data, setData] = useState<
    {
      name: string;
      total: number;
    }[]
  >([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      getAnalytics(userId).then((value) => {
        setData(value.data);
        setTotalRevenue(value.totalRevenue);
        setTotalSales(value.totalSales);
      });
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
