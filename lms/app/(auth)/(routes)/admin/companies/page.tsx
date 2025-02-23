"use client";

import { useEffect, useState } from "react";
import type { PaginationState } from "@tanstack/react-table";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { useUser } from "@/hooks";
import { useCompanies } from "@/core";

const CompaniesPage = () => {
  const { user } = useUser();
  const { companies, getCompanies } = useCompanies();
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    if (user) {
      (async () => {
        await getCompanies(pagination);
      })()
    }
  }, [user, pagination, getCompanies]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={companies} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default CompaniesPage;
