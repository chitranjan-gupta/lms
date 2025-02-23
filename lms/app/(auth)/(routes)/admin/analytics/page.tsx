"use client";

import { useEffect } from "react";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

import { useUser } from "@/hooks";
import { useAnalytics } from "@/core";

const AnalyticsPage = () => {
  const { user } = useUser();
  const { data, totalRevenue, totalSales, getAnalytics } = useAnalytics();
  useEffect(() => {
    if (user) {
      (async () => {
        await getAnalytics("admin/analytics");
      })();
    }
  }, [getAnalytics, user]);

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
