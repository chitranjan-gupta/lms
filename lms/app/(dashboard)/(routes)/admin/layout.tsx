"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/loader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId, role } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!loading) {
      if (!(userId.length > 0) || role != "admin") {
        router.push("/sign-in");
      }
    }
  }, [userId, role, loading]);
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);
  return (
    <Suspense fallback={<Loader />}>
      {!loading && userId.length > 0 && role == "admin" ? (
        <>{children}</>
      ) : (
        <Loader />
      )}
    </Suspense>
  );
};

export default AdminLayout;
