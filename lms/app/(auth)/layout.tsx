"use client";

import { useEffect, Suspense, type FC, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Loader } from "@/components/loader";
import { Dashboard } from "@/components/dashboard";

import { useAuth, useUser } from "@/hooks";
import { data, userRoutes, teacherRoutes, adminRoutes } from "@/constants";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");
  const isTeacherPage = pathname?.includes("/teacher");
  const isUserPage = pathname?.includes("/user");
  const routes = isAdminPage
    ? adminRoutes
    : isTeacherPage
    ? teacherRoutes
    : isUserPage
    ? userRoutes
    : [];
  const { status, handleLogout } = useAuth();
  const { user, apply } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (status === "signOut") {
      router.push("/sign-in");
    }
  }, [router, status]);

  return (
    <Suspense fallback={<Loader />}>
      {status === "signIn" ? (
        <Dashboard
          data={{ ...data, navPrimary: routes, user: user }}
          handleLogout={handleLogout}
          handleApply={apply}
        >
          {children}
        </Dashboard>
      ) : (
        <Loader />
      )}
    </Suspense>
  );
};

export default AuthLayout;
