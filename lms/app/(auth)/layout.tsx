"use client";

import { Suspense, type FC } from "react";
import { useAuth } from "@/hooks";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

interface DashboardLayoutProps { children: React.ReactNode }

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { status } = useAuth();
  console.log("dashboard", status)
  const router = useRouter();

  useEffect(() => {
    if (status === "signOut") {
      router.push("/sign-in");
    }
  }, [router, status]);

  return (
    <Suspense fallback={<Loader />}>
      {status ==="signIn" ? (
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
    </Suspense>
  );
};

export default DashboardLayout;
