"use client";

import { useEffect, Suspense, type ReactNode, type FC } from "react";
import { useRouter } from "next/navigation";

import {Loader} from "@/components/loader";

import { useUser } from "@/hooks";

interface TeacherLayoutProps{
  children: ReactNode
}

const TeacherLayout: FC<TeacherLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.role !== "subadmin") {
      router.push("/sign-in");
    }
  }, [user, router]);
  return (
    <Suspense fallback={<Loader />}>
      {user?.role === "subadmin" ? <>{children}</> : <Loader />}
    </Suspense>
  );
};

export default TeacherLayout;
