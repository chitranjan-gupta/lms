"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  File,
  LayoutDashboard,
  ListChecks,
  IndianRupee,
  ArrowLeft,
} from "lucide-react";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";

import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { Loader } from "@/components/loader";

import { useUser } from "@/hooks";

import type { Chapter, Course, CourseAttachment } from "@/types";

import { useCategories } from "@/core";
import { fetchCourses } from "@/api";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const { user } = useUser();
  const [refresh, setRefresh] = useState<boolean>(false);
  const { categories } = useCategories();
  const [course, setCourse] = useState<
    Course & { chapters: Chapter[] } & { attachments: CourseAttachment[] }
  >();
  useEffect(() => {
    if (user) {
      (async () => {
        const data:any = await fetchCourses(params.courseId)
        if(data){
          setCourse(data);
        }
      })()
    }
  }, [params.courseId, refresh, user]);

  if (!course) {
    return <Loader />;
  }
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <Suspense fallback={<Loader />}>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div>
          <Link
            href={`/teacher/courses/`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to courses
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
            setRefresh={setRefresh}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id}
              setRefresh={setRefresh}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
              setRefresh={setRefresh}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
              setRefresh={setRefresh}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              setRefresh={setRefresh}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={IndianRupee} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
                setRefresh={setRefresh}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachment</h2>
              </div>
              <AttachmentForm
                initialData={course}
                courseId={course.id}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CourseIdPage;
