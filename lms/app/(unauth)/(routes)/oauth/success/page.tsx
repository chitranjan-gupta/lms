"use client";

import { useEffect, type FC, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { useAuth } from "@/hooks";
import {Loader} from "@/components/loader";

const OAuth: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { oauth_success } = useAuth();
  useEffect(() => {
    if (searchParams.get("code")) {
      (async () => {
        await oauth_success(window.location.search);
      })();
    }
  }, [router, oauth_success, searchParams]);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center gap-2 font-bold">
      <Spinner variant="xl" />
      Loading ....
    </div>
  );
};

const OAuthSuccess: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <OAuth />
    </Suspense>
  );
};

export default OAuthSuccess;
