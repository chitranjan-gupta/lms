"use client";

import { useAuth } from "@/context/AuthContext";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!loading) {
      if (!(userId.length > 0)) {
        router.push("/sign-in");
      }
    }
  }, [userId, loading]);
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);
  return (
    <>
      {!loading && userId.length > 0 ? (
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="md:pl-56 pt-[80px] h-full">{children}</main>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DashboardLayout;
