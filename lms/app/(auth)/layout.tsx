"use client";

import { type ReactNode, useEffect } from "react";
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/core";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "signIn") {
      router.push("/");
    }
    if (status === "signOut") {
      router.push("/sign-in");
    }
  }, [router, status]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-20">
      <Link
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <div className="relative w-20 h-20 mr-2">
          <Image fill src={logo} alt="logo" />
        </div>
      </Link>
      <div className="w-full h-full bg-white">{children}</div>
    </div>
  );
};

export default AuthLayout;
