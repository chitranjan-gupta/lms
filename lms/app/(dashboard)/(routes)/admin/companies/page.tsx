"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { useAuth } from "@/context/AuthContext";
import type { PaginationState } from "@tanstack/react-table";
import { columns } from "./_components/columns";
import { useCompanies } from "@/core/store/companies";

const CompaniesPage = () => {
  const { userId, role } = useAuth();
  const { companies, getCompanies } = useCompanies();
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {    
    if (userId) {
      getCompanies(pagination);
    }
  }, [userId, pagination, getCompanies]);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={companies} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default CompaniesPage;
