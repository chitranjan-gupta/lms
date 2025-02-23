"use client";

import { type ReactNode, useEffect, type FC } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { useAuth, useUser } from "@/hooks";
import { NavbarRoutes } from "@/components/navbar-routes";
import { navigation } from "@/constants";

import { logo } from "@/assets";

interface UnAuthLayoutProps {
  children: ReactNode;
}

const UnAuthLayout: FC<UnAuthLayoutProps> = ({ children }) => {
  const { status } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (status === "signIn") {
      router.replace(user?.role === "subadmin" ? "/teacher" : `/${user?.role}` || "/user");
    }
  }, [router, status, user]);

  return (
    <>
      <Header navigation={navigation} logo={logo}>
        <NavbarRoutes />
      </Header>
      <main className="pt-[80px] w-full h-full">{children}</main>
    </>
  );
};

export default UnAuthLayout;
