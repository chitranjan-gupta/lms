"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { useUser } from "@/hooks";
import type { PaginationState } from "@tanstack/react-table";
import { columns } from "./_components/columns";
import { useCompanies } from "@/core/store/companies";

const CompaniesPage = () => {
  const { user } = useUser();
  const { companies, getCompanies } = useCompanies();
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {    
    if (user?.userId) {
      getCompanies(pagination);
    }
  }, [user, pagination, getCompanies]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={companies} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default CompaniesPage;
