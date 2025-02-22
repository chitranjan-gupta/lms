"use client";

import { type FC, memo } from "react";
import Link from "next/link";

const OAuthFailureComponent: FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-4xl">
      <span className="text-red-500">Failure</span>
      <Link href="/sign-in">Login Again</Link>
    </div>
  );
};

const OAuthFailure = memo(OAuthFailureComponent);

export default OAuthFailure;
