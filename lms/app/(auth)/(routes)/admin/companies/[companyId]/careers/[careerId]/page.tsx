"use client";

import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { CareerForm } from "./_components/career-form";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import Loader from "@/components/loader";
import { Actions } from "./_components/actions";
import { useCareer } from "@/core/store/career";

const CareerIdPage = ({
  params,
}: {
  params: { companyId: string; careerId: string };
}) => {
  const { companyId, careerId } = params;
  const [refresh, setRefresh] = useState<boolean>(false);
  const { career, getCareer } = useCareer();
  useEffect(() => {
    if (careerId && companyId) {
      void getCareer(companyId, careerId);
    }
  }, [careerId, companyId, refresh, getCareer]);

  if (!career) {
    return <Loader />;
  }
  const requiredFields = [career.title];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <Suspense fallback={<Loader />}>
      <div className="p-6">
        <div>
          <Link
            href={`/admin/companies/${params.companyId}/careers`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to careers
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Career Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <div>
            <Actions career={career} setRefresh={setRefresh} />
          </div>
        </div>
        <div className="w-full">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your career</h2>
            </div>
            <CareerForm initialData={career} setRefresh={setRefresh} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CareerIdPage;
