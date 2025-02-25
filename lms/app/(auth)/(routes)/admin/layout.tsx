"use client";

import { useEffect, Suspense, type FC, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import {Loader} from "@/components/loader";

import { useUser } from "@/hooks";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/sign-in");
    }
  }, [user, router]);
  return (
    <Suspense fallback={<Loader />}>
      {user?.role === "admin" ? <>{children}</> : <Loader />}
    </Suspense>
  );
};

export default AdminLayout;
