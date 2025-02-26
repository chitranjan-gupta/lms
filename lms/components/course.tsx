"use client";

import { type FormEvent, Fragment, type FC, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Book, BookOpen, File } from "lucide-react";

import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { Preview } from "./preview";

import { formatPrice } from "@/lib";
import { CourseWithChaptersWithAttachments } from "@/types";

interface CourseProps {
  course: CourseWithChaptersWithAttachments;
  isPurchased: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const CourseComponent: FC<CourseProps> = ({ course, isPurchased, onSubmit, isLoading }) => {
  return (
    <div className="bg-white">
      <div className="">
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {course.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {course.imageUrl && (
              <div className="relative w-auto h-60">
                <Image src={course.imageUrl} fill alt={course.title} />
              </div>
            )}
            {/* Price */}
            <div className="mt-6">
              <p className="text-3xl tracking-tight text-gray-900">
                {formatPrice(course.price!)}
              </p>
            </div>
            {isPurchased ? (
              <Link
                href={`/courses/${course.id}/chapters/${course.chapters[0].id}/lectures/${course.chapters[0].lectures[0].id}`}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                View
              </Link>
            ) : (
              <form className="mt-10" onSubmit={onSubmit}>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  Buy
                </button>
              </form>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                {course.description && <Preview value={course.description} />}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900">
                Course overview
              </h3>
              <Separator />{" "}
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  {course.chapters.map((chapter) => (
                    <Fragment key={chapter.id}>
                      <AccordionItem value={chapter.id}>
                        <AccordionTrigger>
                          <span className="flex flex-row gap-x-1">
                            <Book />
                            {chapter.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul
                            role="list"
                            className="list-disc space-y-2 pl-4 text-sm"
                          >
                            {chapter.lectures.map((lecture) => (
                              <Link
                                key={lecture.id}
                                href={`/courses/${course.id}/chapters/${chapter.id}/lectures/${lecture.id}`}
                              >
                                <li className="flex flex-row justify-between items-center">
                                  <span className="flex flex-row gap-x-3">
                                    <BookOpen />
                                    {lecture.title}
                                  </span>
                                  <span>{lecture.duration} min</span>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Fragment>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900">Attachments:</h2>
              {course && course.attachments && !!course.attachments.length && (
                <>
                  <Separator />{" "}
                  <div className="p-4">
                    {course.attachments.map((courseAttachment) => (
                      <a
                        href={courseAttachment.url}
                        key={courseAttachment.id}
                        target="_blank"
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                      >
                        <File className="" />
                        <p>{courseAttachment.name}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Course = memo(CourseComponent)