"use client";

import { useMemo, memo, type FC } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

const PreviewComponent: FC<PreviewProps> = ({ value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="bg-white">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};

export const Preview = memo(PreviewComponent);
