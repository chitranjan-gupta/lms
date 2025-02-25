"use client";

import { useEffect, Suspense, type ReactNode, type FC } from "react";
import { useRouter } from "next/navigation";

import {Loader} from "@/components/loader";

import { useUser } from "@/hooks";

interface UserLayoutProps{
  children: ReactNode
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.role !== "user") {
      router.push("/sign-in");
    }
  }, [user, router]);
  return (
    <Suspense fallback={<Loader />}>
      {user?.role === "user" ? <>{children}</> : <Loader />}
    </Suspense>
  );
};

export default UserLayout;
