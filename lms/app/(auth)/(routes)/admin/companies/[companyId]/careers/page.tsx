"use client";

import React, { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import {
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useCareers } from "@/core/store/careers";

const CareersPage = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;
  const {careers, getCareers} = useCareers();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    if(companyId){
      getCareers(companyId, pagination);
    }
  }, [pagination, companyId, getCareers]);

  return (
    <div className="p-5">
      <div className="flex flex-row justify-between items-start">
        <div>
          <Link
            href={`/admin/companies/${companyId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to careers
          </Link>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={careers}
        pagination={pagination}
        setPagination={setPagination}
        companyId={companyId}
      />
    </div>
  );
};

export default CareersPage;
