import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async (req: NextRequest) => {
  const { user } = await auth(req);
  if (!user.userId) throw new UploadThingError("Unauthorized");
  return { userId: user.userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(() => {}),
  chapterAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(() => {}),
  lectureAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(() => {}),
  lectureVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async ({ req }) => await handleAuth(req))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
