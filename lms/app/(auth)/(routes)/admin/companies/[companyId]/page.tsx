"use client";

import { IconBadge } from "@/components/icon-badge";
import {
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { CompanyForm } from "./_components/company-form";
import { Actions } from "./_components/actions";
import Link from "next/link";
import { useUser } from "@/hooks";
import React, { useEffect, useState, Suspense } from "react";
import {Loader} from "@/components/loader";
import { useCompany } from "@/core/store/company";

const CompanyIdPage = ({ params }: { params: { companyId: string } }) => {
  const { companyId } = params;
  const { user } = useUser();
  const [refresh, setRefresh] = useState<boolean>(false);
  const { company, getCompany } = useCompany();
  useEffect(() => {
    if (user?.userId && companyId) {
      void getCompany(companyId);
    }
  }, [companyId, getCompany, refresh, user]);

  if (!company) {
    return <Loader />;
  }
  const requiredFields = [company.name];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <Suspense fallback={<Loader />}>
      <div className="p-6">
        <div className="flex flex-row justify-between items-start">
          <Link
            href={`/admin/companies/`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to companies
          </Link>
          <Link
            href={`/admin/companies/${params.companyId}/careers`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Go to Careers
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Company Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <div>
            <Actions company={company} setRefresh={setRefresh} />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your company</h2>
            </div>
            <CompanyForm initialData={company} setRefresh={setRefresh} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CompanyIdPage;
