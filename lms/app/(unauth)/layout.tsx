"use client";

import { type ReactNode, useEffect, type FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth, useUser } from "@/hooks";
import { NavbarRoutes } from "@/components/navbar-routes";

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
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 p-4 border-b flex items-center bg-white shadow-sm">
        <div className="">
          <Link href="/" className="p-2 relative" prefetch={false}>
            <div className="relative h-10 w-10">
              <Image src={logo} alt="logo" fill />
            </div>
          </Link>
        </div>
        <NavbarRoutes />
      </div>
      <main className="pt-[80px] w-full h-full">{children}</main>
    </div>
  );
};

export default UnAuthLayout;
