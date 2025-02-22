"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/components/loader";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <Loader />;
}
