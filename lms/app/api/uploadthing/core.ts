import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  chapterAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  lectureAttachment: f(["text", "image", "video", "audio", "pdf"])
    .onUploadComplete(() => {}),
  lectureVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
