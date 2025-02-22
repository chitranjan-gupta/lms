"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";
import Loader from "@/components/loader";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.role != "subadmin") {
      router.push("/sign-in");
    }
  }, [user, router]);
  return (
    <Suspense fallback={<Loader />}>
      {user?.role == "subadmin" ? <>{children}</> : <Loader />}
    </Suspense>
  );
};

export default TeacherLayout;
