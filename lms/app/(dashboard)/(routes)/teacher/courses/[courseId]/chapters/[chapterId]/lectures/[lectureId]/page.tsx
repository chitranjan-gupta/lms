import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LectureTitleForm } from "./_components/lecture-title-form";
import { LectureDescriptionForm } from "./_components/lecture-description-form";
import { LectureAccessForm } from "./_components/lecture-access-form";
import { LectureVideoForm } from "./_components/lecture-video-form";
import { Banner } from "@/components/banner";
import { LectureActions } from "./_components/lecture-actions";

const LectureIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; lectureId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const lecture = await db.lecture.findUnique({
    where: {
      id: params.lectureId,
      courseId: params.courseId,
      chapterId: params.chapterId,
    },
    include: {
      muxData: true,
    },
  });

  if (!lecture) {
    return redirect("/");
  }

  const requiredFields = [lecture.title, lecture.description, lecture.videoUrl];
  const totalFields = requiredFields.length;
  const compledtedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${compledtedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!lecture.isPublished && (
        <Banner
          variant="warning"
          label="This lecture is unpublished. It will not be visible in the course."
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
              />
              <LectureDescriptionForm
                initialData={lecture}
                courseId={params.courseId}
                chapterId={params.chapterId}
                lectureId={params.lectureId}
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
              />
            </div>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureIdPage;
