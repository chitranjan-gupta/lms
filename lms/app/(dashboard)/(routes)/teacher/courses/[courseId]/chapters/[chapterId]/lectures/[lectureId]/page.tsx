"use client";
import { IconBadge } from "@/components/icon-badge";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Video,
  Clock,
  File,
} from "lucide-react";
import Link from "next/link";
import { LectureTitleForm } from "./_components/lecture-title-form";
import { LectureDescriptionForm } from "./_components/lecture-description-form";
import { LectureAccessForm } from "./_components/lecture-access-form";
import { LectureVideoForm } from "./_components/lecture-video-form";
import { Banner } from "@/components/banner";
import { LectureActions } from "./_components/lecture-actions";
import { useAuth } from "@/context/AuthContext";
import { Lecture, LectureAttachment } from "@prisma/client";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { LectureDurationForm } from "./_components/lecture-duration-form";
import { LectureAttachmentForm } from "./_components/lecture-attachment-form";
import Loader from "@/components/loader";

const LectureIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string; lectureId: string };
}) => {
  const { userId } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [lecture, setLecture] = useState<
    Lecture & { attachments: LectureAttachment[] }
  >();
  async function getData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/lecture`,
        JSON.stringify({
          userId: userId,
          lectureId: params.lectureId,
          chapterId: params.chapterId,
          courseId: params.courseId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setLecture(res.data);
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
  if (!lecture) {
    return <Loader />;
  }

  const requiredFields = [
    lecture.title,
    lecture.description,
    lecture.duration,
    lecture.videoUrl,
  ];
  const totalFields = requiredFields.length;
  const compledtedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compledtedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <Suspense fallback={<Loader />}>
      {!lecture.isPublished && (
        <Banner
          variant="warning"
          label="This lecture is unpublished. It will not be visible in the chapter."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Lecture Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <LectureActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                isPublished={lecture.isPublished}
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
                <h2 className="text-xl">Customize your lecture</h2>
              </div>
              <LectureTitleForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
              <LectureDescriptionForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access settings</h2>
              </div>
              <LectureAccessForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Clock} />
                <h2 className="text-xl">Duration</h2>
              </div>
              <LectureDurationForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <LectureVideoForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachment</h2>
              </div>
              <LectureAttachmentForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LectureIdPage;
