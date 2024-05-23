"use client";
import { IconBadge } from "@/components/icon-badge";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  ListChecks,
  Clock,
  File,
} from "lucide-react";
import Link from "next/link";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { Banner } from "@/components/banner";
import { ChapterActions } from "./_components/chapter-actions";
import { LecturesForm } from "./_components/lectures-form";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, Suspense } from "react";
import { Chapter, Lecture, ChapterAttachment } from "@prisma/client";
import axios from "axios";
import { ChapterDurationForm } from "./_components/chapter-duration-form";
import { ChapterAttachmentForm } from "./_components/chapter-attachment-form";
import Loader from "@/components/loader";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [chapter, setChapter] = useState<
    Chapter & { lectures: Lecture[] } & { attachments: ChapterAttachment[] }
  >();

  async function getData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/chapter`,
        JSON.stringify({
          userId: userId,
          courseId: params.courseId,
          chapterId: params.chapterId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setChapter(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }

  useEffect(() => {
    if (userId) {
      void getData();
    }
  }, [refresh]);

  if (!chapter) {
    return <Loader />;
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.duration,
    chapter.lectures.some((lecture) => lecture.isPublished),
  ];
  const totalFields = requiredFields.length;
  const compledtedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compledtedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <Suspense fallback={<Loader />}>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Clock} />
                <h2 className="text-xl">Chapter Duration</h2>
              </div>
              <ChapterDurationForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Chapter Lectures</h2>
              </div>
              <LecturesForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachment</h2>
              </div>
              <ChapterAttachmentForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ChapterIdPage;
