"use client";

import { useEffect, Suspense, type FC, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@/hooks";
import Loader from "@/components/loader";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { status } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (status !== "signIn" || user?.role != "admin") {
      router.push("/sign-in");
    }
  }, [user, status, router]);
  return (
    <Suspense fallback={<Loader />}>
      {status === "signIn" && user?.role == "admin" ? <>{children}</> : <Loader />}
    </Suspense>
  );
};

export default AdminLayout;
