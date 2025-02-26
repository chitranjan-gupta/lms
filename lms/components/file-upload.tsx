"use client";

import { memo, type FC } from "react";
import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib";

import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const FileUploadComponent: FC<FileUploadProps> = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
      }}
    />
  );
};

export const FileUpload = memo(FileUploadComponent);
